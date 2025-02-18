import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class CategoryConfigs extends Configs {
  static managerPath = ManagerPath.CATEGORY;
  static resourceUrl = ResourceURL.CATEGORY;
  static resourceKey = 'categories';
  static createTitle = 'Add Product Category';
  static updateTitle = 'Update Product Category';
  static manageTitle = 'Manage Product Categories';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    name: {
      label: 'Product Category Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    slug: {
      label: 'Product Category Slug',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    description: {
      label: 'Product Category Description',
      type: EntityPropertyType.STRING,
    },
    thumbnail: {
      label: 'Thumbnail',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'parentCategory.name': {
      label: 'Parent Category Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Product Category Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    parentCategoryId: {
      label: 'Parent Category',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },    
  };

  static properties = CategoryConfigs._rawProperties as
    EntityPropertySchema<typeof CategoryConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    slug: '',
    description: '',
    thumbnail: '',
    parentCategoryId: null as string | null,
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(CategoryConfigs.properties.name.label, 2)),
    slug: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    parentCategoryId: z.string().nullable(),
    status: z.string(),
  });
}

export default CategoryConfigs;
