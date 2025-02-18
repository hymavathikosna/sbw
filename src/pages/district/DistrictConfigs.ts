import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import AddressConfigs from 'pages/address/AddressConfigs';

class DistrictConfigs extends Configs {
  static managerPath = ManagerPath.DISTRICT;
  static resourceUrl = ResourceURL.DISTRICT;
  static resourceKey = 'districts';
  static createTitle = 'Add District';
  static updateTitle = 'Update District';
  static manageTitle = 'Manage Districts';

  static manageTitleLinks: TitleLink[] = AddressConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'District Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    code: {
      label: 'District Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'province.name': {
      label: 'Province Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'province.code': {
      label: 'Province Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    provinceId: {
      label: 'Province',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },    
  };

  static properties = DistrictConfigs._rawProperties as
    EntityPropertySchema<typeof DistrictConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    code: '',
    provinceId: null as string | null,
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(DistrictConfigs.properties.name.label, 2)),
    code: z.string().max(35, MessageUtils.max(DistrictConfigs.properties.code.label, 35)),
    provinceId: z.string(),
  });
}

export default DistrictConfigs;
