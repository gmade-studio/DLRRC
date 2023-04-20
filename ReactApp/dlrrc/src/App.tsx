import ChecklistRange from './components/ChecklistRange';
import Layout from './components/Layout';
import { Stack, Text } from '@fluentui/react';
import { Checklist } from './components/types';
import * as dlrrc from './data/dlrrc.min.json';

export function App() {
  const checklist: Checklist = dlrrc;
  const header = (
    <Text variant="xLarge">Gmade Studio | DLRRC: Deep Learning Radiomics Reproducibility Checklist</Text>
  );
  const content = (
    <Stack>
      <ChecklistRange
        totalScore={checklist.totalScore}
        parts={checklist.parts}
      />
    </Stack>
  );
  const aside = (
    <Stack>
      <Text></Text>
    </Stack>
  );
  const footer = (
    <Text>Powered by Gmade Studio</Text>
  );
  return (
    <Layout
      header={header}
      content={content}
      aside={aside}
      footer={footer}
    />
  );
}
