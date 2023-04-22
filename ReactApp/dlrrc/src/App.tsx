import { Stack } from '@fluentui/react';
import { ChecklistRange, Layout, Header, Footer } from './components';
import { Checklist } from './models';
import * as dlrrc from './data/dlrrc.min.json';

export function App() {
  const checklist: Checklist = dlrrc;
  return (
    <Layout
      header={<Header/>}
      main={
        <Stack>
          <ChecklistRange
            totalScore={checklist.totalScore}
            parts={checklist.parts}
          />
        </Stack>
      }
      footer={<Footer/>}
    />
  );
}
