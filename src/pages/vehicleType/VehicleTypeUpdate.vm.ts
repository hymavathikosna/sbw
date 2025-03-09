import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import VehicleTypeConfigs from 'pages/vehicleType/VehicleTypeConfigs';
import { VehicleTypeRequest, VehicleTypeResponse } from 'models/VehicleType';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';  

function useVehicleTypeUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: VehicleTypeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(VehicleTypeConfigs.createUpdateFormSchema),
  });

  const [vehicleType, setVehicleType] = useState<VehicleTypeResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>(); 

  const updateApi = useUpdateApi<VehicleTypeRequest, VehicleTypeResponse>(VehicleTypeConfigs.resourceUrl, VehicleTypeConfigs.resourceKey, id);
  useGetByIdApi<VehicleTypeResponse>(VehicleTypeConfigs.resourceUrl, VehicleTypeConfigs.resourceKey, id,
    (vehicleTypeResponse) => {
      setVehicleType(vehicleTypeResponse);
      const formValues: typeof form.values = {
        vehicleTypename: vehicleTypeResponse.vehicleTypeName
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  ); 

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: VehicleTypeRequest = {
        vehicleTypeName: formValues.vehicleTypename
      };
      updateApi.mutate(requestBody);
    }  
  });
 
  const isDisabledUpdateButton = MiscUtils.isEquals(form.values, prevFormValues);

  return {
    vehicleType,
    form,
    handleFormSubmit, 
    isDisabledUpdateButton,
  };
}

export default useVehicleTypeUpdateViewModel;
