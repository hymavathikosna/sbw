import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class WarehouseConfigs extends Configs {
  static managerPath = ManagerPath.WAREHOUSE;
  static resourceUrl = ResourceURL.WAREHOUSE;
  static resourceKey = 'warehouses';
  static createTitle = 'Add Warehouse';
  static updateTitle = 'Update Warehouse';
  static manageTitle = 'Manage Warehouse';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.INVENTORY,
      label: 'Track Inventory',
    },
    {
      link: ManagerPath.WAREHOUSE,
      label: 'Manage Warehouse',
    },
    {
      link: ManagerPath.PURCHASE_ORDER,
      label: 'Manage Purchase Orders',
    },
    {
      link: ManagerPath.DESTINATION,
      label: 'Manage Receiving Points',
    },
    {
      link: ManagerPath.DOCKET,
      label: 'Manage Stock In/Out Documents',
    },
    {
      link: ManagerPath.DOCKET_REASON,
      label: 'Manage Stock In/Out Document Reasons',
    },
    {
      link: ManagerPath.COUNT,
      label: 'Manage Stock Count Documents',
    },
    {
      link: ManagerPath.TRANSFER,
      label: 'Manage Warehouse Transfer Documents',
    },
  ];
  
  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    code: {
      label: 'Warehouse Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    name: {
      label: 'Warehouse Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'address.line': {
      label: 'Address',
      type: EntityPropertyType.STRING,
    },
    'address.province.name': {
      label: 'Province Name',
      type: EntityPropertyType.STRING,
    },
    'address.district.name': {
      label: 'District Name',
      type: EntityPropertyType.STRING,
    },
    status: {
      label: 'Warehouse Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    'address.provinceId': {
      label: 'Province',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'address.districtId': {
      label: 'District',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };  

  static properties = WarehouseConfigs._rawProperties as
    EntityPropertySchema<typeof WarehouseConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    name: '',
    'address.line': '',
    'address.provinceId': null as string | null,
    'address.districtId': null as string | null,
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string(),
    name: z.string().min(2, MessageUtils.min(WarehouseConfigs.properties.name.label, 2)),
    'address.line': z.string(),
    'address.provinceId': z.string().nullable(),
    'address.districtId': z.string().nullable(),
    status: z.string(),
  });
}

export default WarehouseConfigs;
