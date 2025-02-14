import React from 'react';
import { Box, Button, Container, Paper, PasswordInput, Stack, TextInput, useMantineTheme } from '@mantine/core';
import { ElectroLogo } from 'components';
import { z } from 'zod';
import MessageUtils from 'utils/MessageUtils';
import useTitle from 'hooks/use-title';
import useAdminAuthStore from 'stores/use-admin-auth-store';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from 'react-query';
import { JwtResponse, LoginRequest } from 'models/Authentication';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import { UserResponse } from 'models/User';
import NotifyUtils from 'utils/NotifyUtils';
import { useNavigate } from 'react-router-dom';

const initialFormValues = {
  username: '',
  password: '',
};

const formSchema = z.object({
  username: z.string({ invalid_type_error: 'Please do not leave empty' })
    .min(2, MessageUtils.min('Username', 2)),
  password: z.string({ invalid_type_error: 'Please do not leave empty' })
    .min(1, MessageUtils.min('Password', 1)),
});

function AdminSignin() {
  useTitle('Admin Login');

  const theme = useMantineTheme();
  const navigate = useNavigate();

  const {
    user,
    updateJwtToken,
    updateUser,
    resetAdminAuthState,
  } = useAdminAuthStore();

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const loginApi = useMutation<JwtResponse, ErrorMessage, LoginRequest>(
    (requestBody) => FetchUtils.post(ResourceURL.LOGIN, requestBody)
  );

  const userInfoApi = useMutation<UserResponse, ErrorMessage>(
    _ => FetchUtils.getWithToken(ResourceURL.ADMIN_USER_INFO, undefined, true)
  );

  const handleFormSubmit = form.onSubmit(async (formValues) => {
    if (!user) {
      const loginRequest: LoginRequest = {
        username: formValues.username,
        password: formValues.password,
      };

      try {
        const jwtResponse = await loginApi.mutateAsync(loginRequest);
        updateJwtToken(jwtResponse.token);

        const userResponse = await userInfoApi.mutateAsync();
        updateUser(userResponse);

        navigate('/admin');

        NotifyUtils.simpleSuccess('Login successful');
      } catch (e) {
        resetAdminAuthState();
        NotifyUtils.simpleFailed('Login failed');
      }
    }
  });

  return (
    <Box sx={{ backgroundColor: theme.colors.gray[1], height: '100vh' }}>
      <Container size={375} py={40}>
        <Stack align="center">
          <ElectroLogo width={150}/>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md" sx={{ width: '100%' }}>
            <form onSubmit={handleFormSubmit}>
              <TextInput
                required
                label="Username"
                placeholder="Enter your username"
                disabled={!!user}
                {...form.getInputProps('username')}
              />
              <PasswordInput
                required
                label="Password"
                placeholder="Enter your password"
                mt="md"
                disabled={!!user}
                {...form.getInputProps('password')}
              />
              <Button type="submit" fullWidth mt="xl" disabled={!!user}>
                Login
              </Button>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export default AdminSignin;
