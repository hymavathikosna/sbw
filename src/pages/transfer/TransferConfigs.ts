import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import { DocketVariantRequest } from 'models/DocketVariant';

class TransferConfigs extends Configs {
  static managerPath = ManagerPath.TRANSFER;
  static resourceUrl = ResourceURL.TRANSFER;
  static resourceKey = 'transfers';
  static createTitle = 'Add Warehouse Transfer Document';
  static updateTitle = 'Update Warehouse Transfer Document';
  static manageTitle = 'Manage Warehouse Transfer Documents';

  static manageTitleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true),
    code: {
      label: 'Warehouse Transfer Document Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'exportDocket.warehouse.name': {
      label: 'Export Warehouse Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'exportDocket.status': {
      label: 'Export Document Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    arrow: {
      label: '',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'importDocket.warehouse.name': {
      label: 'Import Warehouse Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'importDocket.status': {
      label: 'Import Document Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    note: {
      label: 'Warehouse Transfer Document Note',
      type: EntityPropertyType.STRING,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },    
  };

  static properties = TransferConfigs._rawProperties as
    EntityPropertySchema<typeof TransferConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    'exportDocket.warehouseId': null as string | null,
    'importDocket.warehouseId': null as string | null,
    docketVariants: [] as DocketVariantRequest[],
    note: '',
  };

  static createUpdateFormSchema = z.object({
    code: z.string().min(5, MessageUtils.min(TransferConfigs.properties.code.label, 5)),
    'exportDocket.warehouseId': z.string({ invalid_type_error: 'Please do not leave this field empty.' }),
    'importDocket.warehouseId': z.string({ invalid_type_error: 'Please do not leave this field empty.' }),
    docketVariants: z.array(z.object({
      variantId: z.number(),
      quantity: z.number(),
    })).min(1, 'At least one item is required'),
    note: z.string(),
  });
}

export default TransferConfigs;
