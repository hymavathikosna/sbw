import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class TagConfigs extends Configs {
  static managerPath = ManagerPath.TAG;
  static resourceUrl = ResourceURL.TAG;
  static resourceKey = 'tags';
  static createTitle = 'Add Tag';
  static updateTitle = 'Update Tag';
  static manageTitle = 'Manage Tags';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Tag Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    slug: {
      label: 'Tag Slug',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Tag Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },    
  };

  static properties = TagConfigs._rawProperties as
    EntityPropertySchema<typeof TagConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    slug: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(TagConfigs.properties.name.label, 2)),
    slug: z.string(),
    status: z.string(),
  });
}

export default TagConfigs;
