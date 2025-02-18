import React from 'react';
import {
  Badge,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  Title,
  useMantineTheme
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import WaybillConfigs from 'pages/waybill/WaybillConfigs';
import useWaybillUpdateViewModel from 'pages/waybill/WaybillUpdate.vm';
import DateUtils from 'utils/DateUtils';
import MiscUtils from 'utils/MiscUtils';

function WaybillUpdate() {
  const theme = useMantineTheme();

  const { id } = useParams();
  const {
    waybill,
    form,
    handleFormSubmit,
    ghnRequiredNoteSelectList,
  } = useWaybillUpdateViewModel(Number(id));

  const waybillStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge variant="outline" size="sm" color="gray">Waiting for Pickup</Badge>;
    case 2:
      return <Badge variant="outline" size="sm" color="blue">In Transit</Badge>;
    case 3:
      return <Badge variant="outline" size="sm" color="green">Delivered</Badge>;
    case 4:
      return <Badge variant="outline" size="sm" color="red">Cancelled</Badge>;      
    }
  };

  if (!waybill) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={WaybillConfigs.managerPath}
        title={WaybillConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={waybill.id}
        createdAt={waybill.createdAt}
        updatedAt={waybill.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col>
                <Title order={4}>Waybill Information</Title>
                <Text size="sm">Some general information</Text>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Waybill Code</Text>
                  <Text sx={{ fontFamily: theme.fontFamilyMonospace }}>{waybill.code}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Order Code</Text>
                  <Text sx={{ fontFamily: theme.fontFamilyMonospace }}>{waybill.order.code}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Shipping Date</Text>
                  <Text>{DateUtils.isoDateToString(waybill.shippingDate, 'DD/MM/YYYY')}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Estimated Delivery Time</Text>
                  <Text>{DateUtils.isoDateToString(waybill.expectedDeliveryTime, 'DD/MM/YYYY')}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Status</Text>
                  <Text>{waybillStatusBadgeFragment(waybill.status)}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Person Paying for GHN Service</Text>
                  <Text>{WaybillConfigs.ghnPaymentTypeIdMap[waybill.ghnPaymentTypeId]}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Cash on Delivery Amount</Text>
                  <Text>{MiscUtils.formatPrice(waybill.codAmount)} ₫</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Shipping Fee</Text>
                  <Text>{MiscUtils.formatPrice(waybill.shippingFee)} ₫</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Package Weight</Text>
                  <Text>{MiscUtils.formatPrice(waybill.weight)} grams</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Package Length</Text>
                  <Text>{MiscUtils.formatPrice(waybill.length)} cm</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Package Width</Text>
                  <Text>{MiscUtils.formatPrice(waybill.width)} cm</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Package Height</Text>
                  <Text>{MiscUtils.formatPrice(waybill.height)} cm</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Update Waybill Information</Title>
                <Text size="sm">Change some editable information</Text>
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label="Waybill Notes"
                  {...form.getInputProps('note')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label="Note for GHN Service"
                  placeholder="--"
                  data={ghnRequiredNoteSelectList}
                  {...form.getInputProps('ghnRequiredNote')}
                />
              </Grid.Col>
            </Grid>
            <Divider mt="xs"/>

            <Group position="right" p="sm">
              <Button type="submit">Update</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default WaybillUpdate;
