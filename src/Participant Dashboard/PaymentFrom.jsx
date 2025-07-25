import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../AuthProvider/UseAuth';
import useAxiosSecure from '../AuthProvider/UseAxios';
import img1 from '../assets/image/img1.jpg'  
import { Helmet } from 'react-helmet-async';


const PaymentFrom = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const { campId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Registered Camps fetch 
  const { isLoading, data: joinedCamps = [] } = useQuery({
    queryKey: ['joinedCamps', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/joine/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  // campId 
  const parcelInfo = joinedCamps.find(
    (camp) => camp._id.toString() === campId || camp.campId === campId
  );

  if (!parcelInfo) return <p>Camp not found in your registrations</p>;

  const amountBDT = parcelInfo.fees || 0;
let amountUSDcents = Math.round((amountBDT / 110) * 100);

if (amountUSDcents < 50) {
  console.warn('Amount is less than minimum allowed by Stripe, setting to 50 cents');
  amountUSDcents,
  campId
}


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (paymentError) {
      setError(paymentError.message);
      return;
    } else {
      setError('');
      console.log(' Payment method created:', paymentMethod);
    }

  
   const res = await axiosSecure.post('/create-payment-intent', {
    amount: amountBDT,
  campId,
});

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user.displayName || 'Anonymous',
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment successful:', result);

        const paymentsData = {
          campId,
          email: user.email,
          amount: amountBDT,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types?.[0],
          date: new Date().toISOString(),
          payment_status: 'Paid',
        };

        console.log('Sending payment data:', paymentsData);

        const paymentsRes = await axiosSecure.post('/payments', paymentsData);

        if (paymentsRes.data?.insertedId) {
          Swal.fire({
            title: 'Payment Successful!',
            html: `
              <p>Your payment of <strong>৳${amountBDT}</strong> has been completed.</p>
              <p><strong>Transaction ID:</strong> ${result.paymentIntent.id}</p>
            `,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
           navigate('/participent/paymenthis'); 
          });
        } else {
          Swal.fire('Payment successful, but failed to record payment.');
        }
      }
    }
  };

  return (
    <div 
    style={{ 
    backgroundImage: `url(${img1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

  }}
  className="p-6 rounded shadow min-h-screen"
    >

       <Helmet>
                        <title>Organizer From| MedCampMS</title>
                        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
                      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mt-30 mx-auto h-40 bg-white p-6 rounded shadow space-y-4"
      >
        <CardElement className="border rounded p-2" />
        <button type="submit" disabled={!stripe} className="btn btn-primary w-full">
          Pay ৳{amountBDT} (BDT)
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentFrom;
