import * as ReactDOM from 'react-dom/client';

import { StrictMode } from 'react';
import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// root.render(<App />);
