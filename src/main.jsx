import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router'; // ✅ router-dom হওয়া উচিত
import { router } from './Routes/Routes';
import AuthProvider from './AuthProvider/AuthProvider';

//  React Query (TanStack Query) import করো
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { HelmetProvider } from 'react-helmet-async';
const stripePromise=loadStripe(import.meta.env.VITE_PAYMENT_KEY);
// ✅ Query Client তৈরি করো
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <HelmetProvider>
  <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Elements দিয়ে RouterProvider wrap করো */}
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </AuthProvider>
    </QueryClientProvider>
 </HelmetProvider>
  </StrictMode>
);
