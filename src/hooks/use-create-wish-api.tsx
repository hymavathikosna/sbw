import { useMutation } from 'react-query';
import { ClientWishRequest, ClientWishResponse } from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import React from 'react';

function useCreateWishApi() {
  return useMutation<ClientWishResponse, ErrorMessage, ClientWishRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_WISH, requestBody),
    {
      onSuccess: (response) =>
        NotifyUtils.simpleSuccess(
          <Text inherit>
            <span>Product {response.wishProduct.productName} has been added to the </span>
            <Anchor component={Link} to="/user/wishlist" inherit>wishlist</Anchor>
          </Text>
        ),
      onError: () => NotifyUtils.simpleFailed('Failed to add product to wishlist'),
    }
  );
}

export default useCreateWishApi;
