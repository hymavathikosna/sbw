import React from 'react';
import PageConfigs from 'pages/PageConfigs';
import FetchUtils, { ErrorMessage, ListResponse } from 'utils/FetchUtils';
import useGetAllApi from 'hooks/use-get-all-api';
import { PaymentMethodRequest, PaymentMethodResponse } from 'models/PaymentMethod';
import PaymentMethodConfigs from 'pages/payment-method/PaymentMethodConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import { Alert, Badge, Button, Group, LoadingOverlay, Paper, Stack, Switch, Table, Text } from '@mantine/core';
import { ManageHeader, ManageHeaderTitle } from 'components';
import { AlertCircle } from 'tabler-icons-react';
import { formList, useForm } from '@mantine/form';
import MiscUtils from 'utils/MiscUtils';
import { useMutation, useQueryClient } from 'react-query';
import NotifyUtils from 'utils/NotifyUtils';

function PaymentMethodManage() {
  const queryClient = useQueryClient();

  useResetManagePageState();

  const form = useForm({
    initialValues: {
      paymentMethods: formList([] as Array<{ status: boolean }>),
    },
  });

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<PaymentMethodResponse>,
  } = useGetAllApi<PaymentMethodResponse>(
    PaymentMethodConfigs.resourceUrl,
    PaymentMethodConfigs.resourceKey,
    { all: 1, sort: 'id,asc' },
    (data) =>
      form.setFieldValue('paymentMethods', formList(data.content.map(entity => ({ status: entity.status === 1 })))),
    { refetchOnWindowFocus: false }
  );

  const updatePaymentMethodApi = useUpdatePaymentMethodApi();

  const handleUpdateButton = async () => {
    if (!form.values.paymentMethods.every(p => !p.status)) {
      try {
        const updatePaymentMethodRequests: UpdatePaymentMethodRequest[] = [];

        listResponse.content.forEach((entity, index) => {
          const currentStatus = form.values.paymentMethods[index].status ? 1 : 2;

          if (currentStatus !== entity.status) {
            updatePaymentMethodRequests.push({
              id: entity.id,
              body: { status: currentStatus },
            });
          }
        });

        await Promise.all(updatePaymentMethodRequests.map(async (request) => {
          await updatePaymentMethodApi.mutateAsync(request);
        }));

        NotifyUtils.simpleSuccess('Update successful');
        void queryClient.invalidateQueries([PaymentMethodConfigs.resourceKey, 'getAll']);
      } catch (e) {
        NotifyUtils.simpleFailed('Update failed');
      }
    }
  };

  const paymentMethodStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="blue" variant="filled" size="sm">In use</Badge>;
    case 2:
      return <Badge color="pink" variant="filled" size="sm">Not in use</Badge>;      
    }
  };

  const entitiesTableHeadsFragment = (
    <tr>
      <th>Activate</th>
      <th>Payment Method</th>
      <th>Code</th>
      <th>Status</th>
    </tr>
  );

  const entitiesTableRowsFragment = listResponse.content.map((entity, index) => {
    const PaymentMethodIcon = PageConfigs.paymentMethodIconMap[entity.code];

    return (
      <tr key={entity.id}>
        <td>
          <Switch
            size="md"
            {...form.getListInputProps('paymentMethods', index, 'status', { type: 'checkbox' })}
          />
        </td>
        <td>
          <Group spacing="xs">
            <PaymentMethodIcon/>
            <Text>{entity.name}</Text>
          </Group>
        </td>
        <td>{entity.code}</td>
        <td>{paymentMethodStatusBadgeFragment(entity.status)}</td>
      </tr>
    );
  });

  const disabledUpdateButton = MiscUtils.isEquals(
    listResponse.content.map(entity => ({ status: entity.status === 1 })),
    form.values.paymentMethods
  ) || form.values.paymentMethods.every(p => !p.status);

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={PaymentMethodConfigs.manageTitleLinks}
          title={PaymentMethodConfigs.manageTitle}
        />
      </ManageHeader>

      <Alert
        icon={<AlertCircle size={16}/>}
        title="Notification"
        color="pink"
        radius="md"
      >
        Activate one or more payment methods, there must always be at least one payment method selected.
      </Alert>

      <Paper shadow="xs" sx={{ position: 'relative', height: listResponse.content.length === 0 ? 170 : 'auto' }}>
        <LoadingOverlay visible={isLoading} zIndex={50}/>
        <Table horizontalSpacing="sm" verticalSpacing="sm">
          <thead>{entitiesTableHeadsFragment}</thead>
          <tbody>{entitiesTableRowsFragment}</tbody>
        </Table>
      </Paper>

      <Button
        sx={{ width: 'fit-content' }}
        disabled={disabledUpdateButton}
        onClick={handleUpdateButton}
      >
        Update
      </Button>
    </Stack>
  );
}

type UpdatePaymentMethodRequest = { id: number, body: PaymentMethodRequest };

function useUpdatePaymentMethodApi() {
  return useMutation<PaymentMethodResponse, ErrorMessage, UpdatePaymentMethodRequest>(
    (request) => FetchUtils.update(PaymentMethodConfigs.resourceUrl, request.id, request.body)
  );
}

export default PaymentMethodManage;
