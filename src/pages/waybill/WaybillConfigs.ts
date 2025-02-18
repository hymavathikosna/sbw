import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import { RequiredNote } from 'models/Waybill';
import DateUtils from 'utils/DateUtils';

class WaybillConfigs extends Configs {
  static managerPath = ManagerPath.WAYBILL;
  static resourceUrl = ResourceURL.WAYBILL;
  static resourceKey = 'waybills';
  static createTitle = 'Add Shipment';
  static updateTitle = 'Update Shipment';
  static manageTitle = 'Manage Shipments';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.WAYBILL,
      label: 'Manage Shipments',
    },
  ];
  
  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    code: {
      label: 'Waybill Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'order.code': {
      label: 'Order Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    shippingDate: {
      label: 'Shipping Date',
      type: EntityPropertyType.DATE,
      isShowInTable: true,
    },
    expectedDeliveryTime: {
      label: 'Expected Delivery Time',
      type: EntityPropertyType.DATE,
      isShowInTable: true,
    },
    status: {
      label: 'Waybill Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    codAmount: {
      label: 'Cash on Delivery (COD) Amount',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    shippingFee: {
      label: 'Shipping Fee',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    size: {
      label: 'Package Size',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };

  static properties = WaybillConfigs._rawProperties as
    EntityPropertySchema<typeof WaybillConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    orderId: null as string | null,
    shippingDate: DateUtils.today(),
    weight: 1,
    length: 1,
    width: 1,
    height: 1,
    note: '',
    ghnRequiredNote: RequiredNote.KHONGCHOXEMHANG,
  };

  static createUpdateFormSchema = z.object({
    orderId: z.string({ invalid_type_error: 'Please do not leave this field empty' }),
    shippingDate: z.date({ invalid_type_error: 'Please do not leave this field empty' }),
    weight: z.number().min(1),
    length: z.number().min(1),
    width: z.number().min(1),
    height: z.number().min(1),
    note: z.string(),
    ghnRequiredNote: z.string(),
  });

  static ghnRequiredNoteMap: Record<RequiredNote, string> = {
    [RequiredNote.CHOTHUHANG]: 'Allow item trial',
    [RequiredNote.CHOXEMHANGKHONGTHU]: 'Allow item viewing, no trial',
    [RequiredNote.KHONGCHOXEMHANG]: 'Do not allow item viewing',
  };

  static ghnPaymentTypeIdMap: Record<number, string> = {
    1: 'Seller',
    2: 'Buyer',
  };

}

export default WaybillConfigs;
