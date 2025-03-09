import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class CarModelConfigs extends Configs {
  static managerPath = ManagerPath.CARMAKE;
  static resourceUrl = ResourceURL.CARMAKE;
  static resourceKey = 'carModels';
  static createTitle = 'Add CarModel';
  static updateTitle = 'Update CarModel';
  static manageTitle = 'Manage CarModels';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.CARMAKE,
      label: 'Manage CarModels',
    }
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    modelName: {
      label: 'Model Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    carMakeId: {
      label: 'Make Name',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };

  static properties = CarModelConfigs._rawProperties as
    EntityPropertySchema<typeof CarModelConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    modelname: '', 
    carMakeId: null as string | null,
  };

  static createUpdateFormSchema = z.object({
    modelName: z.string().min(2, MessageUtils.min(CarModelConfigs.properties.modelName.label, 2)),
    carMakeId: z.string().nullable(),
  });
}

export default CarModelConfigs;
