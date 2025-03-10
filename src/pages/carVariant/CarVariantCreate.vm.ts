import { useForm, zodResolver } from '@mantine/form';
import CarVariantConfigs from 'pages/carVariant/CarVariantConfigs';
import { CarVariantRequest, CarVariantResponse } from 'models/CarVariant';

import useCreateApi from 'hooks/use-create-api'; 
import { useState } from 'react';
import { SelectOption } from 'types'; 
import useGetAllApi from 'hooks/use-get-all-api';
import CarModelConfigs from 'pages/carModel/CarModelConfigs';
import { CarModelResponse } from 'models/CarModel';

function useCarVariantCreateViewVariant() {
  const form = useForm({
    initialValues: CarVariantConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CarVariantConfigs.createUpdateFormSchema),
  });
  const [carModelSelectList, setVehicleTypeSelectList] = useState<SelectOption[]>([]);
 
  const createApi = useCreateApi<CarVariantRequest, CarVariantResponse>(CarVariantConfigs.resourceUrl);
  useGetAllApi<CarModelResponse>(CarModelConfigs.resourceUrl, CarModelConfigs.resourceKey,
    { all: 1 },
    (carModelListResponse) => {
      const selectList: SelectOption[] = carModelListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.modelName,
      }));
      setVehicleTypeSelectList(selectList);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: CarVariantRequest = {
      variantName: formValues.variantName,
      carModelId: Number(formValues.carModelId) || null, 
    };
    createApi.mutate(requestBody);
  });
  

  return {
    form,
    handleFormSubmit, 
    carModelSelectList
  };
}

export default useCarVariantCreateViewVariant;
