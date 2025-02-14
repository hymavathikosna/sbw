import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class UserConfigs extends Configs {
  static managerPath = ManagerPath.USER;
  static resourceUrl = ResourceURL.USER;
  static resourceKey = 'users';
  static createTitle = 'Add User';
  static updateTitle = 'Update User';
  static manageTitle = 'Manage Users';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.USER,
      label: 'Manage Users',
    },
    {
      link: ManagerPath.ROLE,
      label: 'Manage Roles',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    username: {
      label: 'Username',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    fullname: {
      label: 'Full Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    email: {
      label: 'Email',
      type: EntityPropertyType.STRING,
    },
    phone: {
      label: 'Phone Number',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    gender: {
      label: 'Gender',
      type: EntityPropertyType.OPTION,
      isShowInTable: true,
    },
    'address.line': {
      label: 'Address',
      type: EntityPropertyType.STRING,
    },
    'address.province.name': {
      label: 'Province Name',
      type: EntityPropertyType.STRING,
    },
    'address.province.code': {
      label: 'Province Code',
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
    avatar: {
      label: 'Profile Picture',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    status: {
      label: 'User Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    roles: {
      label: 'User Roles',
      type: EntityPropertyType.ARRAY,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    password: {
      label: 'Password',
      type: EntityPropertyType.STRING,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
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

  static properties = UserConfigs._rawProperties as
    EntityPropertySchema<typeof UserConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    phone: '',
    gender: 'M' as 'M' | 'F',
    'address.line': '',
    'address.provinceId': null as string | null,
    'address.districtId': null as string | null,
    avatar: '',
    status: '1',
    roles: [] as string[],
  };

  static createUpdateFormSchema = z.object({
    username: z.string().min(2, MessageUtils.min(UserConfigs.properties.username.label, 2)),
    password: z.string(),
    fullname: z.string(),
    email: z.string(),
    phone: z.string(),
    gender: z.string(),
    'address.line': z.string(),
    'address.provinceId': z.string(),
    'address.districtId': z.string(),
    avatar: z.string(),
    status: z.string(),
    roles: z.array(z.string()).nonempty(),
  });
}

export default UserConfigs;
