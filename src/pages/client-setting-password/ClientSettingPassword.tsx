import React from 'react';
import useTitle from 'hooks/use-title';
import { z } from 'zod';
import MessageUtils from 'utils/MessageUtils';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import { ClientPasswordSettingUserRequest } from 'types';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { Button, Card, Container, Grid, PasswordInput, Stack, Title } from '@mantine/core';
import { ClientUserNavbar } from 'components';
import MiscUtils from 'utils/MiscUtils';

const formSchema = z.object({
  oldPassword: z.string({ invalid_type_error: 'Please do not leave this field empty.' })
    .min(1, MessageUtils.min('Password', 1)),
  newPassword: z.string({ invalid_type_error: 'Please do not leave this field empty.' })
    .min(1, MessageUtils.min('Password', 1)),
  newPasswordAgain: z.string({ invalid_type_error: 'Please do not leave this field empty.' })
    .min(1, MessageUtils.min('Password', 1)),
});

function ClientSettingPassword() {
  useTitle();

  const initialFormValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: '',
  };

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const updatePasswordSettingApi = useMutation<never, ErrorMessage, ClientPasswordSettingUserRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_USER_PASSWORD_SETTING, requestBody),
    {
      onSuccess: () => NotifyUtils.simpleSuccess('Update Successful'),
      onError: () => NotifyUtils.simpleFailed('Update Unsuccessful'),
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    if (formValues.newPassword !== formValues.newPasswordAgain) {
      form.setFieldError('newPasswordAgain', 'Passwords do not match');
    } else {
      const requestBody: ClientPasswordSettingUserRequest = {
        oldPassword: formValues.oldPassword,
        newPassword: formValues.newPassword,
      };

      updatePasswordSettingApi.mutate(requestBody);
    }
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
                  Change password
                </Title>
                <Grid>
                  <Grid.Col lg={6}>
                    <form onSubmit={handleFormSubmit}>
                      <Stack>
                        <PasswordInput
                          required
                          radius="md"
                          label="Current Password"
                          placeholder="Enter current password"
                          {...form.getInputProps('oldPassword')}
                        />
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

export default ClientSettingPassword;
