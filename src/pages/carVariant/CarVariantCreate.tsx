import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Group, 
  Paper, 
  Select, 
  Stack,
  TextInput
} from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import CarVariantConfigs from 'pages/carVariant/CarVariantConfigs';
import useCarVariantCreateViewVariant from 'pages/carVariant/CarVariantCreate.vm';

function CarVariantCreate() {
  const {
    form,
    handleFormSubmit,
    carModelSelectList,
  } = useCarVariantCreateViewVariant();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={CarVariantConfigs.managerPath}
        title={CarVariantConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CarVariantConfigs.properties.variantName.label}
                  {...form.getInputProps('variantName')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={CarVariantConfigs.properties.carModelId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={carModelSelectList}
                  {...form.getInputProps('carModelId')}
                />
              </Grid.Col>
            </Grid>
            <Divider mt="xs"/>
            <Group position="apart" p="sm">
              <Button variant="default" onClick={form.reset}>Reset</Button>
              <Button type="submit">Add</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default CarVariantCreate;
