import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import CarModelConfigs from 'pages/carModel/CarModelConfigs';
import { CarModelRequest, CarModelResponse } from 'models/CarModel';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';  

function useCarModelUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: CarModelConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CarModelConfigs.createUpdateFormSchema),
  });

  const [carModel, setCarModel] = useState<CarModelResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>(); 

  const updateApi = useUpdateApi<CarModelRequest, CarModelResponse>(CarModelConfigs.resourceUrl, CarModelConfigs.resourceKey, id);
  useGetByIdApi<CarModelResponse>(CarModelConfigs.resourceUrl, CarModelConfigs.resourceKey, id,
    (carModelResponse) => {
      setCarModel(carModelResponse);
      const formValues: typeof form.values = {
        modelName: carModelResponse.modelName,
        carMakeId:String(carModelResponse.carMake.id) || null, 
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  ); 

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: CarModelRequest = {
        modelName: formValues.modelName,
        carMakeId:Number(formValues.carMakeId) ||null
      };
      updateApi.mutate(requestBody);
    }  
  });
 
  const isDisabledUpdateButton = MiscUtils.isEquals(form.values, prevFormValues);

  return {
    carModel,
    form,
    handleFormSubmit, 
    isDisabledUpdateButton,
  };
}

export default useCarModelUpdateViewModel;
