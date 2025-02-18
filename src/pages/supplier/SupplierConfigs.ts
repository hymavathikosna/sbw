import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class SupplierConfigs extends Configs {
  static managerPath = ManagerPath.SUPPLIER;
  static resourceUrl = ResourceURL.SUPPLIER;
  static resourceKey = 'suppliers';
  static createTitle = 'Add Supplier';
  static updateTitle = 'Update Supplier';
  static manageTitle = 'Manage Suppliers';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    displayName: {
      label: 'Supplier Display Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    code: {
      label: 'Supplier Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    contactFullname: {
      label: 'Contact Person Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    contactEmail: {
      label: 'Contact Person Email',
      type: EntityPropertyType.STRING,
    },
    contactPhone: {
      label: 'Contact Person Phone',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    companyName: {
      label: 'Company Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    taxCode: {
      label: 'Company Tax Code',
      type: EntityPropertyType.STRING,
    },
    email: {
      label: 'Company Email',
      type: EntityPropertyType.STRING,
    },
    phone: {
      label: 'Company Phone',
      type: EntityPropertyType.STRING,
    },
    fax: {
      label: 'Company Fax',
      type: EntityPropertyType.STRING,
    },
    website: {
      label: 'Company Website',
      type: EntityPropertyType.STRING,
    },
    'address.line': {
      label: 'Company Address',
      type: EntityPropertyType.STRING,
    },
    'address.province.name': {
      label: 'Company Province Name',
      type: EntityPropertyType.STRING,
    },
    'address.district.name': {
      label: 'Company District Name',
      type: EntityPropertyType.STRING,
    },
    'address.provinceId': {
      label: 'Company Province',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'address.districtId': {
      label: 'Company District',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    description: {
      label: 'Company Description',
      type: EntityPropertyType.STRING,
    },
    note: {
      label: 'Company Notes',
      type: EntityPropertyType.STRING,
    },
    status: {
      label: 'Supplier Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = SupplierConfigs._rawProperties as
    EntityPropertySchema<typeof SupplierConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    displayName: '',
    code: '',
    contactFullname: '',
    contactEmail: '',
    contactPhone: '',
    companyName: '',
    taxCode: '',
    email: '',
    phone: '',
    fax: '',
    website: '',
    'address.line': '',
    'address.provinceId': null as string | null,
    'address.districtId': null as string | null,
    description: '',
    note: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    displayName: z.string().min(2, MessageUtils.min(SupplierConfigs.properties.displayName.label, 2)),
    code: z.string(),
    contactFullname: z.string(),
    contactEmail: z.string(),
    contactPhone: z.string(),
    companyName: z.string(),
    taxCode: z.string(),
    email: z.string(),
    phone: z.string(),
    fax: z.string(),
    website: z.string(),
    'address.line': z.string(),
    'address.provinceId': z.string().nullable(),
    'address.districtId': z.string().nullable(),
    description: z.string(),
    note: z.string(),
    status: z.string(),
  });
}

export default SupplierConfigs;
