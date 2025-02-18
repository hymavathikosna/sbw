import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class PropertyConfigs extends Configs {
  static managerPath = ManagerPath.PROPERTY;
  static resourceUrl = ResourceURL.PROPERTY;
  static resourceKey = 'properties';
  static createTitle = 'Add Product Attribute';
  static updateTitle = 'Update Product Attribute';
  static manageTitle = 'Manage Product Attribute';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Product Attribute Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    code: {
      label: 'Product Attribute Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    description: {
      label: 'Product Attribute Description',
      type: EntityPropertyType.STRING,
    },
    status: {
      label: 'Product Attribute Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = PropertyConfigs._rawProperties as
    EntityPropertySchema<typeof PropertyConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    code: '',
    description: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(PropertyConfigs.properties.name.label, 2)),
    code: z.string(),
    description: z.string(),
    status: z.string(),
  });
}

export default PropertyConfigs;
