import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import OrderResourceConfigs from 'pages/order-resource/OrderResourceConfigs';
import { OrderVariantRequest } from 'models/OrderVariant';
import ApplicationConstants from 'constants/ApplicationConstants';
import { PaymentMethodType } from 'models/PaymentMethod';
import { OrderResponse } from 'models/Order';
import DateUtils from 'utils/DateUtils';
import { Badge, ColorSwatch, Group, Stack, Text } from '@mantine/core';
import MiscUtils from 'utils/MiscUtils';
import React from 'react';

class OrderConfigs extends Configs {
  static managerPath = ManagerPath.ORDER;
  static resourceUrl = ResourceURL.ORDER;
  static resourceKey = 'orders';
  static createTitle = 'Add Order';
  static updateTitle = 'Update Order';
  static manageTitle = 'Manage Orders';

  static manageTitleLinks: TitleLink[] = OrderResourceConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true),
    code: {
      label: 'Order Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'orderResource.name': {
      label: 'Order Source Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    user: {
      label: 'Order Placed By',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    to: {
      label: 'Recipient',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    totalPay: {
      label: 'Total Payment',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    warehouse: {
      label: 'Warehouse',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    status: {
      label: 'Order Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = OrderConfigs._rawProperties as
    EntityPropertySchema<typeof OrderConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    status: '1',
    toName: '',
    toPhone: '',
    toAddress: '',
    toWardName: '',
    toDistrictName: '',
    toProvinceName: '',
    orderResourceId: '1',
    orderCancellationReasonId: null as string | null,
    note: '',
    userId: null as string | null,
    orderVariants: [] as OrderVariantRequest[],
    totalAmount: 0,
    tax: ApplicationConstants.DEFAULT_TAX,
    shippingCost: ApplicationConstants.DEFAULT_SHIPPING_COST,
    totalPay: ApplicationConstants.DEFAULT_SHIPPING_COST,
    paymentMethodType: PaymentMethodType.CASH,
    paymentStatus: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string().min(5, MessageUtils.min(OrderConfigs.properties.code.label, 5)),
    status: z.string(),
    toName: z.string(),
    toPhone: z.string(),
    toAddress: z.string(),
    toWardName: z.string(),
    toDistrictName: z.string(),
    toProvinceName: z.string(),
    orderResourceId: z.string({ invalid_type_error: 'Please do not leave this field empty.' }),
    orderCancellationReasonId: z.string().nullable(),
    note: z.string(),
    userId: z.string({ invalid_type_error: 'Please do not leave this field empty.' }),
    orderVariants: z.array(z.object({
      variantId: z.number(),
      price: z.number(),
      quantity: z.number(),
      amount: z.number(),
    })).min(1, 'You need to add at least 1 item'),
    totalAmount: z.number().min(0),
    tax: z.number().min(0),
    shippingCost: z.number().min(0),
    totalPay: z.number().min(0),
    paymentMethodType: z.string(),
    paymentStatus: z.string(),
  });

  static orderStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="gray" variant="outline" size="sm">New Order</Badge>;
    case 2:
      return <Badge color="blue" variant="outline" size="sm">Processing</Badge>;
    case 3:
      return <Badge color="violet" variant="outline" size="sm">In Delivery</Badge>;
    case 4:
      return <Badge color="green" variant="outline" size="sm">Delivered</Badge>;
    case 5:
      return <Badge color="red" variant="outline" size="sm">Canceled</Badge>;      
    }
  };

  static orderPaymentStatusBadgeFragment = (paymentStatus: number) => {
    switch (paymentStatus) {
    case 1:
      return <Badge color="gray" variant="outline" size="sm">Not Paid</Badge>;
    case 2:
      return <Badge color="green" variant="outline" size="sm">Paid</Badge>;      
    }
  };

  static entityDetailTableRowsFragment = (entity: OrderResponse) => {
    const PaymentMethodIcon = PageConfigs.paymentMethodIconMap[entity.paymentMethodType];

    return (
      <>
        <tr>
          <td>{OrderConfigs.properties.id.label}</td>
          <td>{entity.id}</td>
        </tr>
        <tr>
          <td>{OrderConfigs.properties.createdAt.label}</td>
          <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
        </tr>
        <tr>
          <td>{OrderConfigs.properties.updatedAt.label}</td>
          <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
        </tr>
        <tr>
          <td>{OrderConfigs.properties.code.label}</td>
          <td>{entity.code}</td>
        </tr>
        <tr>
          <td>{OrderConfigs.properties.status.label}</td>
          <td>{OrderConfigs.orderStatusBadgeFragment(entity.status)}</td>
        </tr>
        <tr>
          <td>{OrderConfigs.properties['orderResource.name'].label}</td>
          <td>
            <Group spacing="xs">
              <ColorSwatch color={entity.orderResource.color}/>
              {entity.orderResource.name}
            </Group>
          </td>
        </tr>
        <tr>
          <td>Order Cancellation Reason</td>
          <td>{entity.orderCancellationReason?.name}</td>
        </tr>
        <tr>
          <td>Order Note</td>
          <td style={{ maxWidth: 300 }}>{entity.note}</td>
        </tr>
        <tr>
          <td>Orderer</td>
          <td>
            <Stack spacing={0}>
              <Text size="sm">{entity.user.fullname}</Text>
              <Text size="xs" color="dimmed">{entity.user.username}</Text>
            </Stack>
          </td>
        </tr>
        <tr>
          <td>Receiver</td>
          <td>
            <Stack spacing={0}>
              <Text size="sm">{entity.toName}</Text>
              <Text size="xs">{entity.toPhone}</Text>
              <Text size="xs" color="dimmed">
                {[entity.toAddress, entity.toWardName, entity.toDistrictName, entity.toProvinceName].join(', ')}
              </Text>
            </Stack>
          </td>
        </tr>
        <tr>
          <td>Number of Items</td>
          <td>{entity.orderVariants.length} SKU</td>
        </tr>
        <tr>
          <td>Total Amount</td>
          <td>{MiscUtils.formatPrice(entity.totalAmount) + '₹'}</td>
        </tr>
        <tr>
          <td>Tax</td>
          <td>{entity.tax * 100 + '%'}</td>
        </tr>
        <tr>
          <td>Shipping Fee</td>
          <td>{MiscUtils.formatPrice(entity.shippingCost) + '₹'}</td>
        </tr>
        <tr>
          <td>{OrderConfigs.properties.totalPay.label}</td>
          <td>{MiscUtils.formatPrice(entity.totalPay) + '₹'}</td>
        </tr>
        <tr>
          <td>Payment Method</td>
          <td><PaymentMethodIcon/></td>
        </tr>
        <tr>
          <td>Payment Status</td>
          <td>{OrderConfigs.orderPaymentStatusBadgeFragment(entity.paymentStatus)}</td>
        </tr>
      </>
    );
  };
}

export default OrderConfigs;
