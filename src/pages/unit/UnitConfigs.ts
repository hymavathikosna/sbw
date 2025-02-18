import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class UnitConfigs extends Configs {
  static managerPath = ManagerPath.UNIT;
  static resourceUrl = ResourceURL.UNIT;
  static resourceKey = 'units';
  static createTitle = 'Add Unit of Measurement';
  static updateTitle = 'Update Unit of Measurement';
  static manageTitle = 'Manage Unit of Measurement';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Unit of Measurement Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Unit of Measurement Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = UnitConfigs._rawProperties as
    EntityPropertySchema<typeof UnitConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(UnitConfigs.properties.name.label, 2)),
    status: z.string(),
  });
}

export default UnitConfigs;
