import { z } from 'zod';
import { CollectionWrapper, Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import { ProductPropertyItem, SpecificationItem } from 'models/Product';
import { VariantRequest } from 'models/Variant';
import { ImageRequest } from 'models/Image';

class ProductConfigs extends Configs {
  static managerPath = ManagerPath.PRODUCT;
  static resourceUrl = ResourceURL.PRODUCT;
  static resourceKey = 'products';
  static createTitle = 'Add product';
  static updateTitle = 'Update product';
  static manageTitle = 'Manage product';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.PRODUCT,
      label: 'Manage products',
    },
    {
      link: ManagerPath.CATEGORY,
      label: 'Manage product categories',
    },
    {
      link: ManagerPath.BRAND,
      label: 'Manage brands',
    },
    {
      link: ManagerPath.SUPPLIER,
      label: 'Manage suppliers',
    },
    {
      link: ManagerPath.UNIT,
      label: 'Manage units of measurement',
    },
    {
      link: ManagerPath.TAG,
      label: 'Manage tags',
    },
    {
      link: ManagerPath.GUARANTEE,
      label: 'Manage warranties',
    },
    {
      link: ManagerPath.PROPERTY,
      label: 'Manage product properties',
    },
    {
      link: ManagerPath.SPECIFICATION,
      label: 'Manage product specifications',
    },    
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    name: {
      label: 'Product Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    code: {
      label: 'Product Code',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    slug: {
      label: 'Product Slug',
      type: EntityPropertyType.STRING,
    },
    shortDescription: {
      label: 'Product Short Description',
      type: EntityPropertyType.STRING,
    },
    description: {
      label: 'Product Description',
      type: EntityPropertyType.STRING,
    },
    thumbnail: {
      label: 'Thumbnail',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    images: {
      label: 'Product Images',
      type: EntityPropertyType.ARRAY,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    status: {
      label: 'Product Status',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    'category.name': {
      label: 'Product Category Name',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'brand.name': {
      label: 'Brand Name',
      type: EntityPropertyType.STRING,
    },
    'supplier.displayName': {
      label: 'Supplier Name',
      type: EntityPropertyType.STRING,
    },
    'unit.name': {
      label: 'Unit Name',
      type: EntityPropertyType.STRING,
    },
    tags: {
      label: 'Tag List',
      type: EntityPropertyType.ARRAY,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    specifications: {
      label: 'Product Specifications',
      type: EntityPropertyType.COLLECTION,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    properties: {
      label: 'Product Properties',
      type: EntityPropertyType.COLLECTION,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    variants: {
      label: 'Variants',
      type: EntityPropertyType.ARRAY,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    weight: {
      label: 'Product Weight',
      type: EntityPropertyType.NUMBER,
    },
    'guarantee.name': {
      label: 'Product Warranty Name',
      type: EntityPropertyType.STRING,
    },
    categoryId: {
      label: 'Product Category',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    brandId: {
      label: 'Brand',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    supplierId: {
      label: 'Supplier',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    unitId: {
      label: 'Unit',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    guaranteeId: {
      label: 'Warranty',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },    
  };

  static properties = ProductConfigs._rawProperties as
    EntityPropertySchema<typeof ProductConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    code: '',
    slug: '',
    shortDescription: '',
    description: '',
    images: [] as ImageRequest[],
    status: '1',
    categoryId: null as string | null,
    brandId: null as string | null,
    supplierId: null as string | null,
    unitId: null as string | null,
    tags: [] as string[],
    specifications: null as CollectionWrapper<SpecificationItem> | null,
    properties: null as CollectionWrapper<ProductPropertyItem> | null,
    variants: [
      {
        sku: '',
        cost: 0,
        price: 0,
        properties: null,
        status: 1,
      },
    ] as VariantRequest[],
    weight: 0.00,
    guaranteeId: null as string | null,
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(ProductConfigs.properties.name.label, 2)),
    code: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    description: z.string(),
    images: z.array(z.object({
      id: z.number(),
      name: z.string(),
      path: z.string(),
      contentType: z.string(),
      size: z.number(),
      group: z.string(),
      isThumbnail: z.boolean(),
      isEliminated: z.boolean(),
    })),
    status: z.string(),
    categoryId: z.string().nullable(),
    brandId: z.string().nullable(),
    supplierId: z.string().nullable(),
    unitId: z.string().nullable(),
    tags: z.array(z.string()),
    specifications: z.object({
      content: z.array(z.object({
        id: z.number(),
        name: z.string(),
        code: z.string(),
        value: z.string(),
      })),
      totalElements: z.number(),
    }).nullable(),
    properties: z.object({
      content: z.array(z.object({
        id: z.number(),
        name: z.string(),
        code: z.string(),
        value: z.array(z.string()),
      })),
      totalElements: z.number(),
    }).nullable(),
    variants: z.array(z.object({
      sku: z.string(),
      cost: z.number(),
      price: z.number(),
      properties: z.object({
        content: z.array(z.object({
          id: z.number(),
          name: z.string(),
          code: z.string(),
          value: z.string(),
        })),
        totalElements: z.number(),
      }).nullable(),
      status: z.number(),
    })),
    weight: z.number(),
    guaranteeId: z.string().nullable(),
  });
}

export default ProductConfigs;
