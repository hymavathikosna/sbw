import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import { PurchaseOrderVariantRequest } from 'models/PurchaseOrderVariant';
import MessageUtils from 'utils/MessageUtils';

class PurchaseOrderConfigs extends Configs {
  static managerPath = ManagerPath.PURCHASE_ORDER;
  static resourceUrl = ResourceURL.PURCHASE_ORDER;
  static resourceKey = 'purchase-orders';
  static createTitle = 'Add Purchase Order';
  static updateTitle = 'Update Purchase Order';
  static manageTitle = 'Manage Purchase Orders';

  static manageTitleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true),
    code: {
      label: 'Purchase Order Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'supplier.displayName': {
      label: 'Supplier Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'destination.address.line': {
      label: 'Shipping Address',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    totalAmount: {
      label: 'Total Amount',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    note: {
      label: 'Purchase Order Notes',
      type: EntityPropertyType.STRING,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    warehouse: {
      label: 'Warehouse',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    status: {
      label: 'Purchase Order Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = PurchaseOrderConfigs._rawProperties as
    EntityPropertySchema<typeof PurchaseOrderConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    supplierId: null as string | null,
    purchaseOrderVariants: [] as PurchaseOrderVariantRequest[],
    destinationId: null as string | null,
    totalAmount: 0,
    note: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string().min(5, MessageUtils.min(PurchaseOrderConfigs.properties.code.label, 5)),
    supplierId: z.string(),
    purchaseOrderVariants: z.array(z.object({
      variantId: z.number(),
      cost: z.number(),
      quantity: z.number(),
      amount: z.number(),
    })).min(1, 'At least 1 item is required'),
    destinationId: z.string(),
    totalAmount: z.number().min(0),
    note: z.string(),
    status: z.string(),
  });
}

export default PurchaseOrderConfigs;
