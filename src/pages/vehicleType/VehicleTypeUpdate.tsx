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
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import VehicleTypeConfigs from 'pages/vehicleType/VehicleTypeConfigs';
import useVehicleTypeUpdateViewModel from 'pages/vehicleType/VehicleTypeUpdate.vm';

function VehicleTypeUpdate() {
  const { id } = useParams();
  const {
    vehicleType,
    form,
    handleFormSubmit, 
    isDisabledUpdateButton,
  } = useVehicleTypeUpdateViewModel(Number(id));

  if (!vehicleType) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={VehicleTypeConfigs.managerPath}
        title={VehicleTypeConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={vehicleType.id}
        createdAt={vehicleType.createdAt}
        updatedAt={vehicleType.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

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
              <Button type="submit" disabled={isDisabledUpdateButton}>Update</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default VehicleTypeUpdate;
