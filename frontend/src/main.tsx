import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SquidContextProvider
    options={{
      appId: '44vgaem7tpwqndu1yw',
      region: 'us-east-1.aws', // example: 'us-east-1.aws'
      environmentId: 'prod', // choose one of 'dev' or 'prod'
      squidDeveloperId: 'pvtmwtlsa49ao8py3a',
    }}
  >
    <App />
  </SquidContextProvider>
);