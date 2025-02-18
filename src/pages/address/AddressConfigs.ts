import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class AddressConfigs extends Configs {
  static managerPath = ManagerPath.ADDRESS;
  static resourceUrl = ResourceURL.ADDRESS;
  static resourceKey = 'addresses';
  static createTitle = 'Add Address';
  static updateTitle = 'Update Address';
  static manageTitle = 'Manage Addresses';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.ADDRESS,
      label: 'Manage Addresses',
    },
    {
      link: ManagerPath.PROVINCE,
      label: 'Manage Provinces',
    },
    {
      link: ManagerPath.DISTRICT,
      label: 'Manage Districts',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    line: {
      label: 'Address',
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
    },
    'district.name': {
      label: 'District Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'district.code': {
      label: 'District Code',
      type: EntityPropertyType.STRING,
    },
    provinceId: {
      label: 'Province',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    districtId: {
      label: 'District',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },    
  };

  static properties = AddressConfigs._rawProperties as
    EntityPropertySchema<typeof AddressConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    line: '',
    provinceId: null as string | null,
    districtId: null as string | null,
  };

  static createUpdateFormSchema = z.object({
    line: z.string(),
    provinceId: z.string().nullable(),
    districtId: z.string().nullable(),
  });
}

export default AddressConfigs;
