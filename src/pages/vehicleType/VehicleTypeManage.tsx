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
import { VehicleTypeResponse } from 'models/VehicleType';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import VehicleTypeConfigs from 'pages/vehicleType/VehicleTypeConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function VehicleTypeManage() {
  useResetManagePageState();
  useInitFilterPanelState(VehicleTypeConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<VehicleTypeResponse>,
  } = useGetAllApi<VehicleTypeResponse>(VehicleTypeConfigs.resourceUrl, VehicleTypeConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const vehicleTypeStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge color="blue" variant="outline" size="sm">Activated</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Not activated</Badge>;
  };

  const showedPropertiesFragment = (entity: VehicleTypeResponse) => (
    <>
      <td>{entity.id}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.vehicleTypeName}
        </Highlight>
      </td> 
    </>
  );

  const entityDetailTableRowsFragment = (entity: VehicleTypeResponse) => (
    <>
      <tr>
        <td>{VehicleTypeConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{VehicleTypeConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{VehicleTypeConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{VehicleTypeConfigs.properties.vehicleTypename.label}</td>
        <td>{entity.vehicleTypeName}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={VehicleTypeConfigs.manageTitleLinks}
          title={VehicleTypeConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={VehicleTypeConfigs.resourceUrl}
          resourceKey={VehicleTypeConfigs.resourceKey}
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
          properties={VehicleTypeConfigs.properties}
          resourceUrl={VehicleTypeConfigs.resourceUrl}
          resourceKey={VehicleTypeConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default VehicleTypeManage;
