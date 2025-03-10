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
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import CarMakeConfigs from 'pages/carMake/CarMakeConfigs';
import useCarMakeUpdateViewModel from 'pages/carMake/CarMakeUpdate.vm';

function CarMakeUpdate() {
  const { id } = useParams();
  const {
    carMake,
    form,
    handleFormSubmit, 
    isDisabledUpdateButton,
    vehicleTypeSelectList,
  } = useCarMakeUpdateViewModel(Number(id));

  if (!carMake) {
    return null;
  }
  console.log('form.errors:', form.errors);  
  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={CarMakeConfigs.managerPath}
        title={CarMakeConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={carMake.id}
        createdAt={carMake.createdAt}
        updatedAt={carMake.updatedAt}
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
                  label={CarMakeConfigs.properties.makeName.label}
                  {...form.getInputProps('makeName')}
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
              <Button type="submit" disabled={isDisabledUpdateButton}>Update</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default CarMakeUpdate;
