import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import EmployeeConfigs from 'pages/employee/EmployeeConfigs';

class JobTitleConfigs extends Configs {
  static managerPath = ManagerPath.JOB_TITLE;
  static resourceUrl = ResourceURL.JOB_TITLE;
  static resourceKey = 'job-titles';
  static createTitle = 'Add Job Title';
  static updateTitle = 'Update Job Title';
  static manageTitle = 'Manage Job Titles';

  static manageTitleLinks: TitleLink[] = EmployeeConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Job Title Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Job Title Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = JobTitleConfigs._rawProperties as
    EntityPropertySchema<typeof JobTitleConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(JobTitleConfigs.properties.name.label, 2)),
    status: z.string(),
  });
}

export default JobTitleConfigs;
