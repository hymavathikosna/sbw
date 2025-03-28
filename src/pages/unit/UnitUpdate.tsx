import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import UnitConfigs from 'pages/unit/UnitConfigs';
import useUnitUpdateViewModel from 'pages/unit/UnitUpdate.vm';

function UnitUpdate() {
  const { id } = useParams();
  const {
    unit,
    form,
    handleFormSubmit,
    statusSelectList,
  } = useUnitUpdateViewModel(Number(id));

  if (!unit) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={UnitConfigs.managerPath}
        title={UnitConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={unit.id}
        createdAt={unit.createdAt}
        updatedAt={unit.updatedAt}
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
                  label={UnitConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={UnitConfigs.properties.status.label}
                  placeholder="--"
                  data={statusSelectList}
                  {...form.getInputProps('status')}
                />
              </Grid.Col>
            </Grid>

            <Divider mt="xs"/>

            <Group position="apart" p="sm">
              <Button variant="default" onClick={form.reset}>Reset</Button>
              <Button type="submit">Update</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default UnitUpdate;
