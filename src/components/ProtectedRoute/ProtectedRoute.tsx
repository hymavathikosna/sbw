import { Anchor, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import useAuthStore from 'stores/use-auth-store';
import { Link } from 'react-router-dom';

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <main>
        <Container size="xl">
          <Stack spacing="xl" sx={{ textAlign: 'center' }}>
            <Text
              weight={700}
              sx={theme => ({
                fontSize: 120,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
              })}
            >
              401
            </Text>
            <Title>Please <Anchor component={Link} to="/signin" inherit>log in</Anchor> to access</Title>
            <Group position="center">
              <Button component={Link} to="/" variant="subtle" size="md">
                Return to Home
              </Button>
            </Group>
          </Stack>
        </Container>
      </main>
    );
  }

  return children;
}

export default ProtectedRoute;
