import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import CustomerConfigs from 'pages/customer/CustomerConfigs';

class CustomerGroupConfigs extends Configs {
  static managerPath = ManagerPath.CUSTOMER_GROUP;
  static resourceUrl = ResourceURL.CUSTOMER_GROUP;
  static resourceKey = 'customer-groups';
  static createTitle = 'Add Customer Group';
  static updateTitle = 'Update Customer Group';
  static manageTitle = 'Manage Customer Groups';

  static manageTitleLinks: TitleLink[] = CustomerConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    code: {
      label: 'Customer Group Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    name: {
      label: 'Customer Group Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    description: {
      label: 'Customer Group Description',
      type: EntityPropertyType.STRING,
    },
    color: {
      label: 'Customer Group Color',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Customer Group Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = CustomerGroupConfigs._rawProperties as
    EntityPropertySchema<typeof CustomerGroupConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    name: '',
    description: '',
    color: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string(),
    name: z.string().min(2, MessageUtils.min(CustomerGroupConfigs.properties.name.label, 2)),
    description: z.string(),
    color: z.string(),
    status: z.string(),
  });
}

export default CustomerGroupConfigs;
