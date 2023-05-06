import { ChecklistRange, Layout, Header, Navigation, Footer } from './components';
import { Checklist } from './models';
import * as dlrrc from './data/dlrrc.min.json';

export function App() {
  const checklist: Checklist = dlrrc;
  return (
    <Layout
      header={<Header/>}
      navigation={<Navigation/>}
      main={<ChecklistRange totalScore={checklist.totalScore} parts={checklist.parts} />}
      footer={<Footer/>}
    />
  );
}
