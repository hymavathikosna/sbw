import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import OrderResourceConfigs from 'pages/order-resource/OrderResourceConfigs';

class OrderCancellationReasonConfigs extends Configs {
  static managerPath = ManagerPath.ORDER_CANCELLATION_REASON;
  static resourceUrl = ResourceURL.ORDER_CANCELLATION_REASON;
  static resourceKey = 'order-cancellation-reasons';
  static createTitle = 'Add Order Cancellation Reason';
  static updateTitle = 'Update Order Cancellation Reason';
  static manageTitle = 'Manage Order Cancellation Reasons';

  static manageTitleLinks: TitleLink[] = OrderResourceConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Order Cancellation Reason Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    note: {
      label: 'Order Cancellation Reason Note',
      type: EntityPropertyType.STRING,
    },
    status: {
      label: 'Order Cancellation Reason Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = OrderCancellationReasonConfigs._rawProperties as
    EntityPropertySchema<typeof OrderCancellationReasonConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    note: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(OrderCancellationReasonConfigs.properties.name.label, 2)),
    note: z.string(),
    status: z.string(),
  });
}

export default OrderCancellationReasonConfigs;
