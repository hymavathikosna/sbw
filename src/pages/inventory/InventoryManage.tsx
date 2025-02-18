import React from 'react';
import { ActionIcon, Anchor, Badge, Stack, Table, useMantineTheme } from '@mantine/core';
import { ManageHeader, ManageHeaderTitle, ManageMain, ManagePagination } from 'components';
import InventoryConfigs from 'pages/inventory/InventoryConfigs';
import PageConfigs from 'pages/PageConfigs';
import { ListResponse } from 'utils/FetchUtils';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProductInventoryResponse } from 'models/ProductInventory';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import { Plus } from 'tabler-icons-react';
import { DocketVariantExtendedResponse } from 'models/DocketVariantExtended';
import { useModals } from '@mantine/modals';
import DateUtils from 'utils/DateUtils';

function InventoryManage() {
  useResetManagePageState();

  const theme = useMantineTheme();
  const modals = useModals();

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<ProductInventoryResponse>,
  } = useGetAllApi<ProductInventoryResponse>(
    InventoryConfigs.productInventoryResourceUrl,
    InventoryConfigs.productInventoryResourceKey
  );

  const handleTransactionsAnchor = (productName: string, transactions: DocketVariantExtendedResponse[]) => {
    modals.openModal({
      size: 1200,
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      title: <strong>Product inventory history &quot;{productName}&quot;</strong>,
      children: <ProductInventoryTransactionsModal transactions={transactions}/>,
    });
  };

  const entitiesTableHeadsFragment = (
    <tr>
      <th>Product Code</th>
      <th>Product Name</th>
      <th>Brand</th>
      <th>Supplier</th>
      <th>Actual Stock</th>
      <th>Pending Dispatch</th>
      <th>Available for Sale</th>
      <th>Coming Soon</th>
      <th>Track</th>
      <th>History</th>
    </tr>
  );

  const entitiesTableRowsFragment = listResponse.content.map((entity) => (
    <tr key={entity.product.id}>
      <td>{entity.product.code}</td>
      <td>{entity.product.name}</td>
      <td>{entity.product.brand?.name}</td>
      <td>{entity.product.supplier?.displayName}</td>
      <td>{entity.inventory}</td>
      <td>{entity.waitingForDelivery}</td>
      <td>{entity.canBeSold}</td>
      <td>{entity.areComing}</td>
      <td>
        <ActionIcon
          color="blue"
          variant="hover"
          size={24}
          title="Set inventory level for the product"
        >
          <Plus/>
        </ActionIcon>
      </td>
      <td>
        <Anchor inherit onClick={() => handleTransactionsAnchor(entity.product.name, entity.transactions)}>
          Transaction
        </Anchor>
      </td>
    </tr>
  ));

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={InventoryConfigs.manageTitleLinks}
          title={InventoryConfigs.manageTitle}
        />
      </ManageHeader>

      <ManageMain
        listResponse={listResponse}
        isLoading={isLoading}
      >
        <Table
          horizontalSpacing="sm"
          verticalSpacing="sm"
          highlightOnHover
          striped
          sx={(theme) => ({
            borderRadius: theme.radius.sm,
            overflow: 'hidden',
          })}
        >
          <thead>{entitiesTableHeadsFragment}</thead>
          <tbody>{entitiesTableRowsFragment}</tbody>
        </Table>
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

function ProductInventoryTransactionsModal({ transactions }: { transactions: DocketVariantExtendedResponse[] }) {
  const docketTypeBadgeFragment = (type: number) => {
    switch (type) {
    case 1:
      return <Badge color="blue" variant="filled" size="sm">Import</Badge>;
    case 2:
      return <Badge color="orange" variant="filled" size="sm">Export</Badge>;
    }
  };

  const docketStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="gray" variant="outline" size="sm">New</Badge>;
    case 2:
      return <Badge color="blue" variant="outline" size="sm">In Progress</Badge>;
    case 3:
      return <Badge color="green" variant="outline" size="sm">Completed</Badge>;
    case 4:
      return <Badge color="red" variant="outline" size="sm">Cancelled</Badge>;      
    }
  };

  return (
    <Table
      horizontalSpacing="xs"
      verticalSpacing="xs"
      highlightOnHover
      striped
    >
      <thead>
        <tr>
          <th>Receipt</th>
          <th>Creation Date</th>
          <th>Reason</th>
          <th>Purchase Order Code</th>
          <th>Order Code</th>
          <th>Quantity</th>
          <th>SKU</th>
          <th>Warehouse</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.docket.code}>
            <td>{docketTypeBadgeFragment(transaction.docket.type)}</td>
            <td>{DateUtils.isoDateToString(transaction.docket.createdAt)}</td>
            <td>{transaction.docket.reason.name}</td>
            <td>{transaction.docket.purchaseOrder?.code}</td>
            <td>{transaction.docket.order?.code}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.variant.sku}</td>
            <td>{transaction.docket.warehouse.name}</td>
            <td>{docketStatusBadgeFragment(transaction.docket.status)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default InventoryManage;
