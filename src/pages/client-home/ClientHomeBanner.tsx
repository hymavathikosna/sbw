import React from 'react';
import { Box, createStyles, Grid, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { Car, HeartHandshake, Stars } from 'tabler-icons-react';
import { ClientCarousel } from 'components';

const useStyles = createStyles((theme) => ({
  rightBanner: {
    flexWrap: 'unset',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
    borderRadius: theme.radius.md,
  },
}));

function ClientHomeBanner() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Grid>
      <Grid.Col md={7} lg={8}>
        <ClientCarousel>
          <Box
            sx={{
              height: '100%',
              minHeight: 315,
              backgroundImage: theme.fn.linearGradient(105, theme.colors.teal[3], theme.colors.lime[3]),
            }}
          >
          </Box>
          <Box
            sx={{
              height: '100%',
              minHeight: 315,
              backgroundImage: theme.fn.linearGradient(0, theme.colors.orange[3], theme.colors.red[3]),
            }}
          >
          </Box>
          <Box
            sx={{
              height: '100%',
              minHeight: 315,
              backgroundImage: theme.fn.linearGradient(0, theme.colors.indigo[3], theme.colors.cyan[3]),
            }}
          >
          </Box>
        </ClientCarousel>
      </Grid.Col>
      <Grid.Col md={5} lg={4}>
        <Stack>
          <Group py="sm" px="md" className={classes.rightBanner}>
            <Car size={65} strokeWidth={1}/>
            <Stack spacing={theme.spacing.xs / 4}>
              <Text size="md" weight={500}>Free Shipping</Text>
              <Text size="sm">100% of orders qualify for free shipping when paid in advance.</Text>
            </Stack>
          </Group>
          <Group py="sm" px="md" className={classes.rightBanner}>
            <Stars size={65} strokeWidth={1}/>
            <Stack spacing={theme.spacing.xs / 4}>
              <Text size="md" weight={500}>Dedicated Warranty</Text>
              <Text size="sm">Regardless of paperwork, we are committed to providing full support to our customers.</Text>
            </Stack>
          </Group>
          <Group py="sm" px="md" className={classes.rightBanner}>
            <HeartHandshake size={65} strokeWidth={1}/>
            <Stack spacing={theme.spacing.xs / 4}>
              <Text size="md" weight={500}>1-to-1 Exchange or Refund</Text>
              <Text size="sm">If there is a defect or the product does not meet your expectations.</Text>
            </Stack>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}

export default ClientHomeBanner;
