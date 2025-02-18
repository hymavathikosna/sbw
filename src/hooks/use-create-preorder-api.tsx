import { useMutation } from 'react-query';
import { ClientPreorderRequest, ClientPreorderResponse } from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import React from 'react';

function useCreatePreorderApi() {
  return useMutation<ClientPreorderResponse, ErrorMessage, ClientPreorderRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_PREORDER, requestBody),
    {
      onSuccess: (response) =>
        NotifyUtils.simpleSuccess(
          <Text inherit>
            <span>Product {response.preorderProduct.productName} has been added to the </span>
            <Anchor component={Link} to="/user/preorder" inherit>preorder list</Anchor>
          </Text>
        ),
      onError: () => NotifyUtils.simpleFailed('Failed to add product to preorder list'),
    }
  );
}

export default useCreatePreorderApi;
