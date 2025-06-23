import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async'; // ✅ Import HelmetProvider

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider> {/* ✅ Wrap App in HelmetProvider */}
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
