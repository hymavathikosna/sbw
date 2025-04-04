import React from 'react';
import { Grid, Group, Pagination, Skeleton, Stack, Text, useMantineTheme } from '@mantine/core';
import { ClientProductCard } from 'components';
import ApplicationConstants from 'constants/ApplicationConstants';
import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage, ListResponse } from 'utils/FetchUtils';
import { ClientListedProductResponse } from 'types';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { AlertTriangle, Marquee } from 'tabler-icons-react';
import useClientCategoryStore from 'stores/use-client-category-store';

interface ClientCategoryProductsProps {
  categorySlug: string,
  vehicleTypeId: string
}

function ClientCategoryProducts({ categorySlug, vehicleTypeId }: ClientCategoryProductsProps) {
  const theme = useMantineTheme();

  const { activePage, activeSearch, updateActivePage } = useClientCategoryStore();

  const {
    productResponses,
    isLoadingProductResponses,
    isErrorProductResponses,
  } = useGetAllCategoryProductsApi(categorySlug,vehicleTypeId);
  const products = productResponses as ListResponse<ClientListedProductResponse>;

  if (isLoadingProductResponses) {
    return (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorProductResponses) {
    return (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>An error has occurred</Text>
      </Stack>
    );
  }

  if (products.totalElements === 0) {
    return (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.blue[6] }}>
        <Marquee size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>No products</Text>
      </Stack>
    );
  }

  return (
    <>
      <Grid>
        {products.content.map((product, index) => (
          <Grid.Col key={index} span={6} sm={4}>
            <ClientProductCard product={product} search={activeSearch || ''}/>
          </Grid.Col>
        ))}
      </Grid>

      <Group position="apart" mt={theme.spacing.lg}>
        <Pagination
          page={activePage}
          total={products.totalPages}
          onChange={(page: number) => (page !== activePage) && updateActivePage(page)}
        />
        <Text>
          <Text component="span" weight={500}>Page {activePage}</Text>
          <span> / {products.totalPages}</span>
        </Text>
      </Group>
    </>
  );
}

function useGetAllCategoryProductsApi(categorySlug: string, vehicleTypeId: string) {
  const {
    totalProducts,
    activePage,
    activeSort,
    activeSearch,
    activeSaleable,
    activeBrandFilter,
    activePriceFilter,
    updateTotalProducts,
  } = useClientCategoryStore();
  let filterCreteria = 'category.slug=='+categorySlug;
  if(vehicleTypeId){
    filterCreteria = filterCreteria +'; vehicleType.id=='+vehicleTypeId;
  }
  const requestParams = {
    page: activePage,
    size: ApplicationConstants.DEFAULT_CLIENT_CATEGORY_PAGE_SIZE,
    filter: [filterCreteria, activeBrandFilter, activePriceFilter].filter(Boolean).join(';'),
    sort: activeSort,
    search: activeSearch,
    newable: true,
    saleable: activeSaleable,
  };

  const {
    data: productResponses,
    isLoading: isLoadingProductResponses,
    isError: isErrorProductResponses,
  } = useQuery<ListResponse<ClientListedProductResponse>, ErrorMessage>(
    ['client-api', 'products', 'getAllProducts', requestParams],
    () => FetchUtils.get(ResourceURL.CLIENT_PRODUCT, requestParams),
    {
      onSuccess: (productResponses) =>
        (totalProducts !== productResponses.totalElements) && updateTotalProducts(productResponses.totalElements),
      onError: () => NotifyUtils.simpleFailed('Failed to retrieve data'),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return { productResponses, isLoadingProductResponses, isErrorProductResponses };
}

export default ClientCategoryProducts;
