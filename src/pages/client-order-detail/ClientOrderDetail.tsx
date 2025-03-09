import React from 'react';
import {
  Anchor,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  MantineColor,
  ScrollArea,
  Skeleton,
  Stack,
  Table,
  Text,
  Textarea,
  ThemeIcon,
  Title,
  Tooltip,
  useMantineTheme
} from '@mantine/core';
import { ClientUserNavbar } from 'components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  ClientOrderDetailResponse,
  ClientOrderVariantResponse,
  ClientReviewRequest,
  ClientReviewResponse,
  ClientWaybillLogResponse,
  Empty
} from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { Link, useParams } from 'react-router-dom';
import useTitle from 'hooks/use-title';
import { AlertTriangle, ArrowRight, Check, Circle, Icon, InfoCircle, Plus, X } from 'tabler-icons-react';
import DateUtils from 'utils/DateUtils';
import MiscUtils from 'utils/MiscUtils';
import PageConfigs from 'pages/PageConfigs';
import { useModals } from '@mantine/modals';
import ApplicationConstants from 'constants/ApplicationConstants';
import { Rating } from '@smastrom/react-rating';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import useAuthStore from 'stores/use-auth-store';

function ClientOrderDetail() {
  useTitle();

  const theme = useMantineTheme();
  const modals = useModals();

  const { code } = useParams();

  const { orderResponse, isLoadingOrderResponse, isErrorOrderResponse } = useGetOrderApi(code as string);
  const order = orderResponse as ClientOrderDetailResponse;

  const cancelOrderApi = useCancelOrderApi(code as string);

  const handleCancelOrderButton = () => {
    modals.openConfirmModal({
      size: 'xs',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Cancel Confirmation</strong>,
      children: <Text size="sm">Do you want to cancel this order? It cannot be undone.</Text>,
      labels: {
        cancel: 'Do not cancel',
        confirm: 'Cancel',
      },
      confirmProps: { color: 'red' },
      onConfirm: () => cancelOrderApi.mutate(),
    });
  };

  const orderStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="gray" variant="filled" size="sm">New Order</Badge>;
    case 2:
      return <Badge color="blue" variant="filled" size="sm">Processing</Badge>;
    case 3:
      return <Badge color="violet" variant="filled" size="sm">Shipping</Badge>;
    case 4:
      return <Badge color="green" variant="filled" size="sm">Delivered</Badge>;
    case 5:
      return <Badge color="red" variant="filled" size="sm">Canceled</Badge>;
    }
  };

  const orderPaymentStatusBadgeFragment = (paymentStatus: number) => {
    switch (paymentStatus) {
    case 1:
      return <Badge color="gray" variant="filled" size="sm">Not Paid</Badge>;
    case 2:
      return <Badge color="green" variant="filled" size="sm">Paid</Badge>;
    }
  };

  const getWaybillLogInfo = (waybillLog: ClientWaybillLogResponse) => {
    type WaybillLogInfo = {
      icon: Icon,
      color: MantineColor,
      text: string,
    };

    const waybillLogMap: Record<number, WaybillLogInfo> = {
      0: {
        icon: Circle,
        color: 'gray',
        text: 'Tracking status unclear',
      },
      1: {
        icon: Plus,
        color: 'blue',
        text: 'Order approved and tracking created',
      },
      2: {
        icon: ArrowRight,
        color: 'orange',
        text: 'Shipping in progress',
      },
      3: {
        icon: Check,
        color: 'teal',
        text: 'Delivery successful',
      },
      4: {
        icon: X,
        color: 'pink',
        text: 'Tracking canceled',
      },
    };

    return waybillLogMap[waybillLog.waybillLogCurrentStatus || 0];
  };

  let orderContentFragment;

  if (isLoadingOrderResponse) {
    orderContentFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorOrderResponse) {
    orderContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>An error has occurred</Text>
      </Stack>
    );
  }

  const cardStyles = {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    height: '100%',
  };

  if (order) {
    const PaymentMethodIcon = PageConfigs.paymentMethodIconMap[order.orderPaymentMethodType];

    orderContentFragment = (
      <Stack>
        <Card p="md" radius="md" sx={cardStyles}>
          <Group position="apart">
            <Group>
              <Text weight={500}>Order Code: {order.orderCode}</Text>
              <Text color="dimmed">
                Created Date: {DateUtils.isoDateToString(order.orderCreatedAt)}
              </Text>
            </Group>
            <Group spacing="xs">
              {orderStatusBadgeFragment(order.orderStatus)}
              {orderPaymentStatusBadgeFragment(order.orderPaymentStatus)}
            </Group>
          </Group>
        </Card>

        <Grid>
          <Grid.Col md={4}>
            <Card p="md" radius="md" sx={cardStyles}>
              <Stack spacing="xs">
                <Text weight={500} color="dimmed">Thông tin người nhận</Text>
                <Stack spacing={5}>
                  <Text size="sm" weight={500}>{order.orderToName}</Text>
                  <Text size="sm">{order.orderToPhone}</Text>
                  <Text size="sm">
                    {[order.orderToAddress, order.orderToWardName, order.orderToDistrictName, order.orderToProvinceName]
                      .filter(Boolean)
                      .join(', ')}
                  </Text>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col md={4}>
            <Card p="md" radius="md" sx={cardStyles}>
              <Stack spacing="xs">
                <Text weight={500} color="dimmed">Hình thức giao hàng</Text>
                <Image src={MiscUtils.ghnLogoPath} styles={{ image: { maxWidth: 170 } }}/>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col md={4}>
            <Card p="md" radius="md" sx={cardStyles}>
              <Stack spacing="xs">
                <Text weight={500} color="dimmed">Payment method</Text>
                <Group spacing="xs">
                  <PaymentMethodIcon color={theme.colors.gray[5]}/>
                  <Text size="sm">{PageConfigs.paymentMethodNameMap[order.orderPaymentMethodType]}</Text>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <Card p="md" radius="md" sx={cardStyles}>
          <Stack spacing="xs">
            <Text weight={500} color="dimmed">Theo dõi vận đơn</Text>
            {order.orderWaybill
              ? (
                <Grid>
                  <Grid.Col sm={3}>
                    <Stack>
                      <Stack align="flex-start" spacing={5}>
                        <Text size="sm" weight={500}>Mã vận đơn</Text>
                        <Badge radius="md" size="lg" variant="filled" color="grape">
                          {order.orderWaybill.waybillCode}
                        </Badge>
                      </Stack>

                      <Stack align="flex-start" spacing={5}>
                        <Text size="sm" weight={500}>Dự kiến giao hàng</Text>
                        <Text size="sm">
                          {DateUtils.isoDateToString(order.orderWaybill.waybillExpectedDeliveryTime, 'DD/MM/YYYY')}
                        </Text>
                      </Stack>
                    </Stack>
                  </Grid.Col>

                  <Grid.Col sm={9}>
                    <Stack align="flex-start" spacing="xs">
                      <Text size="sm" weight={500}>Lịch sử vận đơn</Text>
                      <Stack spacing={5}>
                        {[...order.orderWaybill.waybillLogs]
                          .reverse()
                          .map(waybillLog => {
                            const waybillLogInfo = getWaybillLogInfo(waybillLog);

                            return (
                              <Group key={waybillLog.waybillLogId} spacing="sm" sx={{ flexWrap: 'nowrap' }}>
                                <ThemeIcon color={waybillLogInfo.color} size="sm" variant="filled" radius="xl">
                                  <waybillLogInfo.icon size={12}/>
                                </ThemeIcon>
                                <Text size="xs" color="dimmed">
                                  {DateUtils.isoDateToString(waybillLog.waybillLogCreatedAt)}
                                </Text>
                                <Text size="xs">
                                  {waybillLogInfo.text}
                                </Text>
                              </Group>
                            );
                          })}
                      </Stack>
                    </Stack>
                  </Grid.Col>
                </Grid>
              )
              : <Text size="sm">Hiện đơn hàng chưa có vận đơn</Text>}
          </Stack>
        </Card>

        <Card p={0} radius="md" sx={cardStyles}>
          <ScrollArea>
            <Table verticalSpacing="sm" horizontalSpacing="lg">
              <thead>
                <tr>
                  <th style={{ minWidth: 325 }}><Text weight="initial" size="sm" color="dimmed">Item</Text></th>
                  <th style={{ minWidth: 125 }}><Text weight="initial" size="sm" color="dimmed">Unit Price</Text></th>
                  <th style={{ minWidth: 150 }}><Text weight="initial" size="sm" color="dimmed">Quantity</Text></th>
                  {/* TODO: Add discountPercent for OrderVariant */}
                  {/*<th style={{ minWidth: 125 }}><Text weight="initial" size="sm" color="dimmed">Discount</Text></th>*/}
                  <th style={{ minWidth: 125 }}><Text weight="initial" size="sm" color="dimmed">Total</Text></th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems
                  .map(orderItem => (
                    <OrderItemTableRow
                      key={orderItem.orderItemVariant.variantId}
                      orderItem={orderItem}
                      canReview={order.orderStatus === 4 && order.orderPaymentStatus === 2}
                    />
                  ))}
              </tbody>
            </Table>
          </ScrollArea>
        </Card>

        <Grid>
          <Grid.Col sm={7} md={8} lg={9}/>
          <Grid.Col sm={5} md={4} lg={3}>
            <Stack spacing="xs">
              <Group position="apart">
                <Text size="sm" color="dimmed">Provisional total</Text>
                <Text size="sm" sx={{ textAlign: 'right' }}>
                  {MiscUtils.formatPrice(order.orderTotalAmount) + '\u00A0₫'}
                </Text>
              </Group>
              <Group position="apart">
                <Text size="sm" color="dimmed">Tax (10%)</Text>
                <Text size="sm" sx={{ textAlign: 'right' }}>
                  {MiscUtils.formatPrice(Number(
                    (order.orderTotalAmount * ApplicationConstants.DEFAULT_TAX).toFixed(0))) + '\u00A0₫'}
                </Text>
              </Group>
              <Group position="apart">
                <Group spacing="xs">
                  <Text size="sm" color="dimmed">Shipping Fee</Text>
                  {order.orderStatus === 1 && (
                    <Tooltip
                      label="Shipping fee may not have been calculated yet and will be updated"
                      withArrow
                      sx={{ height: 20 }}
                    >
                      <ThemeIcon variant="light" color="blue" size="sm">
                        <InfoCircle size={14}/>
                      </ThemeIcon>
                    </Tooltip>
                  )}
                </Group>
                <Text size="sm" sx={{ textAlign: 'right' }}>
                  {MiscUtils.formatPrice(order.orderShippingCost) + '\u00A0₫'}
                </Text>
              </Group>
              <Group position="apart">
                <Text size="sm" weight={500}>Total amount</Text>
                <Text size="lg" weight={700} color="blue" sx={{ textAlign: 'right' }}>
                  {MiscUtils.formatPrice(order.orderTotalPay) + '\u00A0₫'}
                </Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider/>

        <Button
          color="pink"
          radius="md"
          sx={{ width: 'fit-content' }}
          onClick={handleCancelOrderButton}
          disabled={![1, 2].includes(order.orderStatus)}
        >
          Cancel order
        </Button>
      </Stack>
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
                  Order details
                </Title>

                {orderContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

function OrderItemTableRow({ orderItem, canReview }: { orderItem: ClientOrderVariantResponse, canReview: boolean }) {
  const theme = useMantineTheme();
  const modals = useModals();

  const handleOpenReviewModalButton = () => {
    modals.openModal({
      size: 'lg',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Product review</strong>,
      children: <ReviewProductModal orderItem={orderItem}/>,
    });
  };

  return (
    <tr key={orderItem.orderItemVariant.variantId}>
      <td>
        <Group spacing="xs">
          <Image
            radius="md"
            width={65}
            height={65}
            src={orderItem.orderItemVariant.variantProduct.productThumbnail || undefined}
            alt={orderItem.orderItemVariant.variantProduct.productName}
          />
          <Stack spacing={3.5}>
            <Anchor
              component={Link}
              to={'/product/' + orderItem.orderItemVariant.variantProduct.productSlug}
              size="sm"
            >
              {orderItem.orderItemVariant.variantProduct.productName}
            </Anchor>
            {orderItem.orderItemVariant.variantProperties && (
              <Stack spacing={1.5}>
                {orderItem.orderItemVariant.variantProperties.content.map(variantProperty => (
                  <Text key={variantProperty.id} size="xs" color="dimmed">
                    {variantProperty.name}: {variantProperty.value}
                  </Text>
                ))}
              </Stack>
            )}
            {canReview && (
              <Button
                size="xs"
                radius="md"
                variant="outline"
                mt={5}
                sx={{ width: 'fit-content' }}
                onClick={handleOpenReviewModalButton}
                disabled={orderItem.orderItemVariant.variantProduct.productIsReviewed}
                title={orderItem.orderItemVariant.variantProduct.productIsReviewed ? 'The product has been reviewed by you' : ''}
              >
                Đánh giá
              </Button>
            )}
          </Stack>
        </Group>
      </td>
      <td>
        <Text size="sm">
          {MiscUtils.formatPrice(orderItem.orderItemPrice) + '₹'}
        </Text>
      </td>
      <td>
        <Text size="sm">
          {orderItem.orderItemQuantity}
        </Text>
      </td>
      {/* TODO: Add discountPercent cho OrderVariant */}
      {/*<td>*/}
      {/*  <Text size="sm">*/}
      {/*    {MiscUtils.formatPrice(0) + '₹'}*/}
      {/*  </Text>*/}
      {/*</td>*/}
      <td>
        <Text weight={500} size="sm" color="blue">
          {MiscUtils.formatPrice(orderItem.orderItemAmount) + '₹'}
        </Text>
      </td>
    </tr>
  );
}

const ratingNameMap: Record<number, string> = {
  1: 'Very Dissatisfied',
  2: 'Dissatisfied',
  3: 'Neutral',
  4: 'Satisfied',
  5: 'Extremely Satisfied',
};

function ReviewProductModal({ orderItem }: { orderItem: ClientOrderVariantResponse }) {
  const modals = useModals();

  const { user } = useAuthStore();

  const form = useForm({
    initialValues: {
      rating: 5,
      review: '',
    },
    schema: zodResolver(z.object({
      rating: z.number().min(1).max(5),
      review: z.string().min(3, { message: 'Please enter at least 3 characters' }),
    })),
  });

  const createReviewApi = useCreateReviewApi();

  const handleFormSubmit = form.onSubmit((formValues) => {
    if (user) {
      const reviewRequest: ClientReviewRequest = {
        userId: user.id,
        productId: orderItem.orderItemVariant.variantProduct.productId,
        ratingScore: formValues.rating,
        content: formValues.review,
        status: 1,
      };
      createReviewApi.mutate(reviewRequest);
      modals.closeAll();
    }
  });

  return (
    <Stack>
      <Group spacing="xs">
        <Image
          radius="md"
          width={40}
          height={40}
          src={orderItem.orderItemVariant.variantProduct.productThumbnail || undefined}
          alt={orderItem.orderItemVariant.variantProduct.productName}
        />
        <Text size="sm">
          {orderItem.orderItemVariant.variantProduct.productName}
        </Text>
      </Group>

      <Stack spacing="xs" align="center" mb="md">
        <Text size="lg" weight={500}>Please rate</Text>
        <Rating
          style={{ maxWidth: 180 }}
          {...form.getInputProps('rating')}
          isRequired
        />
        <Text size="sm" color="dimmed">{ratingNameMap[form.values.rating]}</Text>
      </Stack>

      <Textarea
        required
        data-autofocus
        placeholder="Please share your thoughts and review of this product."
        autosize
        minRows={4}
        radius="md"
        {...form.getInputProps('review')}
      />

      <Group position="right">
        <Button variant="default" radius="md" onClick={modals.closeAll}>
          Close
        </Button>
        <Button type="submit" radius="md" onClick={handleFormSubmit}>
          Submit review
        </Button>
      </Group>
    </Stack>
  );
}

function useGetOrderApi(orderCode: string) {
  const {
    data: orderResponse,
    isLoading: isLoadingOrderResponse,
    isError: isErrorOrderResponse,
  } = useQuery<ClientOrderDetailResponse, ErrorMessage>(
    ['client-api', 'orders', 'getOrder', orderCode],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_ORDER + '/' + orderCode),
    {
      onError: () => NotifyUtils.simpleFailed('Failed to retrieve data'),
      keepPreviousData: true,
    }
  );

  return { orderResponse, isLoadingOrderResponse, isErrorOrderResponse };
}

function useCancelOrderApi(orderCode: string) {
  const queryClient = useQueryClient();

  return useMutation<Empty, ErrorMessage, void>(
    () => FetchUtils.putWithToken(ResourceURL.CLIENT_ORDER_CANCEL + '/' + orderCode, {}),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Order cancellation successful');
        void queryClient.invalidateQueries(['client-api', 'orders', 'getOrder', orderCode]);
      },
      onError: () => NotifyUtils.simpleFailed('Order cancellation failed'),      
    }
  );
}

function useCreateReviewApi() {
  const queryClient = useQueryClient();

  return useMutation<ClientReviewResponse, ErrorMessage, ClientReviewRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_REVIEW, requestBody),
    {
      onSuccess: (response) => {
        NotifyUtils.simpleSuccess(
          <Text inherit>
            <span>You have added a review for the product </span>
            <Anchor component={Link} to={'/product/' + response.reviewProduct.productSlug} inherit>
              {response.reviewProduct.productName}
            </Anchor>
            <span>. Please wait for approval to display.</span>
          </Text>
        );
        void queryClient.invalidateQueries(['client-api', 'orders', 'getOrder']);
      },
      onError: () => NotifyUtils.simpleFailed('Unable to add a review for the product'),
    }
  );
}

export default ClientOrderDetail;
