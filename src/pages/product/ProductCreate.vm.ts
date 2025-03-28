import { useForm, zodResolver } from '@mantine/form';
import ProductConfigs from 'pages/product/ProductConfigs';
import {
  ProductPropertyItem,
  ProductRequest,
  ProductRequest_TagRequest,
  ProductResponse,
  SpecificationItem
} from 'models/Product';
import useCreateApi from 'hooks/use-create-api';
import { CollectionWrapper, FileWithPreview, SelectOption } from 'types';
import { useState } from 'react';
import useGetAllApi from 'hooks/use-get-all-api';
import { CategoryResponse } from 'models/Category';
import CategoryConfigs from 'pages/category/CategoryConfigs';
import BrandConfigs from 'pages/brand/BrandConfigs';
import { BrandResponse } from 'models/Brand';
import SupplierConfigs from 'pages/supplier/SupplierConfigs';
import { SupplierResponse } from 'models/Supplier';
import { UnitResponse } from 'models/Unit';
import UnitConfigs from 'pages/unit/UnitConfigs';
import { TagResponse } from 'models/Tag';
import TagConfigs from 'pages/tag/TagConfigs';
import GuaranteeConfigs from 'pages/guarantee/GuaranteeConfigs';
import { GuaranteeResponse } from 'models/Guarantee';
import MiscUtils from 'utils/MiscUtils';
import { useQueryClient } from 'react-query';
import useUploadMultipleImagesApi from 'hooks/use-upload-multiple-images-api';
import { SpecificationResponse } from 'models/Specification';
import SpecificationConfigs from 'pages/specification/SpecificationConfigs';
import { ImageRequest, UploadedImageResponse } from 'models/Image';
import { PropertyResponse } from 'models/Property';
import PropertyConfigs from 'pages/property/PropertyConfigs';
import { VariantRequest } from 'models/Variant';
import { VehicleTypeResponse } from 'models/VehicleType';
import VehicleTypeConfigs from 'pages/vehicleType/VehicleTypeConfigs';
import { CarMakeResponse } from 'models/CarMake';
import { CarModelResponse } from 'models/CarModel';
import { CarVariantResponse } from 'models/CarVariant';
import CarMakeConfigs from 'pages/carMake/CarMakeConfigs';
import CarModelConfigs from 'pages/carModel/CarModelConfigs';
import CarVariantConfigs from 'pages/carVariant/CarVariantConfigs';

