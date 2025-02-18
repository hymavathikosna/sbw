import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import CustomerConfigs from 'pages/customer/CustomerConfigs';

class CustomerResourceConfigs extends Configs {
  static managerPath = ManagerPath.CUSTOMER_RESOURCE;
  static resourceUrl = ResourceURL.CUSTOMER_RESOURCE;
  static resourceKey = 'customer-resources';
  static createTitle = 'Add Customer Source';
  static updateTitle = 'Update Customer Source';
  static manageTitle = 'Manage Customer Sources';

  static manageTitleLinks: TitleLink[] = CustomerConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    code: {
      label: 'Customer Source Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    name: {
      label: 'Customer Source Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    description: {
      label: 'Customer Source Description',
      type: EntityPropertyType.STRING,
    },
    color: {
      label: 'Customer Source Color',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Customer Source Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = CustomerResourceConfigs._rawProperties as
    EntityPropertySchema<typeof CustomerResourceConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    name: '',
    description: '',
    color: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string(),
    name: z.string().min(2, MessageUtils.min(CustomerResourceConfigs.properties.name.label, 2)),
    description: z.string(),
    color: z.string(),
    status: z.string(),
  });
}

export default CustomerResourceConfigs;
