import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Grid,
  Group,
  Image,
  NumberInput,
  NumberInputHandlers,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import MiscUtils from 'utils/MiscUtils';
import { ClientCarousel, ReviewStarGroup } from 'components';
import { BellPlus, Heart, PhotoOff, ShoppingCart } from 'tabler-icons-react';
import React, { useRef, useState } from 'react';
import {
  ClientCartRequest,
  ClientPreorderRequest,
  ClientProductResponse,
  ClientWishRequest,
  UpdateQuantityType
} from 'types';
import useCreateWishApi from 'hooks/use-create-wish-api';
import NotifyUtils from 'utils/NotifyUtils';
import useAuthStore from 'stores/use-auth-store';
import useCreatePreorderApi from 'hooks/use-create-preorder-api';
import useSaveCartApi from 'hooks/use-save-cart-api';

interface ClientProductIntroProps {
  product: ClientProductResponse;
}

function ClientProductIntro({ product }: ClientProductIntroProps) {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const quantityInputHandlers = useRef<NumberInputHandlers>();

  const { user, currentCartId } = useAuthStore();

  const createWishApi = useCreateWishApi();
  const createPreorderApi = useCreatePreorderApi();
  const saveCartApi = useSaveCartApi();

  const handleSelectVariantButton = (variantIndex: number) => {
    setSelectedVariantIndex(variantIndex);
    setQuantity(1);
  };

  const handleCreateWishButton = () => {
    if (!user) {
      NotifyUtils.simple('Please log in to use this feature.');
      navigate('/signin');
    } else {
      const clientWishRequest: ClientWishRequest = {
        userId: user.id,
        productId: product.productId,
      };
      createWishApi.mutate(clientWishRequest);
    }
  };

  const handleCreatePreorderButton = () => {
    if (!user) {
      NotifyUtils.simple('Please log in to use this feature.');
      navigate('/signin');
    } else {
      const clientPreorderRequest: ClientPreorderRequest = {
        userId: user.id,
        productId: product.productId,
        status: 1,
      };
      createPreorderApi.mutate(clientPreorderRequest);
    }
  };

  const handleAddToCartButton = () => {
    if (!user) {
      NotifyUtils.simple('Please log in to use this feature.');
      navigate('/signin');
    } else {
      const cartRequest: ClientCartRequest = {
        cartId: currentCartId,
        userId: user.id,
        cartItems: [
          {
            variantId: product.productVariants[selectedVariantIndex].variantId,
            quantity: quantity,
          },
        ],
        status: 1,
        updateQuantityType: UpdateQuantityType.INCREMENTAL,
      };
      saveCartApi.mutate(cartRequest, {
        onSuccess: () => NotifyUtils.simpleSuccess(
          <Text inherit>
            You have added the selected item to the <Anchor component={Link} to="/cart" inherit>cart</Anchor>
          </Text>
        ),
      });
    }
  };

  return (
    <Card radius="md" shadow="sm" p="lg">
      <Stack>
        <Breadcrumbs>
          <Anchor component={Link} to="/">
            Home
          </Anchor>
          {product.productCategory && MiscUtils.makeCategoryBreadcrumbs(product.productCategory).map(c => (
            <Anchor key={c.categorySlug} component={Link} to={'/category/' + c.categorySlug}>
              {c.categoryName}
            </Anchor>
          ))}
          <Text color="dimmed">
            {product.productName}
          </Text>
        </Breadcrumbs>

        <Grid gutter="lg">
          <Grid.Col md={6}>
            {product.productImages.length > 0
              ? (
                <ClientCarousel>
                  {product.productImages.map(image => (
                    <Image
                      key={image.id}
                      radius="md"
                      src={image.path}
                      styles={{ image: { aspectRatio: '1 / 1' } }}
                      withPlaceholder
                    />
                  ))}
                </ClientCarousel>
              )
              : (
                <Box
                  sx={{
                    borderRadius: theme.radius.md,
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1 / 1',
                    border: `2px dotted ${theme.colors.gray[5]}`,
                  }}
                >
                  <Stack align="center" justify="center" sx={{ height: '100%' }}>
                    <PhotoOff size={100} strokeWidth={1}/>
                    <Text>No image for this product</Text>
                  </Stack>
                </Box>
              )}
          </Grid.Col>
          <Grid.Col md={6}>
            <Stack spacing="lg">
              <Stack spacing={2} sx={{ alignItems: 'start' }}>
                {!product.productSaleable && <Badge color="red" variant="filled" mb={5}>Out of stock</Badge>}
                {product.productBrand && (
                  <Group spacing={5}>
                    <Text size="sm">Brand:</Text>
                    <Anchor component={Link} to={'/brand/' + product.productBrand.brandId} size="sm">
                      {product.productBrand.brandName}
                    </Anchor>
                  </Group>
                )}
                <Text sx={{ fontSize: 26 }} weight={500}>
                  {product.productName}
                </Text>
                <Group mt={7.5} spacing="lg">
                  <Group spacing="xs">
                    <ReviewStarGroup ratingScore={product.productAverageRatingScore}/>
                    <Text size="sm">{product.productCountReviews} Rating</Text>
                  </Group>
                  {/* TODO: Product sales */}
                  {/*<Group spacing={5}>*/}
                  {/*  <ShoppingCart size={18} strokeWidth={1.5} color={theme.colors.teal[7]}/>*/}
                  {/*  <Text size="sm" color="teal">120 đã mua</Text>*/}
                  {/*</Group>*/}
                </Group>
              </Stack>

              {product.productShortDescription && <Text color="dimmed">{product.productShortDescription}</Text>}

              <Box
                sx={{
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
                  borderRadius: theme.radius.md,
                  padding: '16px 20px',
                }}
              >
                <Group>
                  <Text sx={{ fontSize: 24 }} weight={700} color="pink">
                    {MiscUtils.formatPrice(
                      MiscUtils.calculateDiscountedPrice(
                        product.productVariants[selectedVariantIndex]?.variantPrice,
                        product.productPromotion ? product.productPromotion.promotionPercent : 0
                      )
                    )}₹
                  </Text>
                  {product.productPromotion && (
                    <>
                      <Text sx={{ textDecoration: 'line-through' }}>
                        {MiscUtils.formatPrice(product.productVariants[selectedVariantIndex]?.variantPrice)}₹
                      </Text>
                      <Badge color="pink" size="lg" variant="filled">
                        -{product.productPromotion.promotionPercent}%
                      </Badge>
                    </>
                  )}
                </Group>
              </Box>

              <Stack spacing="xs">
                <Text weight={500}>Version</Text>
                {product.productVariants.length > 0
                  ? product.productVariants.some(variant => variant.variantProperties)
                    ? (
                      <Group>
                        {product.productVariants.map((variant, index) => (
                          <UnstyledButton
                            key={variant.variantId}
                            sx={{
                              borderRadius: theme.radius.md,
                              padding: '7.5px 15px',
                              border: `2px solid ${theme.colorScheme === 'dark'
                                ? (index === selectedVariantIndex ? theme.colors.blue[9] : theme.colors.dark[3])
                                : (index === selectedVariantIndex ? theme.colors.blue[4] : theme.colors.gray[2])}`,
                              backgroundColor: index === selectedVariantIndex
                                ? (theme.colorScheme === 'dark'
                                  ? theme.fn.rgba(theme.colors.blue[9], 0.25)
                                  : theme.colors.blue[0])
                                : 'unset',
                              opacity: variant.variantInventory === 0 ? 0.5 : 'unset',
                            }}
                            onClick={() => handleSelectVariantButton(index)}
                            disabled={selectedVariantIndex === index || variant.variantInventory === 0}
                          >
                            <Stack spacing={2.5}>
                              <SimpleGrid cols={2} spacing={2.5}>
                                {variant.variantProperties?.content.map(property => (
                                  <React.Fragment key={property.id}>
                                    <Text size="sm">{property.name}</Text>
                                    <Text
                                      size="sm"
                                      sx={{ textAlign: 'right', fontWeight: 500 }}
                                    >
                                      {property.value}
                                    </Text>
                                  </React.Fragment>
                                ))}
                              </SimpleGrid>
                              <Text size="xs" color="dimmed">Stock: {variant.variantInventory}</Text>
                              <Text size="xs" color="dimmed">Price: {MiscUtils.formatPrice(
                                MiscUtils.calculateDiscountedPrice(
                                  variant.variantPrice,
                                  product.productPromotion ? product.productPromotion.promotionPercent : 0
                                )
                              )}₹</Text>
                            </Stack>
                          </UnstyledButton>
                        ))}
                      </Group>
                    )
                    : <Text color="dimmed" size="sm">The product only has a single default version</Text>
                  : <Text color="dimmed" size="sm">No versions available</Text>}
              </Stack>

              {product.productSaleable && (
                <Stack spacing="xs">
                  <Text weight={500}>Quantity</Text>
                  <Group spacing={5}>
                    <ActionIcon size={36} variant="default" onClick={() => quantityInputHandlers.current?.decrement()}>
                      –
                    </ActionIcon>

                    <NumberInput
                      hideControls
                      value={quantity}
                      onChange={(value) => setQuantity(value || 1)}
                      handlersRef={quantityInputHandlers}
                      max={product.productVariants[selectedVariantIndex].variantInventory}
                      min={1}
                      styles={{ input: { width: 54, textAlign: 'center' } }}
                    />

                    <ActionIcon size={36} variant="default" onClick={() => quantityInputHandlers.current?.increment()}>
                      +
                    </ActionIcon>
                  </Group>
                </Stack>
              )}

              <Group mt={theme.spacing.md}>
                {!product.productSaleable
                  ? (
                    <Button
                      radius="md"
                      size="lg"
                      color="teal"
                      leftIcon={<BellPlus/>}
                      onClick={handleCreatePreorderButton}
                    >
                      Pre-order
                    </Button>
                  )
                  : (
                    <Button
                      radius="md"
                      size="lg"
                      color="pink"
                      leftIcon={<ShoppingCart/>}
                      onClick={handleAddToCartButton}
                    >
                      Select to buy
                    </Button>
                  )}
                <Button
                  radius="md"
                  size="lg"
                  color="pink"
                  variant="outline"
                  leftIcon={<Heart/>}
                  onClick={handleCreateWishButton}
                >
                  Favorite
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );
}

export default ClientProductIntro;
