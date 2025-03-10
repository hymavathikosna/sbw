import { useForm, zodResolver } from '@mantine/form';
import CarModelConfigs from 'pages/carModel/CarModelConfigs';
import { CarModelRequest, CarModelResponse } from 'models/CarModel';

import useCreateApi from 'hooks/use-create-api'; 
import { useState } from 'react';
import { SelectOption } from 'types'; 
import useGetAllApi from 'hooks/use-get-all-api';
import CarMakeConfigs from 'pages/carMake/CarMakeConfigs';
import { CarMakeResponse } from 'models/CarMake';

function useCarModelCreateViewModel() {
  const form = useForm({
    initialValues: CarModelConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CarModelConfigs.createUpdateFormSchema),
  });
  const [carMakeSelectList, setVehicleTypeSelectList] = useState<SelectOption[]>([]);
 
  const createApi = useCreateApi<CarModelRequest, CarModelResponse>(CarModelConfigs.resourceUrl);
  useGetAllApi<CarMakeResponse>(CarMakeConfigs.resourceUrl, CarMakeConfigs.resourceKey,
    { all: 1 },
    (carMakeListResponse) => {
      const selectList: SelectOption[] = carMakeListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.makeName,
      }));
      setVehicleTypeSelectList(selectList);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: CarModelRequest = {
      modelName: formValues.modelName,
      carMakeId: Number(formValues.carMakeId) || null, 
    };
    createApi.mutate(requestBody);
  });
  

  return {
    form,
    handleFormSubmit, 
    carMakeSelectList
  };
}

export default useCarModelCreateViewModel;
