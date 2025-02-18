import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import { CountVariantRequest } from 'models/CountVariant';

class CountConfigs extends Configs {
  static managerPath = ManagerPath.COUNT;
  static resourceUrl = ResourceURL.COUNT;
  static resourceKey = 'counts';
  static createTitle = 'Add Inventory Check Ticket';
  static updateTitle = 'Update Inventory Check Ticket';
  static manageTitle = 'Manage Inventory Check Tickets';

  static manageTitleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true),
    code: {
      label: 'Inventory Check Code',
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
    'warehouse.name': {
      label: 'Warehouse Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Inventory Check Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = CountConfigs._rawProperties as
    EntityPropertySchema<typeof CountConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    warehouseId: null as string | null,
    countVariants: [] as CountVariantRequest[],
    note: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string().min(5, MessageUtils.min(CountConfigs.properties.code.label, 5)),
    warehouseId: z.string({ invalid_type_error: 'Please do not leave this field empty.' }),
    countVariants: z.array(z.object({
      variantId: z.number(),
      inventory: z.number(),
      actualInventory: z.number(),
    })).min(1, 'You need to add at least 1 item'),
    note: z.string(),
    status: z.string(),
  });
}

export default CountConfigs;
