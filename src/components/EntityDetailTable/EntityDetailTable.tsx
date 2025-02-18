import React from 'react';
import { Table } from '@mantine/core';
import useGetByIdApi from 'hooks/use-get-by-id-api';

interface EntityDetailTableProps<T> {
  entityDetailTableRowsFragment: (entity: T) => React.ReactNode;
  resourceUrl: string;
  resourceKey: string;
  entityId: number;
}

function EntityDetailTable<T>({
  entityDetailTableRowsFragment,
  resourceUrl,
  resourceKey,
  entityId,
}: EntityDetailTableProps<T>) {
  const { isLoading, isError, data } = useGetByIdApi<T>(resourceUrl, resourceKey, entityId);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>An error occurred while fetching data</>;
  }

  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>{entityDetailTableRowsFragment(data as T)}</tbody>
    </Table>
  );
}

export default EntityDetailTable;
