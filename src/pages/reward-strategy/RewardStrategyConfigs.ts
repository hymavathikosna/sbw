import { Configs, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import ManagerPath from 'constants/ManagerPath';

class RewardStrategyConfigs extends Configs {
  static resourceUrl = ResourceURL.REWARD_STRATEGY;
  static resourceKey = 'reward-strategies';
  static manageTitle = 'Manage reward point strategy';
  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.REWARD_STRATEGY,
      label: 'Manage reward point strategy',
    },
  ];
}

export default RewardStrategyConfigs;