function useProductCreateViewModel() {
  const form = useForm({
    initialValues: ProductConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(ProductConfigs.createUpdateFormSchema),
  });

  const [vehicleTypeSelectList, setVehicleTypeSelectList] = useState<SelectOption[]>([]);
  const [carMakeSelectList, setCarMakeSelectList] = useState<SelectOption[]>([]);
  const [carModelSelectList, setCarModelSelectList] = useState<SelectOption[]>([]);
  const [carVariantSelectList, setCarVariantSelectList] = useState<SelectOption[]>([]);

  const [categorySelectList, setCategorySelectList] = useState<SelectOption[]>([]);
  const [brandSelectList, setBrandSelectList] = useState<SelectOption[]>([]);
  const [supplierSelectList, setSupplierSelectList] = useState<SelectOption[]>([]);
  const [unitSelectList, setUnitSelectList] = useState<SelectOption[]>([]);
  const [tagSelectList, setTagSelectList] = useState<SelectOption[]>([]);
  const [guaranteeSelectList, setGuaranteeSelectList] = useState<SelectOption[]>([]);

  const [imageFiles, setImageFiles] = useState<FileWithPreview[]>([]);
  const [thumbnailName, setThumbnailName] = useState('');

  const [specificationSelectList, setSpecificationSelectList] = useState<SelectOption[]>([]);

  const [productPropertySelectList, setProductPropertySelectList] = useState<SelectOption[]>([]);
  const [selectedVariantIndexes, setSelectedVariantIndexes] = useState<number[]>([]);

  const queryClient = useQueryClient();
  const createApi = useCreateApi<ProductRequest, ProductResponse>(ProductConfigs.resourceUrl);
  const uploadMultipleImagesApi = useUploadMultipleImagesApi();
  useGetAllApi<CategoryResponse>(CategoryConfigs.resourceUrl, CategoryConfigs.resourceKey,
    { all: 1 },
    (categoryListResponse) => {
      const selectList: SelectOption[] = categoryListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.parentCategory ? item.name + ' ← ' + item.parentCategory.name : item.name,
      }));
      setCategorySelectList(selectList);
    }
  );
  useGetAllApi<BrandResponse>(BrandConfigs.resourceUrl, BrandConfigs.resourceKey,
    { all: 1 },
    (brandListResponse) => {
      const selectList: SelectOption[] = brandListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setBrandSelectList(selectList);
    }
  );
  useGetAllApi<SupplierResponse>(SupplierConfigs.resourceUrl, SupplierConfigs.resourceKey,
    { all: 1 },
    (supplierListResponse) => {
      const selectList: SelectOption[] = supplierListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.displayName,
      }));
      setSupplierSelectList(selectList);
    }
  );
  useGetAllApi<UnitResponse>(UnitConfigs.resourceUrl, UnitConfigs.resourceKey,
    { all: 1 },
    (unitListResponse) => {
      const selectList: SelectOption[] = unitListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setUnitSelectList(selectList);
    }
  );
  useGetAllApi<TagResponse>(TagConfigs.resourceUrl, TagConfigs.resourceKey,
    { all: 1 },
    (tagListResponse) => {
      const selectList: SelectOption[] = tagListResponse.content
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => ({
          value: String(item.id) + '#ORIGINAL',
          label: item.name,
        }));
      setTagSelectList(selectList);
    }
  );
  useGetAllApi<GuaranteeResponse>(GuaranteeConfigs.resourceUrl, GuaranteeConfigs.resourceKey,
    { all: 1 },
    (guaranteeListResponse) => {
      const selectList: SelectOption[] = guaranteeListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setGuaranteeSelectList(selectList);
    }
  );
  useGetAllApi<SpecificationResponse>(SpecificationConfigs.resourceUrl, SpecificationConfigs.resourceKey,
    { all: 1 },
    (specificationListResponse) => {
      const selectList: SelectOption[] = specificationListResponse.content.map((item) => ({
        value: JSON.stringify({ id: item.id, name: item.name, code: item.code }),
        label: item.name,
      }));
      setSpecificationSelectList(selectList);
    }
  );
  useGetAllApi<PropertyResponse>(PropertyConfigs.resourceUrl, PropertyConfigs.resourceKey,
    { all: 1 },
    (propertyListResponse) => {
      const selectList: SelectOption[] = propertyListResponse.content.map((item) => ({
        value: JSON.stringify({ id: item.id, name: item.name, code: item.code }),
        label: item.name,
      }));
      setProductPropertySelectList(selectList);
    }
  );

  const transformTags = (tags: string[]): ProductRequest_TagRequest[] => tags.map((tagIdOrName) => {
    if (tagIdOrName.includes('#ORIGINAL')) {
      return { id: Number(tagIdOrName.split('#')[0]) };
    }
    return {
      name: tagIdOrName.trim(),
      slug: MiscUtils.convertToSlug(tagIdOrName),
      status: 1,
    };
  });

  const transformImages = (uploadedImageResponses: UploadedImageResponse[]): ImageRequest[] => {
    const thumbnailIndex = imageFiles.findIndex((imageFile) => imageFile.name === thumbnailName);
    return uploadedImageResponses.map((uploadedImageResponse, index) => ({
      id: null,
      name: uploadedImageResponse.name,
      path: uploadedImageResponse.path,
      contentType: uploadedImageResponse.contentType,
      size: uploadedImageResponse.size,
      group: 'P',
      isThumbnail: index === thumbnailIndex,
      isEliminated: false,
    }));
  };

  const filterSpecifications = (specifications: CollectionWrapper<SpecificationItem> | null) => {
    if (specifications === null) {
      return null;
    }
    const filteredSpecifications = specifications.content.filter((specification) => specification.id !== 0);
    return filteredSpecifications.length === 0 ? null : new CollectionWrapper(filteredSpecifications);
  };

  const filterProperties = (productProperties: CollectionWrapper<ProductPropertyItem> | null) => {
    if (productProperties === null) {
      return null;
    }
    const filteredProductProperties = productProperties.content.filter((property) => property.value.length !== 0);
    return filteredProductProperties.length === 0 ? null : new CollectionWrapper(filteredProductProperties);
  };

  const filterVariants = (variants: VariantRequest[]) => {
    return variants.filter((_, index) => selectedVariantIndexes.includes(index));
  };

  useGetAllApi<VehicleTypeResponse>(VehicleTypeConfigs.resourceUrl, VehicleTypeConfigs.resourceKey,
    { all: 1 },
    (vehicleTypeListResponse) => {
      const selectList: SelectOption[] = vehicleTypeListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.vehicleTypeName,
      }));
      setVehicleTypeSelectList(selectList);
    }
  );
  useGetAllApi<CarMakeResponse>(CarMakeConfigs.resourceUrl, CarMakeConfigs.resourceKey,
    { all: 1, filter: `vehicleType.id==${form.values['vehicleTypeId'] || 0}` },
    (carMakeListResponse) => {
      const selectList: SelectOption[] = carMakeListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.makeName,
      }));
      setCarMakeSelectList(selectList);
    }
  );
  useGetAllApi<CarModelResponse>(CarModelConfigs.resourceUrl, CarModelConfigs.resourceKey,
    { all: 1, filter: `carMake.id==${form.values['carMakeId'] || 0}` },
    (carModelListResponse) => {
      const selectList: SelectOption[] = carModelListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.modelName,
      }));
      setCarModelSelectList(selectList);
    }
  );
  useGetAllApi<CarVariantResponse>(CarVariantConfigs.resourceUrl, CarVariantConfigs.resourceKey,
    { all: 1, filter: `carModel.id==${form.values['carModelId'] || 0}` },
    (carVariantListResponse) => {
      const selectList: SelectOption[] = carVariantListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.variantName,
      }));
      setCarVariantSelectList(selectList);
    }
  );
  const handleFormSubmit = form.onSubmit((formValues) => {
    const createProduct = (uploadedImageResponses?: UploadedImageResponse[]) => {
      const requestBody: ProductRequest = {
        name: formValues.name,
        code: formValues.code,
        slug: formValues.slug,
        shortDescription: formValues.shortDescription || null,
        description: formValues.description || null,
        images: uploadedImageResponses ? transformImages(uploadedImageResponses) : [],
        status: Number(formValues.status),
        categoryId: Number(formValues.categoryId) || null,
        vehicleTypeId: Number(formValues.vehicleTypeId) || null,
        carMakeId: Number(formValues.carMakeId) || null,
        carModelId: Number(formValues.carModelId) || null,
        carVariantId: Number(formValues.carVariantId) || null,
        brandId: Number(formValues.brandId) || null,
        supplierId: Number(formValues.supplierId) || null,
        unitId: Number(formValues.unitId) || null,
        tags: transformTags(formValues.tags),
        specifications: filterSpecifications(formValues.specifications),
        properties: filterProperties(formValues.properties),
        variants: filterVariants(formValues.variants),
        weight: formValues.weight || null,
        guaranteeId: Number(formValues.guaranteeId) || null,
      };
      createApi.mutate(requestBody, {
        onSuccess: async (productResponse) => {
          await queryClient.invalidateQueries([TagConfigs.resourceKey, 'getAll']);
          const tags = productResponse.tags
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((tag) => String(tag.id) + '#ORIGINAL');
          form.setFieldValue('tags', tags);
        },
      });
    };

    if (imageFiles.length > 0) {
      uploadMultipleImagesApi.mutate(imageFiles, {
        onSuccess: (imageCollectionResponse) => createProduct(imageCollectionResponse.content),
      });
    } else {
      createProduct();
    }
  });

  const resetForm = () => {
    form.reset();
    setImageFiles([]);
    setThumbnailName('');
  };

  const statusSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'In effect',
    },
    {
      value: '2',
      label: 'Not in effect',
    },
  ];

  return {
    form,
    handleFormSubmit,
    statusSelectList,
    categorySelectList,
    brandSelectList,
    supplierSelectList,
    unitSelectList,
    tagSelectList,
    guaranteeSelectList,
    imageFiles, setImageFiles,
    thumbnailName, setThumbnailName,
    specificationSelectList, setSpecificationSelectList,
    productPropertySelectList, setProductPropertySelectList,
    selectedVariantIndexes, setSelectedVariantIndexes,
    resetForm,
    vehicleTypeSelectList,
    carMakeSelectList,
    carModelSelectList,
    carVariantSelectList,
  };
}

export default useProductCreateViewModel;
