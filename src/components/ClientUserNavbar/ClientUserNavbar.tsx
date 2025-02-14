import { Button, Stack } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { Alarm, Award, Bell, FileBarcode, Heart, Icon, MessageCircle, Settings, Star, User } from 'tabler-icons-react';

function ClientUserNavbar() {
  const location = useLocation();

  const navButton = (name: string, path: string, Icon: Icon, childPaths?: string[]) => (
    <Button
      component={Link}
      to={path}
      size="md"
      radius="md"
      leftIcon={<Icon size={18} strokeWidth={1.5}/>}
      variant={(location.pathname === path || childPaths
        ?.some(path => location.pathname.startsWith(path))) ? 'light' : 'subtle'}
      styles={{ root: { width: '100%', padding: '0 12px' }, inner: { justifyContent: 'start' } }}
    >
      {name}
    </Button>
  );

  return (
    <Stack spacing={5}>
      {navButton('Account', '/user', User)}
      {navButton('Settings', '/user/setting', Settings,
        ['/user/setting/personal', '/user/setting/phone', '/user/setting/email', '/user/setting/password'])}
      {navButton('Notification', '/user/notification', Bell)}
      {navButton('Order Management', '/order', FileBarcode, ['/order/detail'])}
      {navButton('Product Reviews', '/user/review', Star)}
      {navButton('Wishlist', '/user/wishlist', Heart)}
      {navButton('Reward Points', '/user/reward', Award)}
      {navButton('Pre-order Products', '/user/preorder', Alarm)}
      {navButton('Consultation Request', '/user/chat', MessageCircle)}
    </Stack>
  );
}

export default ClientUserNavbar;
