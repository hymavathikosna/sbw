import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import CarMakeConfigs from 'pages/carMake/CarMakeConfigs';
import { CarMakeRequest, CarMakeResponse } from 'models/CarMake';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';  
import useGetAllApi from 'hooks/use-get-all-api';
import { VehicleTypeResponse } from 'models/VehicleType';
import VehicleTypeConfigs from 'pages/vehicleType/VehicleTypeConfigs';
import { SelectOption } from 'types';

function useCarMakeUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: CarMakeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CarMakeConfigs.createUpdateFormSchema),
  });

  const [carMake, setCarMake] = useState<CarMakeResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>(); 
  const [vehicleTypeSelectList, setVehicleTypeSelectList] = useState<SelectOption[]>([]);

  const updateApi = useUpdateApi<CarMakeRequest, CarMakeResponse>(CarMakeConfigs.resourceUrl, CarMakeConfigs.resourceKey, id);
  useGetByIdApi<CarMakeResponse>(CarMakeConfigs.resourceUrl, CarMakeConfigs.resourceKey, id,
    (carMakeResponse) => {
      setCarMake(carMakeResponse);
      const formValues: typeof form.values = {
        makeName: carMakeResponse.makeName,
        vehicleTypeId:String(carMakeResponse.vehicleType?.id) || null, 
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  ); 
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
  const handleFormSubmit = form.onSubmit((formValues) => {
    alert('hi');
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: CarMakeRequest = {
        makeName: formValues.makeName,
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
    vehicleTypeSelectList,
  };
}

export default useCarMakeUpdateViewModel;
