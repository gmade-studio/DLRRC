import { Main, Layout, Header, Navigation, Footer } from './components';

export function App() {
  return (
    <Layout
      header={<Header/>}
      navigation={<Navigation/>}
      main={<Main/>}
      footer={<Footer/>}
    />
  );
}
