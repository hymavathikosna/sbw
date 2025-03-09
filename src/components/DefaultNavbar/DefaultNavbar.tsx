import React, { useState } from 'react';
import { Center, Navbar, ScrollArea, Stack, useMantineTheme } from '@mantine/core';
import {
  AddressBook,
  Award,
  Box,
  Building,
  BuildingWarehouse,
  Car,
  CurrencyDollar,
  FileBarcode,
  Fingerprint,
  Home,
  Icon,
  Message,
  Users
} from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import useAppStore from 'stores/use-app-store';
import useDefaultNavbarStyles from 'components/DefaultNavbar/DefaultNavbar.styles';
import useAdminAuthStore from 'stores/use-admin-auth-store';

interface NavbarLink {
  link: string;
  label: string;
  icon: Icon;
  childLinks?: NavbarChildLink[];
  disableForEmployee?: boolean;
}

interface NavbarChildLink {
  link: string;
  label: string;
}

const navbarLinks: NavbarLink[] = [
  {
    link: '/admin',
    label: 'Home',
    icon: Home,
  },
  {
    link: '/admin/address',
    label: 'Address',
    icon: AddressBook,
    childLinks: [
      {
        link: '/admin/address/province',
        label: 'Province',
      },
      {
        link: '/admin/address/district',
        label: 'District',
      },
      {
        link: '/admin/address/ward',
        label: 'Ward',
      },
    ],
    disableForEmployee: true,
  },
  {
    link: '/admin/user',
    label: 'Users',
    icon: Fingerprint,
    childLinks: [
      {
        link: '/admin/user/role',
        label: 'Roles',
      },
    ],
    disableForEmployee: true,
  },
  {
    link: '/admin/employee',
    label: 'Employees',
    icon: Building,
    childLinks: [
      {
        link: '/admin/employee/office',
        label: 'Office',
      },
      {
        link: '/admin/employee/department',
        label: 'Department',
      },
      {
        link: '/admin/employee/job-type',
        label: 'Job Type',
      },
      {
        link: '/admin/employee/job-level',
        label: 'Job Level',
      },
      {
        link: '/admin/employee/job-title',
        label: 'Job Title',
      },
    ],
    disableForEmployee: true,
  },
  {
    link: '/admin/customer',
    label: 'Customers',
    icon: Users,
    childLinks: [
      {
        link: '/admin/customer/group',
        label: 'Customer Group',
      },
      {
        link: '/admin/customer/status',
        label: 'Customer Status',
      },
      {
        link: '/admin/customer/resource',
        label: 'Customer Source',
      },
    ],
    disableForEmployee: true,
  },
  {
    link: '/admin/product',
    label: 'Products',
    icon: Box,
    childLinks: [
      {
        link: '/admin/vehicle-type',
        label: 'Vehicle Types',
      },
      {
        link: '/admin/car-make',
        label: 'Car Makes',
      },
      {
        link: '/admin/car-model',
        label: 'Car Models',
      },
      {
        link: '/admin/car-variant',
        label: 'Car Variants',
      },
      {
        link: '/admin/category',
        label: 'Product Categories',
      },
      {
        link: '/admin/product/brand',
        label: 'Brand',
      },
      {
        link: '/admin/product/supplier',
        label: 'Supplier',
      },
      {
        link: '/admin/product/unit',
        label: 'Unit of Measurement',
      },
      {
        link: '/admin/product/tag',
        label: 'Tags',
      },
      {
        link: '/admin/product/guarantee',
        label: 'Warranty',
      },
      {
        link: '/admin/product/property',
        label: 'Product Attributes',
      },
      {
        link: '/admin/product/specification',
        label: 'Product Specifications',
      },
    ],
    disableForEmployee: true,
  },
  {
    link: '/admin/inventory',
    label: 'Inventory',
    icon: BuildingWarehouse,
    childLinks: [
      {
        link: '/admin/inventory/warehouse',
        label: 'Warehouse',
      },
      {
        link: '/admin/inventory/purchase-order',
        label: 'Purchase Order',
      },
      {
        link: '/admin/inventory/destination',
        label: 'Receiving Location',
      },
      {
        link: '/admin/inventory/docket',
        label: 'Stock In/Out Slip',
      },
      {
        link: '/admin/inventory/docket-reason',
        label: 'Stock In/Out Reason',
      },
      {
        link: '/admin/inventory/count',
        label: 'Inventory Check Slip',
      },
      {
        link: '/admin/inventory/transfer',
        label: 'Stock Transfer Slip',
      },
    ],
  },
  {
    link: '/admin/order',
    label: 'Orders',
    icon: FileBarcode,
    childLinks: [
      {
        link: '/admin/order/resource',
        label: 'Order Source',
      },
      {
        link: '/admin/order/cancellation-reason',
        label: 'Order Cancellation Reasons',
      },
    ],
  },
  {
    link: '/admin/waybill',
    label: 'Waybills',
    icon: Car,
    childLinks: [],
  },
  {
    link: '/admin/review',
    label: 'Reviews',
    icon: Message,
    childLinks: [],
  },
  {
    link: '/admin/reward-strategy',
    label: 'Rewards',
    icon: Award,
    childLinks: [],
    disableForEmployee: true,
  },
  {
    link: '/admin/voucher',
    label: 'Fund Ledger',
    icon: CurrencyDollar,
    childLinks: [
      {
        link: '/admin/payment-method',
        label: 'Payment Methods',
      },
      {
        link: '/admin/promotion',
        label: 'Promotions',
      },
    ],
    disableForEmployee: true,
  },
];

export function DefaultNavbar() {
  const theme = useMantineTheme();
  const { opened } = useAppStore();
  const { classes, cx } = useDefaultNavbarStyles();
  const [active, setActive] = useState('Home');

  const { isOnlyEmployee } = useAdminAuthStore();

  const navbarLinksFragment = navbarLinks.map(navbarLink => (
    <Stack
      key={navbarLink.label}
      spacing={0}
      sx={{ borderRadius: theme.radius.sm, overflow: 'hidden' }}
    >
      <Link
        to={navbarLink.link}
        className={cx(classes.link, {
          [classes.linkActive]: navbarLink.label === active,
          [classes.linkDisabled]: isOnlyEmployee() && navbarLink.disableForEmployee,
        })}
        onClick={() => setActive(navbarLink.label)}
      >
        <navbarLink.icon className={classes.linkIcon}/>
        <span>{navbarLink.label}</span>
      </Link>
      {navbarLink.label === active && (navbarLink.childLinks || []).map(childLink => (
        <Link
          key={childLink.label}
          to={childLink.link}
          className={cx(classes.link, { [classes.childLinkActive]: navbarLink.label === active })}
        >
          <Center sx={{ width: 24, marginRight: theme.spacing.sm }}>
            <div className={classes.childLinkDot}/>
          </Center>
          <span>{childLink.label}</span>
        </Link>
      ))}
    </Stack>
  ));

  return (
    <Navbar
      p="md"
      width={{ md: 250 }}
      hidden={!opened}
    >
      <Navbar.Section grow component={ScrollArea}>
        {navbarLinksFragment}
      </Navbar.Section>
    </Navbar>
  );
}
