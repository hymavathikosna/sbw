import React from 'react';
import { Button, Card, Container, Grid, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import useTitle from 'hooks/use-title';
import { ClientUserNavbar } from 'components';
import { Lock, Mail, Phone, User } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

function ClientSetting() {
  useTitle();

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
                  Settings
                </Title>

                <Group position="apart">
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <User strokeWidth={1.5}/>
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text weight={500}>Personal Information</Text>
                      <Text color="dimmed" size="sm">Update full name, gender, address...</Text>
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

                <Group position="apart">
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <Phone strokeWidth={1.5}/>
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text weight={500}>Phone Number</Text>
                      <Text color="dimmed" size="sm">Change the current phone number to a new one</Text>
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
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <Mail strokeWidth={1.5}/>
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text weight={500}>Email</Text>
                      <Text color="dimmed" size="sm">Change the current email to a new one</Text>
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

                <Group position="apart">
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <Lock strokeWidth={1.5}/>
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text weight={500}>Password</Text>
                      <Text color="dimmed" size="sm">Change the current password</Text>
                    </Stack>
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
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientSetting;
