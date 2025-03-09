import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Group, 
  Paper, 
  Stack,
  TextInput
} from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import VehicleTypeConfigs from 'pages/vehicleType/VehicleTypeConfigs';
import useVehicleTypeCreateViewModel from 'pages/vehicleType/VehicleTypeCreate.vm';

function VehicleTypeCreate() {
  const {
    form,
    handleFormSubmit,
  } = useVehicleTypeCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={VehicleTypeConfigs.managerPath}
        title={VehicleTypeConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={VehicleTypeConfigs.properties.vehicleTypename.label}
                  {...form.getInputProps('vehicleTypename')}
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

export default VehicleTypeCreate;
