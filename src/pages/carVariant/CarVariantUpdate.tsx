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
import CarVariantConfigs from 'pages/carVariant/CarVariantConfigs';
import useCarVariantUpdateViewVariant from 'pages/carVariant/CarVariantUpdate.vm';

function CarVariantUpdate() {
  const { id } = useParams();
  const {
    carVariant,
    form,
    handleFormSubmit, 
    isDisabledUpdateButton,
  } = useCarVariantUpdateViewVariant(Number(id));

  if (!carVariant) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={CarVariantConfigs.managerPath}
        title={CarVariantConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={carVariant.id}
        createdAt={carVariant.createdAt}
        updatedAt={carVariant.updatedAt}
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
                  label={CarVariantConfigs.properties.carVariantname.label}
                  {...form.getInputProps('modelname')}
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

export default CarVariantUpdate;
