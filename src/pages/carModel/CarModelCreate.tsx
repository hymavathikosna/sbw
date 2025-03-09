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
import CarModelConfigs from 'pages/carModel/CarModelConfigs';
import useCarModelCreateViewModel from 'pages/carModel/CarModelCreate.vm';

function CarModelCreate() {
  const {
    form,
    handleFormSubmit,
    carMakeSelectList
  } = useCarModelCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={CarModelConfigs.managerPath}
        title={CarModelConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CarModelConfigs.properties.carModelname.label}
                  {...form.getInputProps('modelname')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={CarModelConfigs.properties.carMakeId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={carMakeSelectList}
                  {...form.getInputProps('carMakeId')}
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

export default CarModelCreate;
