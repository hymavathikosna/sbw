import useTitle from 'hooks/use-title';
import {
  Anchor,
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Pagination,
  Skeleton,
  Stack,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import React, { useState } from 'react';
import ApplicationConstants from 'constants/ApplicationConstants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FetchUtils, { ErrorMessage, ListResponse } from 'utils/FetchUtils';
import { ClientPreorderRequest, ClientPreorderResponse } from 'types';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { AlertTriangle, BellOff, Marquee, Trash } from 'tabler-icons-react';
import { useModals } from '@mantine/modals';
import { Link } from 'react-router-dom';
import DateUtils from 'utils/DateUtils';
import { ClientUserNavbar } from 'components';
import useAuthStore from 'stores/use-auth-store';

function ClientPreorder() {
  useTitle();

  const theme = useMantineTheme();

  const [activePage, setActivePage] = useState(1);

  const {
    preorderResponses,
    isLoadingPreorderResponses,
    isErrorPreorderResponses,
  } = useGetAllPreordersApi(activePage);
  const preorders = preorderResponses as ListResponse<ClientPreorderResponse>;

  let preorderContentFragment;

  if (isLoadingPreorderResponses) {
    preorderContentFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorPreorderResponses) {
    preorderContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>An error has occurred</Text>
      </Stack>
    );
  }

  if (preorders && preorders.totalElements === 0) {
    preorderContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.blue[6] }}>
        <Marquee size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>No pre-ordered products yet</Text>
      </Stack>
    );
  }

  if (preorders && preorders.totalElements > 0) {
    preorderContentFragment = (
      <>
        <Stack>
          {preorders.content.map(preorder => <ClientPreorderCard key={preorder.preorderId} preorder={preorder}/>)}
        </Stack>

        <Group position="apart" mt={theme.spacing.lg}>
          <Pagination
            page={activePage}
            total={preorders.totalPages}
            onChange={(page: number) => (page !== activePage) && setActivePage(page)}
          />
          <Text>
            <Text component="span" weight={500}>Page {activePage}</Text>
            <span> / {preorders.totalPages}</span>
          </Text>
        </Group>
      </>
    );
  }

  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col md={3}>
            <ClientUserNavbar/>
          </Grid.Col>

          <Grid.Col md={9}>
            <Card radius="md" shadow="sm" p="lg">
              <Stack>
                <Title order={2}>
                  Pre-order product
                </Title>

                {preorderContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

function ClientPreorderCard({ preorder }: { preorder: ClientPreorderResponse }) {
  const theme = useMantineTheme();
  const modals = useModals();

  const updatePreorderApi = useUpdatePreorderApi();
  const deletePreordersApi = useDeletePreordersApi();

  const { user } = useAuthStore();

  const handleCancelPreorderButton = () => {
    modals.openConfirmModal({
      size: 'xs',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Confirm Cancellation</strong>,
      children: (
        <Text size="sm">
          Cancel the preorder notification for the product <strong>{preorder.preorderProduct.productName}</strong>,
          this action cannot be undone?
        </Text>
      ),
      labels: {
        cancel: 'Do not cancel',
        confirm: 'Cancel',
      },
      confirmProps: { color: 'orange' },
      onConfirm: () => {
        if (user) {
          const clientPreorderRequest: ClientPreorderRequest = {
            userId: user.id,
            productId: preorder.preorderProduct.productId,
            status: 3,
          };
          updatePreorderApi.mutate(clientPreorderRequest);
        }
      },
    });
  };

  const handleDeletePreorderButton = () => {
    modals.openConfirmModal({
      size: 'xs',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Confirm Deletion</strong>,
      children: (
        <Text size="sm">
          Delete the product <strong>{preorder.preorderProduct.productName}</strong> from the preorder list?
        </Text>
      ),
      labels: {
        cancel: 'Do not delete',
        confirm: 'Delete',
      },
      confirmProps: { color: 'red' },
      onConfirm: () => deletePreordersApi.mutate([preorder.preorderId]),
    });
  };

  const preorderStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="gray" variant="outline" size="sm">No Notification</Badge>;
    case 2:
      return <Badge color="green" variant="outline" size="sm">Notification Sent</Badge>;
    case 3:
      return <Badge color="pink" variant="outline" size="sm">Notification Canceled</Badge>;      
    }
  };

  return (
    <Group position="apart">
      <Group>
        <Image
          radius="md"
          width={55}
          height={55}
          src={preorder.preorderProduct.productThumbnail || undefined}
          alt={preorder.preorderProduct.productName}
          withPlaceholder
        />
        <Stack spacing={3.5}>
          <Group spacing="sm">
            <Anchor component={Link} to={'/product/' + preorder.preorderProduct.productSlug} weight={500}>
              {preorder.preorderProduct.productName}
            </Anchor>
            {preorderStatusBadgeFragment(preorder.preorderStatus)}
          </Group>
          <Text size="sm" color="dimmed">
            Updated at {DateUtils.isoDateToString(preorder.preorderUpdatedAt)}
          </Text>
        </Stack>
      </Group>

      <Group spacing="xs">
        <Button
          variant="outline"
          color="orange"
          leftIcon={<BellOff size={18} strokeWidth={1.5}/>}
          compact
          title="Cancel Notification"
          onClick={handleCancelPreorderButton}
          disabled={preorder.preorderStatus !== 1}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          color="red"
          leftIcon={<Trash size={18} strokeWidth={1.5}/>}
          compact
          onClick={handleDeletePreorderButton}
        >
          Delete
        </Button>
      </Group>
    </Group>
  );
}

function useGetAllPreordersApi(activePage: number) {
  const requestParams = {
    page: activePage,
    size: ApplicationConstants.DEFAULT_CLIENT_PREORDER_PAGE_SIZE,
  };

  const {
    data: preorderResponses,
    isLoading: isLoadingPreorderResponses,
    isError: isErrorPreorderResponses,
  } = useQuery<ListResponse<ClientPreorderResponse>, ErrorMessage>(
    ['client-api', 'preorders', 'getAllPreorders', requestParams],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_PREORDER, requestParams),
    {
      onError: () => NotifyUtils.simpleFailed('Failed to retrieve data'),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return { preorderResponses, isLoadingPreorderResponses, isErrorPreorderResponses };
}

function useUpdatePreorderApi() {
  const queryClient = useQueryClient();

  return useMutation<ClientPreorderResponse, ErrorMessage, ClientPreorderRequest>(
    (requestBody) => FetchUtils.putWithToken(ResourceURL.CLIENT_PREORDER, requestBody),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Update successful');
        void queryClient.invalidateQueries(['client-api', 'preorders', 'getAllPreorders']);
      },
      onError: () => NotifyUtils.simpleFailed('Update failed'),      
    }
  );
}

function useDeletePreordersApi() {
  const queryClient = useQueryClient();

  return useMutation<void, ErrorMessage, number[]>(
    (entityIds) => FetchUtils.deleteWithToken(ResourceURL.CLIENT_PREORDER, entityIds),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Successfully deleted the preordered product');
        void queryClient.invalidateQueries(['client-api', 'preorders', 'getAllPreorders']);
      },
      onError: () => NotifyUtils.simpleFailed('Failed to delete the preordered product'),      
    }
  );
}

export default ClientPreorder;
