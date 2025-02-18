import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import { DocketVariantRequest } from 'models/DocketVariant';

class DocketConfigs extends Configs {
  static managerPath = ManagerPath.DOCKET;
  static resourceUrl = ResourceURL.DOCKET;
  static resourceKey = 'dockets';
  static createTitle = 'Add Inventory In/Out Ticket';
  static updateTitle = 'Update Inventory In/Out Ticket';
  static manageTitle = 'Manage Inventory In/Out Tickets';

  static manageTitleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true),
    type: {
      label: 'Export/Import Order Type',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    code: {
      label: 'Export/Import Order Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    totalVariants: {
      label: 'Number of Items',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'reason.name': {
      label: 'Export/Import Order Reason Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'warehouse.name': {
      label: 'Warehouse Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    note: {
      label: 'Export/Import Order Note',
      type: EntityPropertyType.STRING,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    status: {
      label: 'Export/Import Order Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = DocketConfigs._rawProperties as
    EntityPropertySchema<typeof DocketConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    type: '1',
    code: '',
    reasonId: null as string | null,
    warehouseId: null as string | null,
    docketVariants: [] as DocketVariantRequest[],
    purchaseOrderId: null as string | null,
    orderId: null as string | null,
    note: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    type: z.string(),
    code: z.string().min(5, MessageUtils.min(DocketConfigs.properties.code.label, 5)),
    reasonId: z.string({ invalid_type_error: 'Please do not leave this field empty.' }),
    warehouseId: z.string({ invalid_type_error: 'Please do not leave this field empty.' }),
    docketVariants: z.array(z.object({
      variantId: z.number(),
      quantity: z.number(),
    })).min(1, 'You need to add at least 1 item'),
    purchaseOrderId: z.string().nullable(),
    orderId: z.string().nullable(),
    note: z.string(),
    status: z.string(),
  });
}

export default DocketConfigs;
