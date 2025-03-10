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
import CarModelConfigs from 'pages/carModel/CarModelConfigs';
import useCarModelUpdateViewModel from 'pages/carModel/CarModelUpdate.vm';

function CarModelUpdate() {
  const { id } = useParams();
  const {
    carModel,
    form,
    handleFormSubmit, 
    isDisabledUpdateButton,
  } = useCarModelUpdateViewModel(Number(id));

  if (!carModel) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={CarModelConfigs.managerPath}
        title={CarModelConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={carModel.id}
        createdAt={carModel.createdAt}
        updatedAt={carModel.updatedAt}
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
                  label={CarModelConfigs.properties.carModelname.label}
                  {...form.getInputProps('modelName')}
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

export default CarModelUpdate;
