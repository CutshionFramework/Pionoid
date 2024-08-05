import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import ThemeProvider from './theme';
import './global.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <ThemeProvider>
        <Suspense>
          <App />
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  </HelmetProvider>
);
