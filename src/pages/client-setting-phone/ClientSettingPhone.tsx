import React from 'react';
import useTitle from 'hooks/use-title';
import { Button, Card, Container, Grid, Stack, TextInput, Title } from '@mantine/core';
import { ClientUserNavbar } from 'components';
import MiscUtils from 'utils/MiscUtils';
import { z } from 'zod';
import useAuthStore from 'stores/use-auth-store';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { UserResponse } from 'models/User';
import { ClientPhoneSettingUserRequest } from 'types';

const formSchema = z.object({
  // Source: https://fozg.net/blog/validate-vietnamese-phone-number
  phone: z.string({ invalid_type_error: 'Please do not leave this field empty.' })
    .regex(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, { message: 'Enter a valid phone number' }),
});

function ClientSettingPhone() {
  useTitle();

  const { user, updateUser } = useAuthStore();

  const initialFormValues = {
    phone: user?.phone as string,
  };

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const updatePhoneSettingApi = useMutation<UserResponse, ErrorMessage, ClientPhoneSettingUserRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_USER_PHONE_SETTING, requestBody),
    {
      onSuccess: (userResponse) => {
        updateUser(userResponse);
        NotifyUtils.simpleSuccess('Update Successful');
      },
      onError: () => NotifyUtils.simpleFailed('Update Unsuccessful'),
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: ClientPhoneSettingUserRequest = {
      phone: formValues.phone,
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
                 Update phone number
                </Title>
                <Grid>
                  <Grid.Col lg={6}>
                    <form onSubmit={handleFormSubmit}>
                      <Stack>
                        <TextInput
                          required
                          radius="md"
                          label="Phone Number"
                          placeholder="Enter your phone number"
                          {...form.getInputProps('phone')}
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

export default ClientSettingPhone;
