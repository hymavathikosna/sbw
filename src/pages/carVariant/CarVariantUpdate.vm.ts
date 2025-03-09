import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import CarVariantConfigs from 'pages/carVariant/CarVariantConfigs';
import { CarVariantRequest, CarVariantResponse } from 'models/CarVariant';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';  

function useCarVariantUpdateViewVariant(id: number) {
  const form = useForm({
    initialValues: CarVariantConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CarVariantConfigs.createUpdateFormSchema),
  });

  const [carVariant, setCarVariant] = useState<CarVariantResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>(); 

  const updateApi = useUpdateApi<CarVariantRequest, CarVariantResponse>(CarVariantConfigs.resourceUrl, CarVariantConfigs.resourceKey, id);
  useGetByIdApi<CarVariantResponse>(CarVariantConfigs.resourceUrl, CarVariantConfigs.resourceKey, id,
    (carVariantResponse) => {
      setCarVariant(carVariantResponse);
      const formValues: typeof form.values = {
        modelname: carVariantResponse.variantName,
        carModelId:String(carVariantResponse.carModel.id) || null, 
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  ); 

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: CarVariantRequest = {
        variantName: formValues.modelname,
        carModelId:Number(formValues.carModelId) ||null
      };
      updateApi.mutate(requestBody);
    }  
  });
 
  const isDisabledUpdateButton = MiscUtils.isEquals(form.values, prevFormValues);

  return {
    carVariant,
    form,
    handleFormSubmit, 
    isDisabledUpdateButton,
  };
}

export default useCarVariantUpdateViewVariant;
