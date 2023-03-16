import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  useLocation,
  useParams,
  useMatch,
} from 'react-router-dom';
import { CriiptoVerifyProvider } from '@criipto/verify-react';
import App from './App';
import './index.css';

function CriiptoVerifyProviderWrapper() {
  // const location = useLocation();
  // const search = useMemo(
  //   () => new URLSearchParams(location.search),
  //   [location]
  // );

  // const environment = search.get('environment') ?? 'test';

  const { environment } = useParams();
  console.log('environment from CriiptoVerifyProviderWrapper', environment);
  const match = useMatch('/login/:environment');
  const defaultEnvironment = match ? match.params.environment : 'test';

  const domain =
    defaultEnvironment === 'test'
      ? 'natalia-test.criipto.id'
      : 'demos-test.criipto.id';

  return (
    <CriiptoVerifyProvider
      domain={domain}
      clientID="urn:my:application:identifier:2542"
      redirectUri="http://localhost:3000/dashboard"
      sessionStore={window.sessionStorage}
    >
      <App />
    </CriiptoVerifyProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CriiptoVerifyProviderWrapper />
    </BrowserRouter>
  </React.StrictMode>
);

// PROD: demos-test.criipto.id / urn:demos:cool-energy-react
// TEST: demos.criipto.id / urn:demos:cool-energy-react
// natalia-test.criipto.id urn:my:application:identifier:2542
