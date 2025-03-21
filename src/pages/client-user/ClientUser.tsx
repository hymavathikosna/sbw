import React from 'react';
import useTitle from 'hooks/use-title';
import { Avatar, Button, Card, Container, Divider, Grid, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { Home, Lock, Mail, Mars, Phone, Venus } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import useAuthStore from 'stores/use-auth-store';
import { ClientUserNavbar } from 'components';

function ClientUser() {
  useTitle();

  const { user } = useAuthStore();

  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col md={3}>
            <ClientUserNavbar/>
          </Grid.Col>

          <Grid.Col md={9}>
            <Card radius="md" shadow="sm" p="lg">
              <Stack>
                <Title order={2}>
                  Account Information
                </Title>

                <Grid gutter="lg">
                  <Grid.Col lg={6}>
                    <Stack>
                      <Text size="lg" color="dimmed" weight={500}>
                        Personal Information
                      </Text>

                      <Group position="apart">
                        <Group>
                          <Avatar color="cyan" size="lg" radius="md">{user?.fullname?.charAt(0)}</Avatar>
                          <Stack spacing={0}>
                            <Text weight={500}>{user?.fullname}</Text>
                            <Text color="dimmed">@{user?.username}</Text>
                          </Stack>
                        </Group>
                        <Button
                          component={Link}
                          to="/user/setting/personal"
                          variant="outline"
                          radius="md"
                        >
                          Update
                        </Button>
                      </Group>

                      <Divider my={3.5} variant="dotted"/>

                      <Group spacing="sm">
                        <ThemeIcon radius="xl" size="lg" variant="light">
                          {user?.gender === 'M'
                            ? <Mars size={20} strokeWidth={1.5}/>
                            : <Venus size={20} strokeWidth={1.5}/>}
                        </ThemeIcon>
                        <Stack spacing={0}>
                          <Text weight={500}>Gender</Text>
                          {user?.gender === 'M' ? 'Male' : 'Female'}
                        </Stack>
                      </Group>

                      <Group spacing="sm" sx={{ flexWrap: 'nowrap' }}>
                        <ThemeIcon radius="xl" size="lg" variant="light">
                          <Home size={20} strokeWidth={1.5}/>
                        </ThemeIcon>
                        <Stack spacing={0}>
                          <Text weight={500}>Address</Text>
                          <Text>
                            {[user?.address?.line, user?.address?.ward?.name, user?.address?.district?.name, user?.address?.province?.name]
                              .filter(Boolean)
                              .join(', ')}
                          </Text>
                        </Stack>
                      </Group>
                    </Stack>
                  </Grid.Col>

                  <Grid.Col lg={6}>
                    <Stack>
                      <Text size="lg" color="dimmed" weight={500}>
                        Phone number and Email
                      </Text>

                      <Group position="apart">
                        <Group spacing="sm">
                          <ThemeIcon radius="xl" size="lg" variant="light">
                            <Phone size={20} strokeWidth={1.5}/>
                          </ThemeIcon>
                          <Stack spacing={0}>
                            <Text weight={500}>Phone number</Text>
                            <Text>{user?.phone}</Text>
                          </Stack>
                        </Group>
                        <Button
                          component={Link}
                          to="/user/setting/phone"
                          variant="outline"
                          radius="md"
                        >
                          Update
                        </Button>
                      </Group>

                      <Group position="apart">
                        <Group spacing="sm">
                          <ThemeIcon radius="xl" size="lg" variant="light">
                            <Mail size={20} strokeWidth={1.5}/>
                          </ThemeIcon>
                          <Stack spacing={0}>
                            <Text weight={500}>Email</Text>
                            <Text>{user?.email}</Text>
                          </Stack>
                        </Group>
                        <Button
                          component={Link}
                          to="/user/setting/email"
                          variant="outline"
                          radius="md"
                        >
                          Update
                        </Button>
                      </Group>

                      <Text size="lg" color="dimmed" weight={500}>
                        Security
                      </Text>

                      <Group position="apart">
                        <Group spacing="sm">
                          <ThemeIcon radius="xl" size="lg" variant="light">
                            <Lock size={20} strokeWidth={1.5}/>
                          </ThemeIcon>
                          <Text weight={500}>Change password</Text>
                        </Group>
                        <Button
                          component={Link}
                          to="/user/setting/password"
                          variant="outline"
                          radius="md"
                        >
                          Update
                        </Button>
                      </Group>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientUser;
