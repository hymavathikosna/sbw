import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import EmployeeConfigs from 'pages/employee/EmployeeConfigs';

class OfficeConfigs extends Configs {
  static managerPath = ManagerPath.OFFICE;
  static resourceUrl = ResourceURL.OFFICE;
  static resourceKey = 'offices';
  static createTitle = 'Add Office';
  static updateTitle = 'Update Office';
  static manageTitle = 'Manage Offices';

  static manageTitleLinks: TitleLink[] = EmployeeConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Office Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'address.line': {
      label: 'Address',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'address.province.name': {
      label: 'Province/City Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'address.province.code': {
      label: 'Province/City Code',
      type: EntityPropertyType.STRING,
    },
    'address.district.name': {
      label: 'District Name',
      type: EntityPropertyType.STRING,
    },
    'address.district.code': {
      label: 'District Code',
      type: EntityPropertyType.STRING,
    },
    status: {
      label: 'Office Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    'address.provinceId': {
      label: 'Province/City',
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

  static properties = OfficeConfigs._rawProperties as
    EntityPropertySchema<typeof OfficeConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    'address.line': '',
    'address.provinceId': null as string | null,
    'address.districtId': null as string | null,
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(OfficeConfigs.properties.name.label, 2)),
    'address.line': z.string(),
    'address.provinceId': z.string(),
    'address.districtId': z.string(),
    status: z.string(),
  });
}

export default OfficeConfigs;
