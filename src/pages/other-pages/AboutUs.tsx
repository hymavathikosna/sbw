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

function AboutUs() {
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
                  AboutUs
                </Text>
              </Breadcrumbs> 
              <Group spacing="xs" sx={{ alignItems: 'baseline' }}>
                <Title order={2}>Frequently Asked Questions
                </Title> 
              </Group>
            </Stack>
          </Card>
          Amaron was launched on 9th January, 2000 with the introduction of our range of four-wheeler batteries. Since day one, we’ve enjoyed a high equity among consumers and the trade alike. Primarily because we have continued to deliver far beyond people’s expectations and stood true to our brand promise of really, really long lasting batteries. Over years of our constant brand building efforts, people have come to accept and assume an image that is us – An aspirational, youthful, powerful, technologically advanced, and a highly innovative brand. These are attributes that makes us extremely proud. Our consistently positive brand experience has helped people develop a mix of rational and emotional benefits of their own. We deliver a product that is the most powerful in its class and has the longest battery life. In return, an Amaron owner feels part of a highly aspirational brand.
        </Stack>
      </Container>
    </main>
  );
}


export default AboutUs;
