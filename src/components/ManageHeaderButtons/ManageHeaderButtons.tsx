import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Group } from '@mantine/core';
import { Plus, Trash } from 'tabler-icons-react';
import { ListResponse } from 'utils/FetchUtils';
import useManageHeaderButtonsViewModel from 'components/ManageHeaderButtons/ManageHeaderButtons.vm';

export interface ManageHeaderButtonsProps {
  listResponse: ListResponse;
  resourceUrl: string;
  resourceKey: string;
}

function ManageHeaderButtons(props: ManageHeaderButtonsProps) {
  const { handleDeleteBatchEntitiesButton } = useManageHeaderButtonsViewModel(props);

  return (
    <Group spacing="xs">
      <Button
        component={Link}
        to="create"
        variant="outline"
        leftIcon={<Plus/>}
      >
        Add new
      </Button>
      <Button
        variant="outline"
        color="red"
        leftIcon={<Trash/>}
        onClick={handleDeleteBatchEntitiesButton}
      >
        bulk delete
      </Button>
    </Group>
  );
}

export default React.memo(ManageHeaderButtons);
