import {
  Accordion,
  Anchor,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Chip,
  Chips,
  Container,
  Grid,
  Group,
  Radio,
  RadioGroup,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from '@mantine/core'; 
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function ContactUs() {
  const theme = useMantineTheme(); 
  
  return (
    <main>
      <Container size="xl">
        <Stack spacing={theme.spacing.xl * 2}>

          <Card radius="md" shadow="sm" p="lg">
            <Stack>
              <Breadcrumbs>
                <Anchor component={Link} to="/">
                  Home
                </Anchor> 
                <Text color="dimmed">
                  ContactUs
                </Text>
              </Breadcrumbs> 
              <Group spacing="xs" sx={{ alignItems: 'baseline' }}>
                <Title order={2}>Find Our Offices
                </Title> 
              </Group>
            </Stack>
          </Card>
          <p>You can contact us at:</p>        
          <div>
            <p>Corporate Office</p>
            <p><b>Amara Raja Energy &amp; Mobility Limited</b><br/>
            TERMINAL A<br/>
            1-18/1/AMR/NR, Nanakramguda Gachilbowli, Hyderabad - 500032. India.<br/>
              <span >1800 425 4848 (Toll Free Number, India)</span> <span ><a href="mailto:mktgabd@amararaja.com">mktgabd@amararaja.com</a></span></p>
          </div>
        </Stack>
      </Container>
    </main>
  );
}


export default ContactUs;
