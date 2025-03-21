import React from 'react';
import { Anchor, Center, Stack, Text, useMantineTheme } from '@mantine/core';
import { CurrencyDollar } from 'tabler-icons-react';

function VoucherManage() {
  const theme = useMantineTheme();

  return (
    <Center>
      <Stack align="center">
        <CurrencyDollar size={200} strokeWidth={1} color={theme.colors.gray[5]}/>
        <Text size="lg">The cashbook is a feature for managing the system&apos;s cash flow</Text>
        <Text>
          Reference: <Anchor href="https://www.teamcrop.com/ho-tro/module-so-quy" target="_blank">Teamcrop&apos;s cashbook module</Anchor>
        </Text>
      </Stack>
    </Center>
  );
}

export default VoucherManage;
