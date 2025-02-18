import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class OrderResourceConfigs extends Configs {
  static managerPath = ManagerPath.ORDER_RESOURCE;
  static resourceUrl = ResourceURL.ORDER_RESOURCE;
  static resourceKey = 'order-resources';
  static createTitle = 'Add Order Source';
  static updateTitle = 'Update Order Source';
  static manageTitle = 'Manage Order Sources';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.ORDER,
      label: 'Manage Orders',
    },
    {
      link: ManagerPath.ORDER_RESOURCE,
      label: 'Manage Order Sources',
    },
    {
      link: ManagerPath.ORDER_CANCELLATION_REASON,
      label: 'Manage Order Cancellation Reasons',
    },
  ];
  
  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    code: {
      label: 'Order Source Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    name: {
      label: 'Order Source Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    color: {
      label: 'Order Source Color',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'customerResource.name': {
      label: 'Customer Source Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    customerResourceId: {
      label: 'Customer Source',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    status: {
      label: 'Order Source Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };  

  static properties = OrderResourceConfigs._rawProperties as
    EntityPropertySchema<typeof OrderResourceConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    name: '',
    color: '',
    customerResourceId: null as string | null,
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string(),
    name: z.string().min(2, MessageUtils.min(OrderResourceConfigs.properties.name.label, 2)),
    color: z.string(),
    customerResourceId: z.string().nullable(),
    status: z.string(),
  });
}

export default OrderResourceConfigs;
