import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class CustomerConfigs extends Configs {
  static managerPath = ManagerPath.CUSTOMER;
  static resourceUrl = ResourceURL.CUSTOMER;
  static resourceKey = 'customers';
  static createTitle = 'Add Customer';
  static updateTitle = 'Update Customer';
  static manageTitle = 'Manage Customers';
  
  static CUSTOMER_ROLE_ID = 3;
  
  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.CUSTOMER,
      label: 'Manage Customers',
    },
    {
      link: ManagerPath.CUSTOMER_GROUP,
      label: 'Manage Customer Groups',
    },
    {
      link: ManagerPath.CUSTOMER_STATUS,
      label: 'Manage Customer Statuses',
    },
    {
      link: ManagerPath.CUSTOMER_RESOURCE,
      label: 'Manage Customer Sources',
    },
  ];
  
  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    'user.username': {
      label: 'Username',
      type: EntityPropertyType.STRING,
    },
    'user.fullname': {
      label: 'Full Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'user.email': {
      label: 'Email',
      type: EntityPropertyType.STRING,
    },
    'user.phone': {
      label: 'Phone Number',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'user.gender': {
      label: 'Gender',
      type: EntityPropertyType.OPTION,
    },
    'user.address.line': {
      label: 'Customer Address',
      type: EntityPropertyType.STRING,
    },
    'user.address.province.name': {
      label: 'Customer Province/State Name',
      type: EntityPropertyType.STRING,
    },
    'user.address.province.code': {
      label: 'Customer Province/State Code',
      type: EntityPropertyType.STRING,
    },
    'user.address.district.name': {
      label: 'Customer District Name',
      type: EntityPropertyType.STRING,
    },
    'user.address.district.code': {
      label: 'Customer District Code',
      type: EntityPropertyType.STRING,
    },
    'user.avatar': {
      label: 'Profile Picture',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.status': {
      label: 'User Status',
      type: EntityPropertyType.NUMBER,
    },
    'user.roles': {
      label: 'User Roles',
      type: EntityPropertyType.ARRAY,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.password': {
      label: 'Password',
      type: EntityPropertyType.STRING,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.address.provinceId': {
      label: 'Province/State',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.address.districtId': {
      label: 'District',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'customerGroup.name': {
      label: 'Customer Group Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    customerGroupId: {
      label: 'Customer Group',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'customerStatus.name': {
      label: 'Customer Status Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    customerStatusId: {
      label: 'Customer Status',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
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
  };  

  static properties = CustomerConfigs._rawProperties as
    EntityPropertySchema<typeof CustomerConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    'user.username': '',
    'user.password': '',
    'user.fullname': '',
    'user.email': '',
    'user.phone': '',
    'user.gender': 'M' as 'M' | 'F',
    'user.address.line': '',
    'user.address.provinceId': null as string | null,
    'user.address.districtId': null as string | null,
    'user.avatar': '',
    'user.status': '1',
    'user.roles': [String(CustomerConfigs.CUSTOMER_ROLE_ID)],
    customerGroupId: null as string | null,
    customerStatusId: null as string | null,
    customerResourceId: null as string | null,
  };

  static createUpdateFormSchema = z.object({
    'user.username': z.string().min(2, MessageUtils.min(CustomerConfigs.properties['user.username'].label, 2)),
    'user.password': z.string(),
    'user.fullname': z.string(),
    'user.email': z.string(),
    'user.phone': z.string(),
    'user.gender': z.string(),
    'user.address.line': z.string(),
    'user.address.provinceId': z.string(),
    'user.address.districtId': z.string(),
    'user.avatar': z.string(),
    'user.status': z.string(),
    'user.roles': z.array(z.string()).nonempty(),
    customerGroupId: z.string(),
    customerStatusId: z.string(),
    customerResourceId: z.string(),
  });
}

export default CustomerConfigs;
