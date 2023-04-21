import ChecklistRange from './components/ChecklistRange';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import { Stack, Text } from '@fluentui/react';
import { Checklist } from './components/types';
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
