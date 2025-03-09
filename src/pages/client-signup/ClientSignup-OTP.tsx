import React, { useEffect, useState } from 'react';
import { z } from 'zod'; 
import { useForm, zodResolver } from '@mantine/form';
import { ClientCartResponse, Empty, RegistrationRequest, RegistrationResponse } from 'types';
import useTitle from 'hooks/use-title'; 
import { useMutation } from 'react-query';
import { UserOTPRequest, UserResponse } from 'models/User';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import {
  Button,
  Card,
  Container,
  Divider,
  Group, 
  Stack,
  Stepper,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from '@mantine/core';
import useAuthStore from 'stores/use-auth-store';
import { Check, MailOpened, ShieldCheck, UserCheck } from 'tabler-icons-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import MiscUtils from 'utils/MiscUtils';
import { useModals } from '@mantine/modals';

function ClientSignupOTP() {
  useTitle();

  const { user, currentSignupUserId } = useAuthStore();

  const [searchParams] = useSearchParams();

  const userId = searchParams.get('userId') || currentSignupUserId;

  const currentStep = userId ? 1 : 0; // Nếu có userId thì nhảy sang bước 2

  const [active, setActive] = useState(currentStep);

  const nextStep = () => setActive((current) => current < 1 ? current + 1 : (current === 1 ? 3 : current));

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <main>
      <Container size="xl">
        <Stack align="center" spacing={50}>
          <Title order={2}>Register Account</Title>

          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="xs"
            styles={{ root: { width: '100%', maxWidth: 800 }, content: { paddingTop: 50 } }}
          >
            <Stepper.Step
              icon={<UserCheck size={18} />}
              label="Step 1"
              description="Create Account"
              allowStepSelect={false}
            >
              <ClientSignupStepOne nextStep={nextStep} />
            </Stepper.Step>
            <Stepper.Step
              icon={<MailOpened size={18} />}
              label="Step 2"
              description="Verify OTP"
              allowStepSelect={false}
            >
              <ClientSignupStepTwo nextStep={nextStep} userId={Number(userId) || null} />
            </Stepper.Step>
            <Stepper.Step
              icon={<ShieldCheck size={18} />}
              label="Step 3"
              description="Registration Successful"
              allowStepSelect={false}
            />
            <Stepper.Completed>
              <ClientSignupStepThree />
            </Stepper.Completed>
          </Stepper>
        </Stack>
      </Container>
    </main>

  );
}

function ClientSignupStepOne({ nextStep }: { nextStep: () => void }) {
  const { updateCurrentSignupUserId } = useAuthStore();

  const initialFormValues = { 
    phone: '', 
    status: '2', // Không dùng
    roles: [] as string[], // Không dùng
  };
  const phoneNumberRegex = /^(?:\+?\d{1,3})?[\s\-()]?(\d{1,4})[\s\-()]?(\d{1,4})[\s\-()]?(\d{1,4})$/;

  const formSchema = z.object({ 
    phone: z.string({ invalid_type_error: 'Please do not leave this field empty' })
      .regex(phoneNumberRegex, { message: 'Enter a valid phone number format' }), 
    status: z.string(),
    roles: z.array(z.string()),
  });  

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });


  const registerUserApi = useMutation<RegistrationResponse, ErrorMessage, UserOTPRequest>(
    (requestBody) => FetchUtils.post(ResourceURL.CLIENT_REGISTRATION, requestBody),
    {
      onSuccess: (registrationResponse) => {
        NotifyUtils.simpleSuccess('Account created successfully');
        updateCurrentSignupUserId(registrationResponse.userId);
        nextStep();
      },
      onError: () => NotifyUtils.simpleFailed('Account creation failed'),
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: UserOTPRequest = { 
      phone: formValues.phone, 
      status: Number(formValues.status),
      roles: [],
    };

    registerUserApi.mutate(requestBody);
  });

  return (
    <Card withBorder shadow="md" p={30} radius="md" sx={{ maxWidth: 500, margin: 'auto' }}>
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
            disabled={MiscUtils.isEquals(initialFormValues, form.values) || registerUserApi.isLoading}
          >
            Register
          </Button>
        </Stack>
      </form>
    </Card>
  );
}

