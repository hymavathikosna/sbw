import React, { useState } from 'react';
import { Button, Divider, Grid, Group, Loader, Paper, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel, VariantFinder, VariantTable } from 'components';
import DocketConfigs from 'pages/docket/DocketConfigs';
import useDocketUpdateViewModel from 'pages/docket/DocketUpdate.vm';
import { useDebouncedValue } from '@mantine/hooks';
import { SelectOption } from 'types';
import useGetAllApi from 'hooks/use-get-all-api';
import { PurchaseOrderResponse } from 'models/PurchaseOrder';
import PurchaseOrderConfigs from 'pages/purchase-order/PurchaseOrderConfigs';
import { EntityType } from 'components/VariantTable/VariantTable';
import { OrderResponse } from 'models/Order';
import OrderConfigs from 'pages/order/OrderConfigs';

function DocketUpdate() {
  const { id } = useParams();
  const {
    docket,
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleQuantityInput,
    handleDeleteVariantButton,
    resetForm,
    reasonSelectList,
    warehouseSelectList,
    typeSelectList,
    statusSelectList,
    variants,
  } = useDocketUpdateViewModel(Number(id));

  const [purchaseOrderSelectKeyword, setPurchaseOrderSelectKeyword] = useState('');
  const [orderSelectKeyword, setOrderSelectKeyword] = useState('');

  const [purchaseOrderSelectDebouncedKeyword] = useDebouncedValue(purchaseOrderSelectKeyword, 400);
  const [orderSelectDebouncedKeyword] = useDebouncedValue(orderSelectKeyword, 400);

  const [purchaseOrderSelectList, setPurchaseOrderSelectList] = useState<SelectOption[]>([]);
  const [orderSelectList, setOrderSelectList] = useState<SelectOption[]>([]);

  const { isFetching: isFetchingPurchaseOrderListResponse } = useGetAllApi<PurchaseOrderResponse>(
    PurchaseOrderConfigs.resourceUrl,
    PurchaseOrderConfigs.resourceKey,
    {
      // Điều kiện filter gần như chỉ được kích hoạt khi mới vào trang hoặc lúc chọn option
      filter: (form.values.purchaseOrderId && purchaseOrderSelectDebouncedKeyword === '')
        ? `id==${form.values.purchaseOrderId}` : '',
      size: 5,
      search: purchaseOrderSelectDebouncedKeyword,
    },
    (purchaseOrderListResponse) => {
      const selectList: SelectOption[] = purchaseOrderListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.code,
      }));
      setPurchaseOrderSelectList(selectList);
    }
  );

  const { isFetching: isFetchingOrderListResponse } = useGetAllApi<OrderResponse>(
    OrderConfigs.resourceUrl,
    OrderConfigs.resourceKey,
    {
      filter: (form.values.orderId && orderSelectDebouncedKeyword === '') ? `id==${form.values.orderId}` : '',
      size: 5,
      search: orderSelectDebouncedKeyword,
    },
    (orderListResponse) => {
      const selectList: SelectOption[] = orderListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.code,
      }));
      setOrderSelectList(selectList);
    }
  );

  if (!docket) {
    return null;
  }

  return (
    <Stack pb={50}>
      <CreateUpdateTitle
        managerPath={DocketConfigs.managerPath}
        title={DocketConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={docket.id}
        createdAt={docket.createdAt}
        updatedAt={docket.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

      <Grid>
        <Grid.Col xs={8}>
          <Paper shadow="xs">
            <Stack spacing="xs" p="sm">
              <VariantFinder
                selectedVariants={variants}
                onClickItem={handleClickVariantResultItem}
                errorSearchInput={form.errors.docketVariants}
              />
              {variants.length > 0 && (
                <VariantTable
                  type={EntityType.DOCKET}
                  variants={variants}
                  variantRequests={form.values.docketVariants}
                  handleQuantityInput={handleQuantityInput}
                  handleDeleteVariantButton={handleDeleteVariantButton}
                />
              )}
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col xs={4}>
          <form onSubmit={handleFormSubmit}>
            <Paper shadow="xs">
              <Stack spacing={0}>
                <Grid p="sm">
                  <Grid.Col>
                    <Select
                      required
                      label={DocketConfigs.properties.type.label}
                      placeholder="--"
                      data={typeSelectList}
                      {...form.getInputProps('type')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <TextInput
                      required
                      label={DocketConfigs.properties.code.label}
                      {...form.getInputProps('code')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label="Reason for Stock Dispatch Slip"
                      placeholder="--"
                      data={reasonSelectList}
                      {...form.getInputProps('reasonId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label="Warehouse"
                      placeholder="--"
                      data={warehouseSelectList}
                      {...form.getInputProps('warehouseId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      rightSection={isFetchingPurchaseOrderListResponse ? <Loader size={16}/> : null}
                      label="Purchase Order"
                      placeholder="--"
                      searchable
                      clearable
                      onSearchChange={setPurchaseOrderSelectKeyword}
                      data={purchaseOrderSelectList}
                      {...form.getInputProps('purchaseOrderId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      rightSection={isFetchingOrderListResponse ? <Loader size={16}/> : null}
                      label="Order"
                      placeholder="--"
                      searchable
                      clearable
                      onSearchChange={setOrderSelectKeyword}
                      data={orderSelectList}
                      {...form.getInputProps('orderId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Textarea
                      label={DocketConfigs.properties.note.label}
                      {...form.getInputProps('note')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label={DocketConfigs.properties.status.label}
                      placeholder="--"
                      data={statusSelectList}
                      {...form.getInputProps('status')}
                    />
                  </Grid.Col>
                </Grid>

                <Divider mt="xs"/>

                <Group position="apart" p="sm">
                  <Button variant="default" onClick={resetForm}>Default</Button>
                  <Button type="submit">Update</Button>
                </Group>
              </Stack>
            </Paper>
          </form>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default DocketUpdate;
