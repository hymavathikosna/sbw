import React from 'react';
import { Code, Group, Text, TextInput } from '@mantine/core';
import { Filter } from 'tabler-icons-react';

interface FilterPanelHeaderLeftProps {
  filterNameInputRef: React.MutableRefObject<HTMLInputElement | null>;
}

function FilterPanelHeaderLeft({
  filterNameInputRef,
}: FilterPanelHeaderLeftProps) {

  return (
    <Group>
      <TextInput
        placeholder="Filter ..."
        icon={<Filter size={14}/>}
        sx={{ width: 250 }}
        ref={filterNameInputRef}
      />
      <Text size="sm">Creation date: <Code color="blue">__/__/____</Code></Text>
      <Text size="sm">Modification date: <Code color="blue">__/__/____</Code></Text>
    </Group>
  );
}

export default React.memo(FilterPanelHeaderLeft);
