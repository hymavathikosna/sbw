import React, { useEffect, useState } from 'react';
import {
  Alert,
  Anchor,
  Box,
  Button,
  Card,
  Container,
  createStyles,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Transition
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import useTitle from 'hooks/use-title';
import { z } from 'zod';
import MessageUtils from 'utils/MessageUtils';
import { useForm, zodResolver } from '@mantine/form';
import { JwtResponse, LoginOTPRequest, LoginRequest } from 'models/Authentication';
import { useMutation } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import useAuthStore from 'stores/use-auth-store';
import { UserResponse } from 'models/User';
import { AlertCircle } from 'tabler-icons-react';
import { ClientCartResponse, Empty } from 'types';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 600,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1487875961445-47a00398c267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)',
    backgroundPosition: 'bottom',

    [theme.fn.smallerThan('sm')]: {
      backgroundImage: 'unset',
    },
  },

  form: {
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
    minHeight: 600,
    maxWidth: 450,
    paddingTop: 80,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      borderRight: 'none',
    },
  },
}));

const initialFormValues = {
  phone: '',
  password: '',
};

const formSchema = z.object({
  phone: z.string({ invalid_type_error: 'Please do not leave this field empty.' })
    .min(2, MessageUtils.min('Tên tài khoản', 2)),
  password: z.string({ invalid_type_error: 'Please do not leave this field empty.' })
    .min(1, MessageUtils.min('Password', 1)),
});

function ClientSigninOTP() {
  const { classes } = useStyles();

  useTitle();

  const {
    user,
    updateJwtToken,
    updateUser,
    resetAuthState,
    updateCurrentCartId,
    updateCurrentTotalCartItems,
  } = useAuthStore();

  const [counter, setCounter] = useState(3);
  const [openedAlert, setOpenedAlert] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const loginApi = useMutation<JwtResponse, ErrorMessage, LoginRequest>(
    (requestBody) => FetchUtils.post(ResourceURL.LOGIN, requestBody)
  );

  const userInfoApi = useMutation<UserResponse, ErrorMessage>(
    _ => FetchUtils.getWithToken(ResourceURL.CLIENT_USER_INFO)
  );

  const cartApi = useMutation<ClientCartResponse | Empty, ErrorMessage>(
    _ => FetchUtils.getWithToken(ResourceURL.CLIENT_CART)
  );

  useEffect(() => {
    if (openedAlert && user && counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }

    if (counter === 0) {
      navigate('/');
    }
  }, [counter, navigate, openedAlert, user]);

  const handleFormSubmit = form.onSubmit(async (formValues) => {
    if (!user) {
      const loginRequest: LoginOTPRequest = {
        phone: formValues.phone,
      };

      try {
        const jwtResponse = await loginApi.mutateAsync(loginRequest);
        updateJwtToken(jwtResponse.token);

        const userResponse = await userInfoApi.mutateAsync();
        updateUser(userResponse);

        const cartResponse = await cartApi.mutateAsync();
        // Reference: https://stackoverflow.com/a/136411
        if (Object.hasOwn(cartResponse, 'cartId')) {
          updateCurrentCartId(cartResponse.cartId);
          updateCurrentTotalCartItems(cartResponse.cartItems.length);
        } else {
          updateCurrentCartId(null);
          updateCurrentTotalCartItems(0);
        }

        NotifyUtils.simpleSuccess('Login successful');
        setOpenedAlert(true);
      } catch (e) {
        resetAuthState();
        NotifyUtils.simpleFailed('Login failed');
      }        
    }
  });

  return (
    <main>
      <Container size="xl">
        <Transition mounted={openedAlert} transition="fade" duration={500} timingFunction="ease">
          {(styles) => (
            <Alert
              style={styles}
              icon={<AlertCircle size={16} />}
              title="You have logged in successfully!"
              color="teal"
              radius="md"
              mb="xl"
            >
              Returning to the homepage in {counter} seconds...
            </Alert>
          )}
        </Transition>
        <Card className={classes.wrapper} radius="md" shadow="sm" p={0}>
          <Card className={classes.form} radius={0} p={30}>
            <Title order={2} align="center" mt="md" mb={50}>
              Log in
            </Title>

            <form onSubmit={handleFormSubmit}>
              <TextInput
                required
                radius="md"
                label="Phone"
                placeholder="Enter your phone"
                size="md"
                disabled={!!user}
                {...form.getInputProps('phone')}
              />   
              <Button type="submit" fullWidth mt="xl" size="md" disabled={!!user} radius="md">
                Log in
              </Button>  
            </form>
          </Card>
        </Card>
      </Container>
    </main>
  );
}

export default ClientSigninOTP;
