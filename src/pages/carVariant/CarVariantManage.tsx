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
import { CarVariantResponse } from 'models/CarVariant';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import CarVariantConfigs from 'pages/carVariant/CarVariantConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function CarVariantManage() {
  useResetManagePageState();
  useInitFilterPanelState(CarVariantConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<CarVariantResponse>,
  } = useGetAllApi<CarVariantResponse>(CarVariantConfigs.resourceUrl, CarVariantConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const carVariantStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge color="blue" variant="outline" size="sm">Activated</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Not activated</Badge>;
  };

  const showedPropertiesFragment = (entity: CarVariantResponse) => (
    <>
      <td>{entity.id}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.variantName}
        </Highlight>
      </td> 
    </>
  );

  const entityDetailTableRowsFragment = (entity: CarVariantResponse) => (
    <>
      <tr>
        <td>{CarVariantConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{CarVariantConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{CarVariantConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{CarVariantConfigs.properties.carVariantname.label}</td>
        <td>{entity.variantName}</td>
      </tr>
      <tr>
        <td>{CarVariantConfigs.properties.carModelId.label}</td>
        <td>{entity.carModel.modelName}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={CarVariantConfigs.manageTitleLinks}
          title={CarVariantConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={CarVariantConfigs.resourceUrl}
          resourceKey={CarVariantConfigs.resourceKey}
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
          properties={CarVariantConfigs.properties}
          resourceUrl={CarVariantConfigs.resourceUrl}
          resourceKey={CarVariantConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default CarVariantManage;
