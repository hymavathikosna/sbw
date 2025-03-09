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
import CarMakeConfigs from 'pages/carMake/CarMakeConfigs';
import useCarMakeCreateViewModel from 'pages/carMake/CarMakeCreate.vm';

function CarMakeCreate() {
  const {
    form,
    handleFormSubmit,
    vehicleTypeSelectList,
  } = useCarMakeCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={CarMakeConfigs.managerPath}
        title={CarMakeConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CarMakeConfigs.properties.makeName.label}
                  {...form.getInputProps('makename')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={CarMakeConfigs.properties.vehicleTypeId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={vehicleTypeSelectList}
                  {...form.getInputProps('vehicleTypeId')}
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

export default CarMakeCreate;
