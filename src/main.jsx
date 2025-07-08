import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router'; // ✅ router-dom হওয়া উচিত
import { router } from './Routes/Routes';
import AuthProvider from './AuthProvider/AuthProvider';

// ✅ React Query (TanStack Query) import করো
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ✅ Query Client তৈরি করো
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ QueryClientProvider দিয়ে পুরো app wrap করো */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
