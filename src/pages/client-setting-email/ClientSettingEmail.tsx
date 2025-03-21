import React from 'react';
import { z } from 'zod';
import useTitle from 'hooks/use-title';
import useAuthStore from 'stores/use-auth-store';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from 'react-query';
import { UserResponse } from 'models/User';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import { ClientEmailSettingUserRequest } from 'types';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { Button, Card, Container, Grid, Stack, TextInput, Title } from '@mantine/core';
import { ClientUserNavbar } from 'components';
import MiscUtils from 'utils/MiscUtils';

const formSchema = z.object({
  email: z.string({ invalid_type_error: 'Please do not leave this field empty.' })
    .email({ message: 'Enter a valid email address' }),
});

function ClientSettingEmail() {
  useTitle();

  const { user, updateUser } = useAuthStore();

  const initialFormValues = {
    email: user?.email as string,
  };

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const updatePhoneSettingApi = useMutation<UserResponse, ErrorMessage, ClientEmailSettingUserRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_USER_EMAIL_SETTING, requestBody),
    {
      onSuccess: (userResponse) => {
        updateUser(userResponse);
        NotifyUtils.simpleSuccess('Update Successful');
      },
      onError: () => NotifyUtils.simpleFailed('Update Unsuccessful'),
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: ClientEmailSettingUserRequest = {
      email: formValues.email,
    };

    updatePhoneSettingApi.mutate(requestBody);
  });

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
                  Update email
                </Title>
                <Grid>
                  <Grid.Col lg={6}>
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
                          disabled={MiscUtils.isEquals(initialFormValues, form.values)}
                        >
                          Update
                        </Button>
                      </Stack>
                    </form>
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

export default ClientSettingEmail;
