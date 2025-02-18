import React, { useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  Group,
  Loader,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput
} from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel, VariantFinder, VariantTable } from 'components';
import OrderConfigs from 'pages/order/OrderConfigs';
import useOrderCreateViewModel from 'pages/order/OrderCreate.vm';
import { EntityType } from 'components/VariantTable/VariantTable';
import MiscUtils from 'utils/MiscUtils';
import { useDebouncedValue } from '@mantine/hooks';
import { SelectOption } from 'types';
import useGetAllApi from 'hooks/use-get-all-api';
import { UserResponse } from 'models/User';
import UserConfigs from 'pages/user/UserConfigs';

function OrderCreate() {
  const {
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleQuantityInput,
    handleDeleteVariantButton,
    handleShippingCostInput,
    resetForm,
    orderResourceSelectList,
    orderCancellationReasonSelectList,
    paymentMethodSelectList,
    statusSelectList,
    paymentStatusSelectList,
    variants,
  } = useOrderCreateViewModel();

  const [userSelectKeyword, setUserSelectKeyword] = useState('');

  const [userSelectDebouncedKeyword] = useDebouncedValue(userSelectKeyword, 400);

  const [userSelectList, setUserSelectList] = useState<SelectOption[]>([]);

  const { isFetching: isFetchingUserListResponse } = useGetAllApi<UserResponse>(
    UserConfigs.resourceUrl,
    UserConfigs.resourceKey,
    { size: 5, search: userSelectDebouncedKeyword },
    (userListResponse) => {
      const selectList: SelectOption[] = userListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.fullname,
      }));
      setUserSelectList(selectList);
    }
  );

  return (
    <Stack pb={50}>
      <CreateUpdateTitle
        managerPath={OrderConfigs.managerPath}
        title={OrderConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <Grid>
        <Grid.Col xs={8}>
          <Paper shadow="xs">
            <Stack spacing="xs" p="sm">
              <VariantFinder
                selectedVariants={variants}
                onClickItem={handleClickVariantResultItem}
                errorSearchInput={form.errors.orderVariants}
              />
              {variants.length > 0 && (
                <VariantTable
                  type={EntityType.ORDER}
                  variants={variants}
                  variantRequests={form.values.orderVariants}
                  handleQuantityInput={handleQuantityInput}
                  handleDeleteVariantButton={handleDeleteVariantButton}
                />
              )}
            </Stack>

            <Divider mt={5}/>

            <Group position="right">
              <Grid p="sm" gutter="xs" style={{ width: '45%' }}>
                <Grid.Col span={6}>
                  <Text size="sm" weight={500}>Tổng thành tiền:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="md" color="blue" weight={500} sx={{ textAlign: 'right' }}>
                    {MiscUtils.formatPrice(form.values.totalAmount) + ' ₫'}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" weight={500}>Thuế ({form.values.tax * 100 + '%'}):</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="md" color="blue" weight={500} sx={{ textAlign: 'right' }}>
                    {MiscUtils.formatPrice(Number((form.values.totalAmount * form.values.tax).toFixed(0))) + ' ₫'}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" weight={500}>Shipping Fee:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    size="xs"
                    placeholder="--"
                    value={form.values.shippingCost}
                    onChange={(value) => handleShippingCostInput(value || 0)}
                    error={form.errors.shippingCost}
                    min={0}
                    step={100}
                    icon={'₫'}
                    parser={MiscUtils.parserPrice}
                    formatter={MiscUtils.formatterPrice}
                    disabled
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" weight={500}>Total amount paid:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack spacing={2.5} sx={{ textAlign: 'right' }}>
                    <Text size="md" color="blue" weight={500}>
                      {MiscUtils.formatPrice(form.values.totalPay) + ' ₫'}
                    </Text>
                    <Text size="xs" color="dimmed">(Shipping fee not included)</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Group>
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
                      rightSection={isFetchingUserListResponse ? <Loader size={16}/> : null}
                      label="Customer"
                      placeholder="--"
                      searchable
                      onSearchChange={setUserSelectKeyword}
                      data={userSelectList}
                      {...form.getInputProps('userId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <TextInput
                      required
                      label={OrderConfigs.properties.code.label}
                      {...form.getInputProps('code')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label={OrderConfigs.properties.status.label}
                      placeholder="--"
                      data={statusSelectList}
                      {...form.getInputProps('status')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <TextInput
                      required
                      label="Recipient's Name"
                      {...form.getInputProps('toName')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <TextInput
                      required
                      label="Recipient's Phone Number"
                      {...form.getInputProps('toPhone')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <TextInput
                      required
                      label="Recipient's Province"
                      {...form.getInputProps('toProvinceName')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <TextInput
                      required
                      label="Recipient's District"
                      {...form.getInputProps('toDistrictName')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <TextInput
                      required
                      label="Recipient's Ward"
                      {...form.getInputProps('toWardName')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <TextInput
                      required
                      label="Recipient's Address"
                      {...form.getInputProps('toAddress')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label="Order Source"
                      placeholder="--"
                      data={orderResourceSelectList}
                      {...form.getInputProps('orderResourceId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      label="Order Cancellation Reason"
                      placeholder="--"
                      clearable
                      data={orderCancellationReasonSelectList}
                      // Only enable when the order status is "Cancelled" (5)
                      disabled={form.values.status !== '5'}
                      {...form.getInputProps('orderCancellationReasonId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Textarea
                      label="Order Notes"
                      {...form.getInputProps('note')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label="Payment Method"
                      placeholder="--"
                      data={paymentMethodSelectList}
                      {...form.getInputProps('paymentMethodType')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label="Payment Status"
                      placeholder="--"
                      data={paymentStatusSelectList}
                      {...form.getInputProps('paymentStatus')}
                    />
                  </Grid.Col>
                </Grid>

                <Divider mt="xs"/>

                <Group position="apart" p="sm">
                  <Button variant="default" onClick={resetForm}>Default</Button>
                  <Button type="submit">Thêm</Button>
                </Group>
              </Stack>
            </Paper>
          </form>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default OrderCreate;
