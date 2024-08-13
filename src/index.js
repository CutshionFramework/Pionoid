import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './global.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <Router>
      <Suspense>
        <App />
      </Suspense>
    </Router>
  </HelmetProvider>
);
