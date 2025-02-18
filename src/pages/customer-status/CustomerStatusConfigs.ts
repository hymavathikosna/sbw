import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import CustomerConfigs from 'pages/customer/CustomerConfigs';

class CustomerStatusConfigs extends Configs {
  static managerPath = ManagerPath.CUSTOMER_STATUS;
  static resourceUrl = ResourceURL.CUSTOMER_STATUS;
  static resourceKey = 'customer-status';
  static createTitle = 'Add Customer Status';
  static updateTitle = 'Update Customer Status';
  static manageTitle = 'Manage Customer Statuses';

  static manageTitleLinks: TitleLink[] = CustomerConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    code: {
      label: 'Customer Status Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    name: {
      label: 'Customer Status Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    description: {
      label: 'Customer Status Description',
      type: EntityPropertyType.STRING,
    },
    color: {
      label: 'Customer Status Color',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Customer Status Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = CustomerStatusConfigs._rawProperties as
    EntityPropertySchema<typeof CustomerStatusConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    name: '',
    description: '',
    color: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string(),
    name: z.string().min(2, MessageUtils.min(CustomerStatusConfigs.properties.name.label, 2)),
    description: z.string(),
    color: z.string(),
    status: z.string(),
  });
}

export default CustomerStatusConfigs;
