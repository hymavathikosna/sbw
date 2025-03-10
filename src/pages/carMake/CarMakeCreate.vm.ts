import { useForm, zodResolver } from '@mantine/form';
import CarMakeConfigs from 'pages/carMake/CarMakeConfigs';
import { CarMakeRequest, CarMakeResponse } from 'models/CarMake';

import useCreateApi from 'hooks/use-create-api'; 
import { useState } from 'react';
import { SelectOption } from 'types';
import { VehicleTypeResponse } from 'models/VehicleType'; 
import useGetAllApi from 'hooks/use-get-all-api';
import VehicleTypeConfigs from 'pages/vehicleType/VehicleTypeConfigs';

function useCarMakeCreateViewModel() {
  const form = useForm({
    initialValues: CarMakeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CarMakeConfigs.createUpdateFormSchema),
  });
  const [vehicleTypeSelectList, setVehicleTypeSelectList] = useState<SelectOption[]>([]);
 
  const createApi = useCreateApi<CarMakeRequest, CarMakeResponse>(CarMakeConfigs.resourceUrl);

  useGetAllApi<VehicleTypeResponse>(VehicleTypeConfigs.resourceUrl, VehicleTypeConfigs.resourceKey,
    { all: 1 },
    (vehicleTypeListResponse) => {
      const selectList: SelectOption[] = vehicleTypeListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.vehicleTypeName,
      }));
      setVehicleTypeSelectList(selectList);
    }
  );

  const handleFormSubmitCar = form.onSubmit((formValues) => {
    alert('Hu');
    const requestBody: CarMakeRequest = {
      makeName: formValues.makeName,
      vehicleTypeId: Number(formValues.vehicleTypeId) || null, 
    };
    createApi.mutate(requestBody);
  });
  

  return {
    form,
    handleFormSubmitCar, 
    vehicleTypeSelectList,
  };
}

export default useCarMakeCreateViewModel;
