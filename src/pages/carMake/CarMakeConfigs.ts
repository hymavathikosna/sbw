import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class CarMakeConfigs extends Configs {
  static managerPath = ManagerPath.CARMAKE;
  static resourceUrl = ResourceURL.CARMAKE;
  static resourceKey = 'carMakes';
  static createTitle = 'Add CarMake';
  static updateTitle = 'Update CarMake';
  static manageTitle = 'Manage CarMakes';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.CARMAKE,
      label: 'Manage CarMakes',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    makeName: {
      label: 'Make Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    vehicleTypeId: {
      label: 'Vehicle Type',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
      isShowInTable: true,
    },
  };

  static properties = CarMakeConfigs._rawProperties as
    EntityPropertySchema<typeof CarMakeConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    makeName: '', 
    vehicleTypeId: null as string | null,
  };

  static createUpdateFormSchema = z.object({
    makeName: z.string().min(2, MessageUtils.min(CarMakeConfigs.properties.makeName.label, 2)),
    vehicleTypeId: z.string().nullable(),
  });
}

export default CarMakeConfigs;
