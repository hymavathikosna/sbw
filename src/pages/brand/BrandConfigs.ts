import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class BrandConfigs extends Configs {
  static managerPath = ManagerPath.BRAND;
  static resourceUrl = ResourceURL.BRAND;
  static resourceKey = 'brands';
  static createTitle = 'Add Brand';
  static updateTitle = 'Update Brand';
  static manageTitle = 'Manage Brands';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Brand Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    code: {
      label: 'Brand Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    description: {
      label: 'Brand Description',
      type: EntityPropertyType.STRING,
    },
    status: {
      label: 'Brand Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = BrandConfigs._rawProperties as
    EntityPropertySchema<typeof BrandConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    code: '',
    description: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(BrandConfigs.properties.name.label, 2)),
    code: z.string(),
    description: z.string(),
    status: z.string(),
  });
}

export default BrandConfigs;
