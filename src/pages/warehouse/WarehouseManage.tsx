import React from 'react';
import { Badge, Highlight, Stack } from '@mantine/core';
import {
  FilterPanel,
  ManageHeader,
  ManageHeaderButtons,
  ManageHeaderTitle,
  ManageMain,
  ManagePagination,
  ManageTable,
  SearchPanel
} from 'components';
import DateUtils from 'utils/DateUtils';
import { WarehouseResponse } from 'models/Warehouse';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function WarehouseManage() {
  useResetManagePageState();
  useInitFilterPanelState(WarehouseConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<WarehouseResponse>,
  } = useGetAllApi<WarehouseResponse>(WarehouseConfigs.resourceUrl, WarehouseConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const warehouseStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">In effect</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Not in effect</Badge>;
  };

  const showedPropertiesFragment = (entity: WarehouseResponse) => (
    <>
      <td>{entity.id}</td>
      <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.code}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.name}
        </Highlight>
      </td>
      <td>{warehouseStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: WarehouseResponse) => (
    <>
      <tr>
        <td>{WarehouseConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{WarehouseConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{WarehouseConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{WarehouseConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{WarehouseConfigs.properties.name.label}</td>
        <td>{entity.name}</td>
      </tr>
      <tr>
        <td>{WarehouseConfigs.properties['address.line'].label}</td>
        <td>{entity.address?.line}</td>
      </tr>
      <tr>
        <td>{WarehouseConfigs.properties['address.province.name'].label}</td>
        <td>{entity.address?.province?.name}</td>
      </tr>
      <tr>
        <td>{WarehouseConfigs.properties['address.district.name'].label}</td>
        <td>{entity.address?.district?.name}</td>
      </tr>
      <tr>
        <td>{WarehouseConfigs.properties.status.label}</td>
        <td>{warehouseStatusBadgeFragment(entity.status)}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={WarehouseConfigs.manageTitleLinks}
          title={WarehouseConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={WarehouseConfigs.resourceUrl}
          resourceKey={WarehouseConfigs.resourceKey}
        />
      </ManageHeader>

      <SearchPanel/>

      <FilterPanel/>

      <ManageMain
        listResponse={listResponse}
        isLoading={isLoading}
      >
        <ManageTable
          listResponse={listResponse}
          properties={WarehouseConfigs.properties}
          resourceUrl={WarehouseConfigs.resourceUrl}
          resourceKey={WarehouseConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default WarehouseManage;
