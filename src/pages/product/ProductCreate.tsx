import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import {
  CreateUpdateTitle,
  DefaultPropertyPanel,
  ProductImagesDropzone,
  ProductProperties,
  ProductSpecifications,
  ProductVariants
} from 'components';
import ProductConfigs from 'pages/product/ProductConfigs';
import useProductCreateViewModel from 'pages/product/ProductCreate.vm';

function ProductCreate() {
  const {
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
  } = useProductCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={ProductConfigs.managerPath}
        title={ProductConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col>
                <Title order={4}>Basic Information</Title>
                <Text size="sm">Some general information</Text>
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  required
                  label={ProductConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={ProductConfigs.properties.code.label}
                  {...form.getInputProps('code')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={ProductConfigs.properties.slug.label}
                  {...form.getInputProps('slug')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label={ProductConfigs.properties.shortDescription.label}
                  {...form.getInputProps('shortDescription')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label={ProductConfigs.properties.description.label}
                  {...form.getInputProps('description')}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Product Images</Title>
                <Text size="sm">Add a list of product showcase images and select a representative image</Text>
              </Grid.Col>
              <Grid.Col>
                <ProductImagesDropzone
                  imageFiles={imageFiles}
                  setImageFiles={setImageFiles}
                  thumbnailName={thumbnailName}
                  setThumbnailName={setThumbnailName}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Product Specifications</Title>
                <Text size="sm">Add product specifications</Text>
              </Grid.Col>
              <Grid.Col>
                <ProductSpecifications
                  specifications={form.values.specifications}
                  setSpecifications={(specifications) => form.setFieldValue('specifications', specifications)}
                  specificationSelectList={specificationSelectList}
                  setSpecificationSelectList={setSpecificationSelectList}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Product Attributes</Title>
                <Text size="sm">Add new attributes to provide more options for the product, such as size or color</Text>
              </Grid.Col>
              <Grid.Col>
                <ProductProperties
                  productProperties={form.values.properties}
                  setProductProperties={(productProperties) => form.setFieldValue('properties', productProperties)}
                  productPropertySelectList={productPropertySelectList}
                  setProductPropertySelectList={setProductPropertySelectList}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Product Variants</Title>
                <Text size="sm">The default variant of the product or a variant based on product attributes</Text>
              </Grid.Col>
              <Grid.Col>
                <ProductVariants
                  variants={form.values.variants}
                  setVariants={(variants) => form.setFieldValue('variants', variants)}
                  productProperties={form.values.properties}
                  setProductProperties={(productProperties) => form.setFieldValue('properties', productProperties)}
                  selectedVariantIndexes={selectedVariantIndexes}
                  setSelectedVariantIndexes={setSelectedVariantIndexes}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Additional Information</Title>
                <Text size="sm">Some extra information</Text>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={ProductConfigs.properties.status.label}
                  placeholder="--"
                  data={statusSelectList}
                  {...form.getInputProps('status')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={ProductConfigs.properties.categoryId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={categorySelectList}
                  {...form.getInputProps('categoryId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={ProductConfigs.properties.brandId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={brandSelectList}
                  {...form.getInputProps('brandId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={ProductConfigs.properties.supplierId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={supplierSelectList}
                  {...form.getInputProps('supplierId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={ProductConfigs.properties.unitId.label}
                  placeholder="--"
                  clearable
                  data={unitSelectList}
                  {...form.getInputProps('unitId')}
                />
              </Grid.Col>
              <Grid.Col>
                <MultiSelect
                  label={ProductConfigs.properties.tags.label}
                  placeholder="--"
                  clearable
                  searchable
                  creatable
                  data={tagSelectList}
                  getCreateLabel={(tagName) => `+ Create tag ${tagName}`}
                  {...form.getInputProps('tags')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <NumberInput
                  precision={2}
                  min={0}
                  label={ProductConfigs.properties.weight.label}
                  description="Calculated by gram"
                  {...form.getInputProps('weight')}
                />
              </Grid.Col>
              <Grid.Col xs={6} p={0}></Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={ProductConfigs.properties.guaranteeId.label}
                  placeholder="--"
                  clearable
                  data={guaranteeSelectList}
                  {...form.getInputProps('guaranteeId')}
                />
              </Grid.Col>
            </Grid>

            <Divider mt="xs"/>

            <Group position="apart" p="sm">
              <Button variant="default" onClick={resetForm}>Default</Button>
              <Button type="submit">Add</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default ProductCreate;
