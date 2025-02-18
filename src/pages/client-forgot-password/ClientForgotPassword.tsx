import React from 'react';
import useTitle from 'hooks/use-title';
import { Button, Card, Container, Stack, Text, TextInput, Title } from '@mantine/core';
import MiscUtils from 'utils/MiscUtils';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from 'react-query';
import { Empty } from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';

function ClientForgotPassword() {
  useTitle();

  const initialFormValues = {
    email: '',
  };

  const formSchema = z.object({
    email: z.string({ invalid_type_error: 'Please do not leave this field empty.' })
      .email({ message: 'Please enter a valid email address' }),
  });

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const forgotPasswordApi = useMutation<Empty, ErrorMessage, { email: string }>(
    (request) => FetchUtils.get(ResourceURL.CLIENT_FORGOT_PASSWORD, { email: request.email }),
    {
      onSuccess: () => NotifyUtils.simpleSuccess('Password reset email sent successfully'),
      onError: () => NotifyUtils.simpleFailed('Failed to send email'),
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    forgotPasswordApi.mutate({ email: formValues.email });
  });

  return (
    <main>
      <Container size="xl">
        <Stack align="center">
          <Title order={2}>Request Password Reset</Title>

          <Text size="sm" color="dimmed">Enter your email to receive a link to reset your password</Text>

          <Card withBorder shadow="md" mt={20} p={30} radius="md" sx={{ width: '100%', maxWidth: 400 }}>
            <form onSubmit={handleFormSubmit}>
              <Stack>
                <TextInput
                  required
                  radius="md"
                  label="Email"
                  placeholder="Enter your email"
                  {...form.getInputProps('email')}
                />
                <Button
                  radius="md"
                  type="submit"
                  disabled={MiscUtils.isEquals(initialFormValues, form.values) || forgotPasswordApi.isLoading}
                >
                Request
                </Button>
              </Stack>
            </form>
          </Card>
        </Stack>
      </Container>
    </main>
  );
}

export default ClientForgotPassword;
