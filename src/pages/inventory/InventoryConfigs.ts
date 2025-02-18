import { Configs, TitleLink } from 'types';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import ResourceURL from 'constants/ResourceURL';

class InventoryConfigs extends Configs {
  static productInventoryResourceUrl = ResourceURL.PRODUCT_INVENTORY;
  static productInventoryResourceKey = 'product-inventories';
  static manageTitle = 'Track product inventory';
  static manageTitleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;
}

export default InventoryConfigs;
