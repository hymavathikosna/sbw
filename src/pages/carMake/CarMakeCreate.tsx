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
    handleFormSubmitCar,
    vehicleTypeSelectList,
  } = useCarMakeCreateViewModel();
   
  // console.log('form.errors:', form.errors);  
  
  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={CarMakeConfigs.managerPath}
        title={CarMakeConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmitCar}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CarMakeConfigs.properties.makeName.label}
                  id="makeName"  
                  key="makeName"
                  {...form.getInputProps('makeName')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={CarMakeConfigs.properties.vehicleTypeId.label}
                  id="vehicleTypeId"  
                  key="vehicleTypeId"  
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
