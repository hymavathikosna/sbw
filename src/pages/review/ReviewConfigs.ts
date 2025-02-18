import { Configs, TitleLink } from 'types';
import ManagerPath from 'constants/ManagerPath';
import ResourceURL from 'constants/ResourceURL';

class ReviewConfigs extends Configs {
  static resourceUrl = ResourceURL.REVIEW;
  static resourceKey = 'reviews';
  static manageTitle = 'Manage Product Reviews';
  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.REVIEW,
      label: 'Manage Product Reviews',
    },
  ];
}

export default ReviewConfigs;
