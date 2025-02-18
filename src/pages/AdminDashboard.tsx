import React from 'react';
import { Card, Grid, Group, MantineColor, Paper, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import {
  Box,
  BrandApple,
  BuildingWarehouse,
  FileBarcode,
  Icon,
  Percentage,
  Star,
  Truck,
  Users
} from 'tabler-icons-react';
import { Bar, BarChart, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { StatisticResource, StatisticResponse } from 'models/Statistic';
import DateUtils from 'utils/DateUtils';

const dateReducerForStatisticResources = (statisticResources: StatisticResource[]) => statisticResources.map((statisticResource) => ({
  date: DateUtils.isoDateToString(statisticResource.date, 'DD/MM/YY'),
  total: statisticResource.total,
}));

function AdminDashboard() {
  const theme = useMantineTheme();

  const { statisticResponse } = useGetStatisticApi();
  const statistic = statisticResponse as StatisticResponse;

  return (
    <Stack mb={30}>
      <Title order={3}>System Statistics</Title>

      <Paper shadow="xs" p="md">
        <Stack>
          <Text size="lg" weight={500} color="dimmed">Overview</Text>
          <Grid>
            <Grid.Col span={3}>
              <OverviewCard title="Total Customers" number={statistic.totalCustomer} color="blue" icon={Users}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Total Products" number={statistic.totalProduct} color="orange" icon={Box}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Total Orders" number={statistic.totalOrder} color="teal" icon={FileBarcode}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Total Shipments" number={statistic.totalWaybill} color="grape" icon={Truck}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Total Reviews" number={statistic.totalReview} color="yellow" icon={Star}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard
                title="Total Active Promotions"
                number={statistic.totalActivePromotion}
                color="pink"
                icon={Percentage}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard
                title="Total Suppliers"
                number={statistic.totalSupplier}
                color="violet"
                icon={BuildingWarehouse}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Total Brands" number={statistic.totalBrand} color="indigo" icon={BrandApple}/>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
}

interface OverviewCardProps {
  title: string;
  number: number;
  color: MantineColor;
  icon: Icon;
}

function OverviewCard({ title, number, color, icon }: OverviewCardProps) {
  const theme = useMantineTheme();
  const Icon = icon;

  return (
    <Card sx={{
      backgroundColor: theme.colors[color][theme.colorScheme === 'dark' ? 9 : 1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    }}>
      <Group>
        <Icon size={40} strokeWidth={1.25}/>
        <Stack spacing={2.5}>
          <Text>{title}</Text>
          <Text size="xl" weight={500}>{number}</Text>
        </Stack>
      </Group>
    </Card>
  );
}

const defaultStatisticResponse: StatisticResponse = {
  totalCustomer: 0,
  totalProduct: 0,
  totalOrder: 0,
  totalWaybill: 0,
  totalReview: 0,
  totalActivePromotion: 0,
  totalSupplier: 0,
  totalBrand: 0,
  statisticRegistration: [],
  statisticOrder: [],
  statisticReview: [],
  statisticWaybill: [],
};

function useGetStatisticApi() {
  const {
    data: statisticResponse,
    isLoading: isLoadingStatisticResponse,
    isError: isErrorStatisticResponse,
  } = useQuery<StatisticResponse, ErrorMessage>(
    ['api', 'stats', 'getStatistic'],
    () => FetchUtils.get(ResourceURL.STATISTIC),
    {
      onError: () => NotifyUtils.simpleFailed('Failed to fetch data'),
      keepPreviousData: true,
      initialData: defaultStatisticResponse,
    }
  );

  return { statisticResponse, isLoadingStatisticResponse, isErrorStatisticResponse };
}

export default AdminDashboard;
