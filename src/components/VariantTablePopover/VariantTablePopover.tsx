import React, { useState } from 'react';
import { Badge, Button, Popover, Table, useMantineTheme } from '@mantine/core';
import { ProductPropertyItem, ProductResponse_VariantResponse } from 'models/Product';
import { CollectionWrapper } from 'types';
import MiscUtils from 'utils/MiscUtils';

interface VariantTablePopoverProps {
  variants: ProductResponse_VariantResponse[],
  productProperties: CollectionWrapper<ProductPropertyItem> | null,
}

function VariantTablePopover({
  variants,
  productProperties,
}: VariantTablePopoverProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const variantStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Effective</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Not in effect</Badge>;
  };

  if (variants.length === 0) {
    return <em>không có</em>;
  }

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position="bottom"
      placement="end"
      withArrow
      transition="pop-top-right"
      title="Version Information"
      withCloseButton
      closeButtonLabel="Close version information box"
      spacing="sm"
      shadow="md"
      target={
        <Button
          size="xs"
          color="teal"
          compact
          onClick={() => setOpened((o) => !o)}
        >
          {variants.length + ' Version'}
        </Button>
      }
    >
      <Table
        horizontalSpacing="sm"
        verticalSpacing="sm"
        highlightOnHover
        striped
      >
        <thead>
          <tr>
            <th>#</th>
            {productProperties && productProperties.content.map((property, index) => (
              <th key={index} style={{ color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7] }}>
                {property.name}
              </th>
            ))}
            <th>SKU</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {variant.properties && variant.properties.content.map((property, index) => (
                <td key={index}>{property.value}</td>
              ))}
              <td>{variant.sku}</td>
              <td style={{ textAlign: 'right' }}>{MiscUtils.formatPrice(variant.cost) + '₹'}</td>
              <td style={{ textAlign: 'right' }}>{MiscUtils.formatPrice(variant.price) + '₹'}</td>
              <td>{variantStatusBadgeFragment(variant.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Popover>
  );
}

export default VariantTablePopover;
