import React, { useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import { CollectionWrapper, FileWithPreview, SelectOption } from 'types';
import { useForm, zodResolver } from '@mantine/form';
import ProductConfigs from 'pages/product/ProductConfigs';
import useGetAllApi from 'hooks/use-get-all-api';
import { CarMakeResponse } from 'models/CarMake';
import { CarModelResponse } from 'models/CarModel';
import { CarVariantResponse } from 'models/CarVariant';
import { VehicleTypeResponse } from 'models/VehicleType';
import CarMakeConfigs from 'pages/carMake/CarMakeConfigs';
import CarModelConfigs from 'pages/carModel/CarModelConfigs';
import CarVariantConfigs from 'pages/carVariant/CarVariantConfigs';
import VehicleTypeConfigs from 'pages/vehicleType/VehicleTypeConfigs';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';

const Batteries = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: { vehicleTypeId: null as string | null,
      carMakeId: null as string | null,
      carModelId: null as string | null,
      carVariantId: null as string | null },
    schema: zodResolver(z.object({ vehicleTypeId: z.string().nullable(),
      carMakeId: z.string().nullable(),
      carModelId: z.string().nullable(),
      carVariantId: z.string().nullable() })),
  });

  const [vehicleTypeSelectList, setVehicleTypeSelectList] = useState<SelectOption[]>([]);
  const [carMakeSelectList, setCarMakeSelectList] = useState<SelectOption[]>([]);
  const [carModelSelectList, setCarModelSelectList] = useState<SelectOption[]>([]);
  const [carVariantSelectList, setCarVariantSelectList] = useState<SelectOption[]>([]);
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
  useGetAllApi<CarMakeResponse>(CarMakeConfigs.resourceUrl, CarMakeConfigs.resourceKey,
    { all: 1, filter: `vehicleType.id==${form.values['vehicleTypeId'] || 0}` },
    (carMakeListResponse) => {
      const selectList: SelectOption[] = carMakeListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.makeName,
      }));
      setCarMakeSelectList(selectList);
    }
  );
  useGetAllApi<CarModelResponse>(CarModelConfigs.resourceUrl, CarModelConfigs.resourceKey,
    { all: 1, filter: `carMake.id==${form.values['carMakeId'] || 0}` },
    (carModelListResponse) => {
      const selectList: SelectOption[] = carModelListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.modelName,
      }));
      setCarModelSelectList(selectList);
    }
  );
  useGetAllApi<CarVariantResponse>(CarVariantConfigs.resourceUrl, CarVariantConfigs.resourceKey,
    { all: 1 },
    (carVariantListResponse) => {
      const selectList: SelectOption[] = carVariantListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.variantName,
      }));
      setCarVariantSelectList(selectList);
    }
  ); 
  const handleFindNowClick = () => {
    //alert('Please select Make, Model, and Variant to find the Batteries.');
    navigate('/category/car-batteries');
  };

  return (
    <Stack>
      <Paper shadow="xs">
        <Stack spacing={0}>
          <Grid p="sm">
            <Grid.Col xs={2}>
              <Select
                label={ProductConfigs.properties.vehicleTypeId.label}
                placeholder="--"
                clearable
                searchable
                data={vehicleTypeSelectList}
                {...form.getInputProps('vehicleTypeId')}
              />
            </Grid.Col>
            <Grid.Col xs={2}>
              <Select
                label={ProductConfigs.properties.carMakeId.label}
                placeholder="--"
                clearable
                searchable
                data={carMakeSelectList}
                {...form.getInputProps('carMakeId')}
              />
            </Grid.Col>
            <Grid.Col xs={2}>
              <Select
                label={ProductConfigs.properties.carModelId.label}
                placeholder="--"
                clearable
                searchable
                data={carModelSelectList}
                {...form.getInputProps('carModelId')}
              />
            </Grid.Col>
            <Grid.Col xs={2}>
              <Select
                label={ProductConfigs.properties.carVariantId.label}
                placeholder="--"
                clearable
                searchable
                data={carVariantSelectList}
                {...form.getInputProps('carVariantId')}
              />
            </Grid.Col>
            <Grid.Col xs={2}>
              <Button title="ss" variant="default" onClick={handleFindNowClick}>Batteries</Button> 
            </Grid.Col>
          </Grid> 
        </Stack>
      </Paper>
    </Stack>
  /* <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}> 
      <select
        value={make}
        onChange={handleMakeChange}
        style={{ padding: '5px', fontSize: '16px' }}
      >
        <option value="">Select Make</option>
        {Object.keys(cars).map((carMake) => (
          <option key={carMake} value={carMake}>
            {carMake}
          </option>
        ))}
      </select> 
      <select
        value={model}
        onChange={handleModelChange}
        style={{ padding: '5px', fontSize: '16px' }}
        disabled={!make} // Disable model dropdown if no make is selected
      >
        <option value="">Select Model</option>
        {make &&
          Object.keys(cars[make]).map((carModel) => (
            <option key={carModel} value={carModel}>
              {carModel}
            </option>
          ))}
      </select>
 
      <select
        value={variant}
        onChange={handleVariantChange}
        style={{ padding: '5px', fontSize: '16px' }}
        disabled={!model} // Disable variant dropdown if no model is selected
      >
        <option value="">Select Variant</option>
        {make &&
          model &&
          cars[make][model].map((carVariant) => (
            <option key={carVariant} value={carVariant}>
              {carVariant}
            </option>
          ))}
      </select>

      <button
        onClick={handleFindNowClick}
        style={{
          padding: '8px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          gap: '8px',
        }}
      >
        Batteries 
      </button>
    </div> */
  );
};

export default Batteries;
