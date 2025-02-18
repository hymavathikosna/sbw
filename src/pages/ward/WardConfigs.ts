import { Configs } from 'types';
import ManagerPath from 'constants/ManagerPath';
import ResourceURL from 'constants/ResourceURL';

class WardConfigs extends Configs {
  static managerPath = ManagerPath.WARD;
  static resourceUrl = ResourceURL.WARD;
  static resourceKey = 'wards';
  static createTitle = 'Add Ward/District';
  static updateTitle = 'Update Ward/District';
  static manageTitle = 'Manage Ward/District';
}

export default WardConfigs;
