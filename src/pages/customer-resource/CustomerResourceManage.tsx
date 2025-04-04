import React from 'react';
import { Badge, Code, ColorSwatch, Group, Highlight, Stack } from '@mantine/core';
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
import { CustomerResourceResponse } from 'models/CustomerResource';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import CustomerResourceConfigs from 'pages/customer-resource/CustomerResourceConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function CustomerResourceManage() {
  useResetManagePageState();
  useInitFilterPanelState(CustomerResourceConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<CustomerResourceResponse>,
  } = useGetAllApi<CustomerResourceResponse>(CustomerResourceConfigs.resourceUrl, CustomerResourceConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const customerResourceStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">In effect</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Not in effect</Badge>;
  };

  const showedPropertiesFragment = (entity: CustomerResourceResponse) => (
    <>
      <td>{entity.id}</td>
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
      <td>
        <Group spacing="xs">
          <ColorSwatch color={entity.color}/>
          <Code>{entity.color.toLowerCase()}</Code>
        </Group>
      </td>
      <td>{customerResourceStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: CustomerResourceResponse) => (
    <>
      <tr>
        <td>{CustomerResourceConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{CustomerResourceConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{CustomerResourceConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{CustomerResourceConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{CustomerResourceConfigs.properties.name.label}</td>
        <td>{entity.name}</td>
      </tr>
      <tr>
        <td>{CustomerResourceConfigs.properties.description.label}</td>
        <td style={{ maxWidth: 300 }}>{entity.description}</td>
      </tr>
      <tr>
        <td>{CustomerResourceConfigs.properties.color.label}</td>
        <td>
          <Group spacing="xs">
            <ColorSwatch color={entity.color}/>
            <Code>{entity.color.toLowerCase()}</Code>
          </Group>
        </td>
      </tr>
      <tr>
        <td>{CustomerResourceConfigs.properties.status.label}</td>
        <td>{customerResourceStatusBadgeFragment(entity.status)}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={CustomerResourceConfigs.manageTitleLinks}
          title={CustomerResourceConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={CustomerResourceConfigs.resourceUrl}
          resourceKey={CustomerResourceConfigs.resourceKey}
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
          properties={CustomerResourceConfigs.properties}
          resourceUrl={CustomerResourceConfigs.resourceUrl}
          resourceKey={CustomerResourceConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default CustomerResourceManage;
