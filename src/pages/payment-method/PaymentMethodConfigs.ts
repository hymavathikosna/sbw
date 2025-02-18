import { Configs, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import ManagerPath from 'constants/ManagerPath';

class PaymentMethodConfigs extends Configs {
  static resourceUrl = ResourceURL.PAYMENT_METHOD;
  static resourceKey = 'payment-methods';
  static manageTitle = 'Manage Payment Methods';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.VOUCHER,
      label: 'Manage Cashbook',
    },
    {
      link: ManagerPath.PAYMENT_METHOD,
      label: 'Manage Payment Methods',
    },
    {
      link: ManagerPath.PROMOTION,
      label: 'Manage Promotions',
    },
  ];
}

export default PaymentMethodConfigs;
