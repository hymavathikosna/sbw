import { useForm, zodResolver } from '@mantine/form';
import VehicleTypeConfigs from 'pages/vehicleType/VehicleTypeConfigs';
import { VehicleTypeRequest, VehicleTypeResponse } from 'models/VehicleType';

import useCreateApi from 'hooks/use-create-api'; 

function useVehicleTypeCreateViewModel() {
  const form = useForm({
    initialValues: VehicleTypeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(VehicleTypeConfigs.createUpdateFormSchema),
  });
 
  const createApi = useCreateApi<VehicleTypeRequest, VehicleTypeResponse>(VehicleTypeConfigs.resourceUrl);
  

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: VehicleTypeRequest = {
      vehicleTypeName: formValues.vehicleTypename 
    };
    createApi.mutate(requestBody);
  });
  

  return {
    form,
    handleFormSubmit, 
  };
}

export default useVehicleTypeCreateViewModel;
