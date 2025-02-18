import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';

class DestinationConfigs extends Configs {
  static managerPath = ManagerPath.DESTINATION;
  static resourceUrl = ResourceURL.DESTINATION;
  static resourceKey = 'destinations';
  static createTitle = 'Add Receiving Point';
  static updateTitle = 'Update Receiving Point';
  static manageTitle = 'Manage Receiving Points';

  static manageTitleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    contactFullname: {
      label: 'Contact Full Name',
      type: EntityPropertyType.STRING,
    },
    contactEmail: {
      label: 'Contact Email',
      type: EntityPropertyType.STRING,
    },
    contactPhone: {
      label: 'Contact Phone Number',
      type: EntityPropertyType.STRING,
    },
    'address.line': {
      label: 'Address',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'address.province.name': {
      label: 'Province Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'address.district.name': {
      label: 'District Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Receiving Point Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    'address.provinceId': {
      label: 'Province',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'address.districtId': {
      label: 'District',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },    
  };

  static properties = DestinationConfigs._rawProperties as
    EntityPropertySchema<typeof DestinationConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    contactFullname: '',
    contactEmail: '',
    contactPhone: '',
    'address.line': '',
    'address.provinceId': null as string | null,
    'address.districtId': null as string | null,
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    contactFullname: z.string(),
    contactEmail: z.string(),
    contactPhone: z.string(),
    'address.line': z.string(),
    'address.provinceId': z.string(),
    'address.districtId': z.string(),
    status: z.string(),
  });
}

export default DestinationConfigs;
