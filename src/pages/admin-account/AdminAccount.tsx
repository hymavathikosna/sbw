import React from 'react';
import { Avatar, Badge, Divider, Group, Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { Home, Mail, Mars, Phone, Venus } from 'tabler-icons-react';
import useAdminAuthStore from 'stores/use-admin-auth-store';

function AdminAccount() {
  const { user } = useAdminAuthStore();

  return (
    <Stack>
      <Title order={3}>Account Information</Title>

      <Paper shadow="xs" p="lg" sx={{ maxWidth: 500 }}>
        <Stack>
          <Text size="lg" color="dimmed" weight={500}>
            Personal Information
          </Text>

          <Group>
            <Avatar color="cyan" size="lg" radius="md">{user?.fullname.charAt(0)}</Avatar>
            <Stack spacing={0}>
              <Text weight={500}>{user?.fullname}</Text>
              <Text color="dimmed">@{user?.username}</Text>
            </Stack>
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
                {[user?.address.line, user?.address.ward?.name, user?.address.district?.name, user?.address.province?.name]
                  .filter(Boolean)
                  .join(', ')}
              </Text>
            </Stack>
          </Group>

          <Text size="lg" color="dimmed" weight={500}>
            Phone number and Email
          </Text>

          <Group spacing="sm">
            <ThemeIcon radius="xl" size="lg" variant="light">
              <Phone size={20} strokeWidth={1.5}/>
            </ThemeIcon>
            <Stack spacing={0}>
              <Text weight={500}>Phone number</Text>
              <Text>{user?.phone}</Text>
            </Stack>
          </Group>

          <Group spacing="sm">
            <ThemeIcon radius="xl" size="lg" variant="light">
              <Mail size={20} strokeWidth={1.5}/>
            </ThemeIcon>
            <Stack spacing={0}>
              <Text weight={500}>Email</Text>
              <Text>{user?.email}</Text>
            </Stack>
          </Group>

          <Text size="lg" color="dimmed" weight={500}>
            User rights
          </Text>

          <Group spacing="xs">
            {user?.roles.map(role => <Badge key={role.id} radius="sm">{role.name}</Badge>)}
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default AdminAccount;
