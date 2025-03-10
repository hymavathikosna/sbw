import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class CarVariantConfigs extends Configs {
  static managerPath = ManagerPath.CARVARIANT;
  static resourceUrl = ResourceURL.CARVARIANT;
  static resourceKey = 'carVariants';
  static createTitle = 'Add CarVariant';
  static updateTitle = 'Update CarVariant';
  static manageTitle = 'Manage CarVariants';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.CARVARIANT,
      label: 'Manage CarVariants',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    variantName: {
      label: 'Variant Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    carModelId: {
      label: 'Model Name',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };

  static properties = CarVariantConfigs._rawProperties as
    EntityPropertySchema<typeof CarVariantConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    variantName: '', 
    carModelId: null as string | null,
  };

  static createUpdateFormSchema = z.object({
    variantName: z.string().min(2, MessageUtils.min(CarVariantConfigs.properties.variantName.label, 2)),
    carModelId: z.string().nullable(),
  });
}

export default CarVariantConfigs;
