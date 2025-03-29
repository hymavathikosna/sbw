import {
  Badge,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Indicator,
  Menu,
  Popover,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { ElectroLogo } from 'components';
import {
  Alarm,
  Award,
  Bell,
  FileBarcode,
  Fingerprint,
  Heart,
  List,
  Login,
  Logout,
  MessageCircle,
  Search,
  Settings,
  ShoppingCart,
  Star,
  User,
  UserCircle
} from 'tabler-icons-react';
import { Link, useNavigate } from 'react-router-dom';
import CategoryMenu from 'components/ClientHeader/CategoryMenu';
import { useElementSize } from '@mantine/hooks';
import useAuthStore from 'stores/use-auth-store';
import NotifyUtils from 'utils/NotifyUtils';
import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import { EventInitiationResponse, NotificationResponse } from 'models/Notification';
import MiscUtils from 'utils/MiscUtils';
import useClientSiteStore from 'stores/use-client-site-store';

const useStyles = createStyles((theme) => ({
  header: {
    boxShadow: theme.shadows.sm,
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    marginBottom: theme.spacing.md * 2,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  iconGroup: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.md,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
    },

    '&:active': {
      color: theme.white,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[8] : theme.colors.blue[6],
    },
  },
}));

function ClientHeader() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const [openedCategoryMenu, setOpenedCategoryMenu] = useState(false);

  const { ref: refHeaderStack, width: widthHeaderStack } = useElementSize();

  const { user, resetAuthState, currentTotalCartItems } = useAuthStore();

  // Search state & function
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useNotificationEvents();

  const { newNotifications } = useClientSiteStore();

  const [disabledNotificationIndicator, setDisabledNotificationIndicator] = useState(true);

  useEffect(() => {
    if (newNotifications.length > 0) {
      setDisabledNotificationIndicator(false);
    }
  }, [newNotifications.length]);

  const handleSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && search.trim() !== '') {
      navigate('/search?q=' + search.trim());
    }
  };
  const handleBatteriesClick = () => { 
    navigate('/batteries');  
  };
  
  const handleSignoutMenu = () => {
    if (user) {
      resetAuthState();
      NotifyUtils.simpleSuccess('Successfully logged out');
    }
  };

  const handleNotificationButton = () => {
    if (user) {
      setDisabledNotificationIndicator(true);
      navigate('/user/notification');
    } else {
      NotifyUtils.simple('Please log in to use this feature');
    }
  };

  return (
    <header className={classes.header}>
      <Container size="xl">
        <Stack spacing={0} ref={refHeaderStack}>
          <Group position="apart" py={theme.spacing.md}>
            <Center component={Link} to="/">
              <ElectroLogo/>
            </Center>
            <TextInput
              placeholder="What are you looking for..."
              variant="filled"
              size="md"
              radius="md"
              icon={<Search size={16}/>}
              sx={{ width: 600 }}
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              onKeyDown={handleSearchInput}
            />
            <Group spacing="xs">
              {user && (
                <>
                  <Tooltip label="Cart" position="bottom">
                    <UnstyledButton component={Link} to="/cart">
                      <Group spacing="xs" px={theme.spacing.sm} py={theme.spacing.xs} className={classes.iconGroup}>
                        <ShoppingCart strokeWidth={1}/>
                        <Text weight={500} size="sm">{currentTotalCartItems}</Text>
                      </Group>
                    </UnstyledButton>
                  </Tooltip>

                  <Tooltip label="Orders" position="bottom">
                    <UnstyledButton component={Link} to="/order">
                      <Group spacing="xs" px={theme.spacing.sm} py={theme.spacing.xs} className={classes.iconGroup}>
                        <FileBarcode strokeWidth={1}/>
                      </Group>
                    </UnstyledButton>
                  </Tooltip>
                </>
              )}

              <Tooltip label="Notifications" position="bottom">
                <UnstyledButton onClick={handleNotificationButton}>
                  <Indicator size={14} color="pink" withBorder disabled={disabledNotificationIndicator}>
                    <Group spacing="xs" px={theme.spacing.sm} py={theme.spacing.xs} className={classes.iconGroup}>
                      <Bell strokeWidth={1}/>
                    </Group>
                  </Indicator>
                </UnstyledButton>
              </Tooltip>

              <Menu
                placement="end"
                control={(
                  <Tooltip label="Account" position="bottom">
                    <UnstyledButton>
                      <Group
                        spacing="xs"
                        px={theme.spacing.sm}
                        py={theme.spacing.xs}
                        className={classes.iconGroup}
                        sx={{ color: user ? theme.colors.blue[theme.colorScheme === 'dark' ? 4 : 7] : 'inherit' }}
                      >
                        <UserCircle strokeWidth={1}/>
                      </Group>
                    </UnstyledButton>
                  </Tooltip>
                )}
              >
                {user && (
                  <>
                    <Menu.Item icon={<User size={14}/>} component={Link} to="/user">
                      Account
                    </Menu.Item>
                    <Menu.Item icon={<Settings size={14}/>} component={Link} to="/user/setting">
                      Settings
                    </Menu.Item>
                    <Menu.Item icon={<Star size={14}/>} component={Link} to="/user/review">
                      Product Reviews
                    </Menu.Item>
                    <Menu.Item icon={<Heart size={14}/>} component={Link} to="/user/wishlist">
                      Favorite Products
                    </Menu.Item>
                    <Menu.Item icon={<Award size={14}/>} component={Link} to="/user/reward">
                      Rewards
                    </Menu.Item>
                    <Menu.Item icon={<Alarm size={14}/>} component={Link} to="/user/preorder">
                      Pre-order
                    </Menu.Item>
                    <Menu.Item icon={<MessageCircle size={14}/>} component={Link} to="/user/chat">
                      Customer Support
                    </Menu.Item>
                    <Menu.Item color="pink" icon={<Logout size={14}/>} onClick={handleSignoutMenu}>
                      Logout
                    </Menu.Item>
                  </>
                )}
                {!user && (
                  <>
                    <Menu.Item icon={<Login size={14}/>} component={Link} to="/signup">
                    Login/Register
                    </Menu.Item>
                   {/* <Menu.Item icon={<Fingerprint size={14}/>} component={Link} to="/signup">
                      Register
                    </Menu.Item> */}
                  </>
                )}
              </Menu>
            </Group>
          </Group>
          <Group position="apart" mb="md">
            <Group spacing={theme.spacing.xs / 2}>
              {/* 

              <Popover
                opened={openedCategoryMenu}
                onClose={() => setOpenedCategoryMenu(false)}
                target={(
                  <Button onClick={() => setOpenedCategoryMenu((o) => !o)} leftIcon={<List size={16}/>} radius="md">
                    Product Categories
                  </Button>
                )}
                width={widthHeaderStack}
                position="bottom"
                placement="start"
                radius="md"
                shadow="md"
              >
                <CategoryMenu setOpenedCategoryMenu={setOpenedCategoryMenu}/>
              </Popover>*/}
              <Button variant="subtle" radius="md" onClick={() => handleBatteriesClick()}>
                Batteries
              </Button>
              <Button variant="subtle" color="green" radius="md">
                Trending Products
              </Button>
              <Button variant="subtle" color="pink" radius="md">
                Promotions
              </Button> 
            </Group>
            <Group spacing="xs">
              <Badge color="pink" size="xs" variant="filled">Hot</Badge>
              <Text size="sm" color="dimmed">Free shipping for orders over 1 million INR</Text>
            </Group>
          </Group>
        </Stack>
      </Container>
    </header>
  );
}

function useNotificationEvents() {
  const { user } = useAuthStore();

  const eventSourceRef = useRef<EventSource | null>(null);

  const { pushNewNotification } = useClientSiteStore();

  useQuery<EventInitiationResponse, ErrorMessage>(
    ['client-api', 'notifications/init-events', 'initNotificationEvents'],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_NOTIFICATION_INIT_EVENTS),
    {
      onSuccess: (response) => {
        const eventSource = new EventSource(`${ResourceURL.CLIENT_NOTIFICATION_EVENTS}?eventSourceUuid=${response.eventSourceUuid}`);

        eventSource.onopen = () => MiscUtils.console.log('Opening EventSource of Notifications...');

        eventSource.onerror = () => MiscUtils.console.error('Encountered error with Notifications EventSource!');

        eventSource.onmessage = (event) => {
          const notificationResponse = JSON.parse(event.data) as NotificationResponse;
          pushNewNotification(notificationResponse);
        };

        eventSourceRef.current = eventSource;
      },
      onError: () => NotifyUtils.simpleFailed('Failed to retrieve data'),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      enabled: !!user,
    }
  );

  useEffect(() => () => eventSourceRef.current?.close(), []);
}

export default React.memo(ClientHeader);
