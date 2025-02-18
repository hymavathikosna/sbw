import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import PaymentMethodConfigs from 'pages/payment-method/PaymentMethodConfigs';
import DateUtils from 'utils/DateUtils';
import dayjs from 'dayjs';

class PromotionConfigs extends Configs {
  static managerPath = ManagerPath.PROMOTION;
  static resourceUrl = ResourceURL.PROMOTION;
  static resourceKey = 'promotions';
  static createTitle = 'Add Promotion';
  static updateTitle = 'Update Promotion';
  static manageTitle = 'Manage Promotions';

  static manageTitleLinks = PaymentMethodConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true),
    name: {
      label: 'Promotion Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    startDate: {
      label: 'Promotion Start Date',
      type: EntityPropertyType.DATE,
      isShowInTable: true,
    },
    endDate: {
      label: 'Promotion End Date',
      type: EntityPropertyType.DATE,
      isShowInTable: true,
    },
    percent: {
      label: 'Discount Percentage',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    status: {
      label: 'Promotion Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    numberOfProducts: {
      label: 'Number of Products',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },    
  };

  static properties = PromotionConfigs._rawProperties as
    EntityPropertySchema<typeof PromotionConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    range: [
      dayjs(DateUtils.today()).add(1, 'day').toDate(),
      dayjs(DateUtils.today()).add(7, 'day').toDate(),
    ] as [Date | null, Date | null],
    percent: 5,
    status: '1',
    productIds: [] as number[],
    categoryIds: [] as number[],
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(PromotionConfigs.properties.name.label, 2)),
    range: z.array(z.date({ invalid_type_error: 'Please do not leave blank' })).length(2),
    percent: z.number().min(1).max(100),
    status: z.string(),
    productIds: z.array(z.number()),
    categoryIds: z.array(z.number()),
  });
}

export enum AddProductMode {
  CATEGORY = 'category',
  PRODUCT = 'product'
}

export default PromotionConfigs;
