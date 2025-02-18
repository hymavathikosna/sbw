import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class SpecificationConfigs extends Configs {
  static managerPath = ManagerPath.SPECIFICATION;
  static resourceUrl = ResourceURL.SPECIFICATION;
  static resourceKey = 'specifications';
  static createTitle = 'Add Product Specifications';
  static updateTitle = 'Update Product Specifications';
  static manageTitle = 'Manage Product Specifications';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Product Specification Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    code: {
      label: 'Product Specification Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    description: {
      label: 'Product Specification Description',
      type: EntityPropertyType.STRING,
    },
    status: {
      label: 'Product Specification Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = SpecificationConfigs._rawProperties as
    EntityPropertySchema<typeof SpecificationConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    code: '',
    description: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(SpecificationConfigs.properties.name.label, 2)),
    code: z.string(),
    description: z.string(),
    status: z.string(),
  });
}

export default SpecificationConfigs;
