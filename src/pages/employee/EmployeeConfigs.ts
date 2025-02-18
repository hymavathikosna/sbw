import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class EmployeeConfigs extends Configs {
  static managerPath = ManagerPath.EMPLOYEE;
  static resourceUrl = ResourceURL.EMPLOYEE;
  static resourceKey = 'employees';
  static createTitle = 'Add Employee';
  static updateTitle = 'Update Employee';
  static manageTitle = 'Manage Employees';

  static EMPLOYEE_ROLE_ID = 2;

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.EMPLOYEE,
      label: 'Manage Employees',
    },
    {
      link: ManagerPath.OFFICE,
      label: 'Manage Offices',
    },
    {
      link: ManagerPath.DEPARTMENT,
      label: 'Manage Departments',
    },
    {
      link: ManagerPath.JOB_TYPE,
      label: 'Manage Job Types',
    },
    {
      link: ManagerPath.JOB_LEVEL,
      label: 'Manage Job Levels',
    },
    {
      link: ManagerPath.JOB_TITLE,
      label: 'Manage Job Titles',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    'user.username': {
      label: 'Username',
      type: EntityPropertyType.STRING,
    },
    'user.fullname': {
      label: 'Full Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'user.email': {
      label: 'Email',
      type: EntityPropertyType.STRING,
    },
    'user.phone': {
      label: 'Phone Number',
      type: EntityPropertyType.STRING,
    },
    'user.gender': {
      label: 'Gender',
      type: EntityPropertyType.OPTION,
    },
    'user.address.line': {
      label: 'Employee Address',
      type: EntityPropertyType.STRING,
    },
    'user.address.province.name': {
      label: 'Employee Province/State Name',
      type: EntityPropertyType.STRING,
    },
    'user.address.province.code': {
      label: 'Employee Province/State Code',
      type: EntityPropertyType.STRING,
    },
    'user.address.district.name': {
      label: 'Employee District Name',
      type: EntityPropertyType.STRING,
    },
    'user.address.district.code': {
      label: 'Employee District Code',
      type: EntityPropertyType.STRING,
    },
    'user.avatar': {
      label: 'Profile Picture',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.status': {
      label: 'User Status',
      type: EntityPropertyType.NUMBER,
    },
    'user.roles': {
      label: 'User Roles',
      type: EntityPropertyType.ARRAY,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.password': {
      label: 'Password',
      type: EntityPropertyType.STRING,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.address.provinceId': {
      label: 'Province/State',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.address.districtId': {
      label: 'District',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'office.name': {
      label: 'Office Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'office.address.line': {
      label: 'Office Address',
      type: EntityPropertyType.STRING,
    },
    'office.address.province.name': {
      label: 'Office Province/State Name',
      type: EntityPropertyType.STRING,
    },
    'office.address.province.code': {
      label: 'Office Province/State Code',
      type: EntityPropertyType.STRING,
    },
    'office.address.district.name': {
      label: 'Office District Name',
      type: EntityPropertyType.STRING,
    },
    'office.address.district.code': {
      label: 'Office District Code',
      type: EntityPropertyType.STRING,
    },
    'office.status': {
      label: 'Office Status',
      type: EntityPropertyType.NUMBER,
    },
    officeId: {
      label: 'Office',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'department.name': {
      label: 'Department Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'department.status': {
      label: 'Department Status',
      type: EntityPropertyType.NUMBER,
    },
    departmentId: {
      label: 'Department',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'jobType.name': {
      label: 'Job Type Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'jobType.status': {
      label: 'Job Type Status',
      type: EntityPropertyType.NUMBER,
    },
    jobTypeId: {
      label: 'Job Type',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'jobLevel.name': {
      label: 'Job Level Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'jobLevel.status': {
      label: 'Job Level Status',
      type: EntityPropertyType.NUMBER,
    },
    jobLevelId: {
      label: 'Job Level',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'jobTitle.name': {
      label: 'Job Title Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'jobTitle.status': {
      label: 'Job Title Status',
      type: EntityPropertyType.NUMBER,
    },
    jobTitleId: {
      label: 'Job Title',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };
  static properties = EmployeeConfigs._rawProperties as
    EntityPropertySchema<typeof EmployeeConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    'user.username': '',
    'user.password': '',
    'user.fullname': '',
    'user.email': '',
    'user.phone': '',
    'user.gender': 'M' as 'M' | 'F',
    'user.address.line': '',
    'user.address.provinceId': null as string | null,
    'user.address.districtId': null as string | null,
    'user.avatar': '',
    'user.status': '1',
    'user.roles': [String(EmployeeConfigs.EMPLOYEE_ROLE_ID)],
    officeId: null as string | null,
    departmentId: null as string | null,
    jobTypeId: null as string | null,
    jobLevelId: null as string | null,
    jobTitleId: null as string | null,
  };

  static createUpdateFormSchema = z.object({
    'user.username': z.string().min(2, MessageUtils.min(EmployeeConfigs.properties['user.username'].label, 2)),
    'user.password': z.string(),
    'user.fullname': z.string(),
    'user.email': z.string(),
    'user.phone': z.string(),
    'user.gender': z.string(),
    'user.address.line': z.string(),
    'user.address.provinceId': z.string(),
    'user.address.districtId': z.string(),
    'user.avatar': z.string(),
    'user.status': z.string(),
    'user.roles': z.array(z.string()).nonempty(),
    officeId: z.string(),
    departmentId: z.string(),
    jobTypeId: z.string(),
    jobLevelId: z.string(),
    jobTitleId: z.string(),
  });
}

export default EmployeeConfigs;
