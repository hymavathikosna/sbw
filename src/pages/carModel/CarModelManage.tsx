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
import { CarModelResponse } from 'models/CarModel';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import CarModelConfigs from 'pages/carModel/CarModelConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function CarModelManage() {
  useResetManagePageState();
  useInitFilterPanelState(CarModelConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<CarModelResponse>,
  } = useGetAllApi<CarModelResponse>(CarModelConfigs.resourceUrl, CarModelConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const carModelStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge color="blue" variant="outline" size="sm">Activated</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Not activated</Badge>;
  };

  const showedPropertiesFragment = (entity: CarModelResponse) => (
    <>
      <td>{entity.id}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.modelName}
        </Highlight>
      </td> 
    </>
  );

  const entityDetailTableRowsFragment = (entity: CarModelResponse) => (
    <>
      <tr>
        <td>{CarModelConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{CarModelConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{CarModelConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{CarModelConfigs.properties.carModelname.label}</td>
        <td>{entity.modelName}</td>
      </tr>
      <tr>
        <td>{CarModelConfigs.properties.carMakeId.label}</td>
        <td>{entity.carMake.makeName}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={CarModelConfigs.manageTitleLinks}
          title={CarModelConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={CarModelConfigs.resourceUrl}
          resourceKey={CarModelConfigs.resourceKey}
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
          properties={CarModelConfigs.properties}
          resourceUrl={CarModelConfigs.resourceUrl}
          resourceKey={CarModelConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default CarModelManage;
