import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Empty, ResetPasswordRequest } from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import MessageUtils from 'utils/MessageUtils';
import { Button, Card, Container, PasswordInput, Stack, Title } from '@mantine/core';
import MiscUtils from 'utils/MiscUtils';

function ClientChangePassword() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !email) {
      navigate('/');
    }
  }, [email, navigate, token]);

  const formSchema = z.object({
    newPassword: z.string({ invalid_type_error: 'Please do not leave this field empty.' })
      .min(1, MessageUtils.min('Password', 1)),
    newPasswordAgain: z.string({ invalid_type_error: 'Please do not leave this field empty.' })
      .min(1, MessageUtils.min('Password', 1)),
  });

  const initialFormValues = {
    newPassword: '',
    newPasswordAgain: '',
  };

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const resetPasswordApi = useMutation<Empty, ErrorMessage, ResetPasswordRequest>(
    (requestBody) => FetchUtils.put(ResourceURL.CLIENT_RESET_PASSWORD, requestBody),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Change password mới Successful');
      },
      onError: () => NotifyUtils.simpleFailed('Change password Unsuccessful'),
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    if (formValues.newPassword !== formValues.newPasswordAgain) {
      form.setFieldError('newPasswordAgain', 'Passwords do not match');
    } else if (token && email) {
      const requestBody: ResetPasswordRequest = {
        token: token,
        email: email,
        password: formValues.newPassword,
      };

      resetPasswordApi.mutate(requestBody);
    }
  });

  return (
    <main>
      <Container size="xl">
        <Stack align="center">
          <Title order={2}>Change password</Title>

          <Card withBorder shadow="md" mt={20} p={30} radius="md" sx={{ width: '100%', maxWidth: 400 }}>
            <form onSubmit={handleFormSubmit}>
              <Stack>
                <PasswordInput
                  required
                  radius="md"
                  label="New Password"
                  placeholder="Enter new password"
                  {...form.getInputProps('newPassword')}
                />
                <PasswordInput
                  required
                  radius="md"
                  label="Confirm New Password"
                  placeholder="Re-enter new password"
                  {...form.getInputProps('newPasswordAgain')}
                />
                <Button
                  radius="md"
                  type="submit"
                  disabled={MiscUtils.isEquals(initialFormValues, form.values) || resetPasswordApi.isLoading}
                >
                  Change password
                </Button>
              </Stack>
            </form>
          </Card>
        </Stack>
      </Container>
    </main>
  );
}

export default ClientChangePassword;
