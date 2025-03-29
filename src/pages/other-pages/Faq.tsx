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

function Faq() {
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
                  Faq
                </Text>
              </Breadcrumbs> 
              <Group spacing="xs" sx={{ alignItems: 'baseline' }}>
                <Title order={2}>Frequently Asked Questions
                </Title> 
              </Group>
            </Stack>
          </Card>
          <Accordion>
            <Accordion.Item label="How does a battery work?">
              A battery stores energy in a chemical form that can be released on demand as electricity. This electrical power is used by the vehicle&apos;s ignition system for cranking the engine. The vehicle&apos;s battery may also power the lights and other electrical accessories. In case the alternator belt fails, the battery might also need to power the vehicle&apos;s entire electrical system for a short period of time.
            </Accordion.Item>

            <Accordion.Item label="What should I consider when buying a battery?">
              SIZE: What are the dimensions of your original battery?
              POWER: What are the Cold Cranking Amps required to power your vehicle?
              WARRANTY: Automotive batteries are backed by a warranty package. Choose one that is right for your vehicle&apos;s needs.

            </Accordion.Item>

            <Accordion.Item label="When I am replacing my battery or cleaning the terminals, why is it important to remove the ground wire first?">
              Before you start, always check the type of grounding system the vehicle has. If you remove the positive connector first in a negative ground system, you risk the chance of creating a spark. That could happen if the metal tool you&apos;re using to remove the positive terminal connector comes in contact with any piece of metal on the car. If you are working near the battery when this occurs, it might create an ignition source that could cause the battery to explode. It is extremely important to remove the ground source first.
            </Accordion.Item>
          </Accordion>

        </Stack>
      </Container>
    </main>
  );
}


export default Faq;
