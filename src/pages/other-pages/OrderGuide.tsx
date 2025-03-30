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

function OrderGuide() {
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
                  OrderGuide
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
            <p><b>Srinivasa Battery World</b><br/>
            5-99/82p/A, Mnr Avenue<br/>
            G Floor, Shopno.5, Opposite to Pakwaan Grand Hotel, Main Road, Gachilbowli, Hyderabad - 500032. India.<br/>
              <span >
                +919989330693</span> <span ><a href="mailto:anilreddykosna@gmail.com">anilreddykosna@gmail.com</a></span></p>
          </div>
        </Stack>
      </Container>
    </main>
  );
}


export default OrderGuide;