function ClientSignupStepTwo({ nextStep, userId }: { nextStep: () => void, userId: number | null }) {
  const theme = useMantineTheme();
  const modals = useModals();
  const [openedAlert, setOpenedAlert] = useState(false);
  
  const {
    user,
    updateJwtToken,
    updateUser,
    resetAuthState,
    updateCurrentCartId,
    updateCurrentTotalCartItems,
  } = useAuthStore();

  const { updateCurrentSignupUserId } = useAuthStore();

  const initialFormValues = {
    token: '',
  };

  const formSchema = z.object({
    token: z.string({ invalid_type_error: 'Please do not leave this field empty.' }),
  });

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });
  const userInfoApi = useMutation<UserResponse, ErrorMessage>(
    _ => FetchUtils.getWithToken(ResourceURL.CLIENT_USER_INFO)
  );

  const cartApi = useMutation<ClientCartResponse | Empty, ErrorMessage>(
    _ => FetchUtils.getWithToken(ResourceURL.CLIENT_CART)
  );

  const confirmRegistrationApi = useMutation<void, ErrorMessage, RegistrationRequest>(
    (requestBody) => FetchUtils.post(ResourceURL.CLIENT_REGISTRATION_CONFIRM, requestBody),
    {
      onSuccess: async (jwtResponse) => {
        try {
          console.log('token is '+jwtResponse.token);
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
        NotifyUtils.simpleSuccess('Account verification successful.');
        updateCurrentSignupUserId(null);
        nextStep();
      },
      onError: () => NotifyUtils.simpleFailed('Account verification failed.'),
    }
  );

  const resendRegistrationTokenApi = useMutation<Empty, ErrorMessage, { userId: number }>(
    (request) => FetchUtils.get(ResourceURL.CLIENT_REGISTRATION_RESEND_TOKEN(request.userId)),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Verification code resent successfully');
        modals.closeAll();
      },
      onError: () => NotifyUtils.simpleFailed('Failed to resend verification code'),    
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    if (userId) {
      const requestBody: RegistrationRequest = {
        userId: userId,
        token: formValues.token,
      };

      confirmRegistrationApi.mutate(requestBody);
    }
  });

  const handleResendTokenButton = () => {
    if (userId) {
      modals.openConfirmModal({
        size: 'xs',
        overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        overlayOpacity: 0.55,
        overlayBlur: 3,
        closeOnClickOutside: false,
        closeOnConfirm: false,
        title: <strong>Resend Verification Code</strong>,
        children: <Text size="sm">Do you want to resend the verification code to the previously entered email?</Text>,
        labels: {
          cancel: 'Close',
          confirm: 'Send',
        },
        confirmProps: { color: 'blue', disabled: resendRegistrationTokenApi.isLoading },
        onConfirm: () => resendRegistrationTokenApi.mutate({ userId: userId }),
      });    
    }
  };

  const handleResendTokenWithNewEmailButton = () => {
    modals.openModal({
      size: 'md',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Change Email</strong>,
      children: <ChangeEmailModal userId={userId} />,
    });
  };
  return (
    <Card withBorder shadow="md" p={30} radius="md" sx={{ width: 500, margin: 'auto' }}>
      <Stack>
        <form onSubmit={handleFormSubmit}>
          <Stack>
            <TextInput
              required
              radius="md"
              label="Verification Code"
              placeholder="Enter the verification code sent to your email"
              {...form.getInputProps('token')}
            />
            <Button
              radius="md"
              type="submit"
              disabled={MiscUtils.isEquals(initialFormValues, form.values) || confirmRegistrationApi.isLoading}
            >
              Confirm
            </Button>
          </Stack>
        </form>

        <Divider label="or" labelPosition="center" />

        <Button radius="md" variant="outline" onClick={handleResendTokenButton}>
          Resend verification code
        </Button>

        <Button radius="md" variant="outline" onClick={handleResendTokenWithNewEmailButton}>
          Resend verification code to a new email
        </Button>
      </Stack>
    </Card>
  );
}

function ClientSignupStepThree() {
  const theme = useMantineTheme();

  return (
    <Stack align="center" sx={{ alignItems: 'center', color: theme.colors.teal[6] }}>
      <Check size={100} strokeWidth={1}/>
      <Text weight={500}>Account successfully created and verified!</Text>
      <Button radius="md" size="lg" mt="xl" component={Link} to="/signin">
        Sign In
      </Button>
    </Stack>
  );
}

function ChangeEmailModal({ userId }: { userId: number | null }) {
  const modals = useModals();

  const initialFormValues = {
    email: '',
  };

  const formSchema = z.object({
    email: z.string({ invalid_type_error: 'Please do not leave this field empty.' })
      .email({ message: 'Please enter a valid email address.' }),
  });

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const changeRegistrationEmailApi = useMutation<Empty, ErrorMessage, { userId: number, email: string }>(
    (request) => FetchUtils.put(
      ResourceURL.CLIENT_REGISTRATION_CHANGE_EMAIL(request.userId),
      {},
      { email: request.email }
    ),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Email changed successfully, and a new verification code has been sent.');
        modals.closeAll();
      },
      onError: () => NotifyUtils.simpleFailed('Email change was unsuccessful.'),    
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    if (userId) {
      changeRegistrationEmailApi.mutate({ userId: userId, email: formValues.email });
    }
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack>
        <TextInput
          data-autofocus
          required
          radius="md"
          label="New Email"
          placeholder="Enter new email"
          {...form.getInputProps('email')}
        />
        <Group position="right">
          <Button radius="md" variant="default" onClick={modals.closeAll}>
            Close
          </Button>
          <Button
            radius="md"
            type="submit"
            disabled={MiscUtils.isEquals(initialFormValues, form.values) || changeRegistrationEmailApi.isLoading}
          >
            Many thanks
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default ClientSignupOTP;
