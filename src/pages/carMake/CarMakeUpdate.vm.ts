import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import CarMakeConfigs from 'pages/carMake/CarMakeConfigs';
import { CarMakeRequest, CarMakeResponse } from 'models/CarMake';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';  

function useCarMakeUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: CarMakeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CarMakeConfigs.createUpdateFormSchema),
  });

  const [carMake, setCarMake] = useState<CarMakeResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>(); 

  const updateApi = useUpdateApi<CarMakeRequest, CarMakeResponse>(CarMakeConfigs.resourceUrl, CarMakeConfigs.resourceKey, id);
  useGetByIdApi<CarMakeResponse>(CarMakeConfigs.resourceUrl, CarMakeConfigs.resourceKey, id,
    (carMakeResponse) => {
      setCarMake(carMakeResponse);
      const formValues: typeof form.values = {
        makename: carMakeResponse.makeName,
        vehicleTypeId:String(carMakeResponse.vehicleType.id) || null, 
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  ); 

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: CarMakeRequest = {
        makeName: formValues.makename,
        vehicleTypeId:Number(formValues.vehicleTypeId) ||null
      };
      updateApi.mutate(requestBody);
    }  
  });
 
  const isDisabledUpdateButton = MiscUtils.isEquals(form.values, prevFormValues);

  return {
    carMake,
    form,
    handleFormSubmit, 
    isDisabledUpdateButton,
  };
}

export default useCarMakeUpdateViewModel;
