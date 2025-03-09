import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class VehicleTypeConfigs extends Configs {
  static managerPath = ManagerPath.VEHICLETYPE;
  static resourceUrl = ResourceURL.VEHICLETYPE;
  static resourceKey = 'vehicleTypes';
  static createTitle = 'Add VehicleType';
  static updateTitle = 'Update VehicleType';
  static manageTitle = 'Manage VehicleTypes';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.VEHICLETYPE,
      label: 'Manage VehicleTypes',
    }
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    vehicleTypename: {
      label: 'VehicleTypename',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
  };

  static properties = VehicleTypeConfigs._rawProperties as
    EntityPropertySchema<typeof VehicleTypeConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    vehicleTypename: ''
  };

  static createUpdateFormSchema = z.object({
    vehicleTypename: z.string().min(2, MessageUtils.min(VehicleTypeConfigs.properties.vehicleTypename.label, 2))
  });
}

export default VehicleTypeConfigs;
