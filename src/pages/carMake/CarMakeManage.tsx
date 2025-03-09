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
import { CarMakeResponse } from 'models/CarMake';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import CarMakeConfigs from 'pages/carMake/CarMakeConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function CarMakeManage() {
  useResetManagePageState();
  useInitFilterPanelState(CarMakeConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<CarMakeResponse>,
  } = useGetAllApi<CarMakeResponse>(CarMakeConfigs.resourceUrl, CarMakeConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const carMakeStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge color="blue" variant="outline" size="sm">Activated</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Not activated</Badge>;
  };

  const showedPropertiesFragment = (entity: CarMakeResponse) => (
    <>
      <td>{entity.id}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.makeName}
        </Highlight>
      </td> 
    </>
  );

  const entityDetailTableRowsFragment = (entity: CarMakeResponse) => (
    <>
      <tr>
        <td>{CarMakeConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{CarMakeConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{CarMakeConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{CarMakeConfigs.properties.carMakename.label}</td>
        <td>{entity.makeName}</td>
      </tr>
      <tr>
        <td>{CarMakeConfigs.properties.vehicleTypeId.label}</td>
        <td>{entity.vehicleType.vehicleTypeName}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={CarMakeConfigs.manageTitleLinks}
          title={CarMakeConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={CarMakeConfigs.resourceUrl}
          resourceKey={CarMakeConfigs.resourceKey}
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
          properties={CarMakeConfigs.properties}
          resourceUrl={CarMakeConfigs.resourceUrl}
          resourceKey={CarMakeConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default CarMakeManage;
