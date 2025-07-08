import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import ParmentFrom from './ParmentFrom';
const stripePromise=loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payments = () => {
    return (
     <Elements stripe={stripePromise}>
<ParmentFrom>
    
</ParmentFrom>
     </Elements>
    );
};

export default Payments;