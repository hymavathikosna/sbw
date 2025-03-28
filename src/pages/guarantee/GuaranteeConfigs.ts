import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class GuaranteeConfigs extends Configs {
  static managerPath = ManagerPath.GUARANTEE;
  static resourceUrl = ResourceURL.GUARANTEE;
  static resourceKey = 'guarantees';
  static createTitle = 'Add Warranty';
  static updateTitle = 'Update Warranty';
  static manageTitle = 'Manage Warranties';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Warranty Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    description: {
      label: 'Warranty Description',
      type: EntityPropertyType.STRING,
    },
    status: {
      label: 'Warranty Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = GuaranteeConfigs._rawProperties as
    EntityPropertySchema<typeof GuaranteeConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    description: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(GuaranteeConfigs.properties.name.label, 2)),
    description: z.string(),
    status: z.string(),
  });
}

export default GuaranteeConfigs;
