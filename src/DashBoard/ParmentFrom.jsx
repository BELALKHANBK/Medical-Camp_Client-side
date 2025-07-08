import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router'; // ✅ Navigate এর জন্য react-router-dom
import Swal from 'sweetalert2'; // ✅ SweetAlert2 import
import { useQuery } from '@tanstack/react-query';
import useAuth from '../AuthProvider/UseAuth';
import useAxoiseSecure from '../AuthProvider/UseAxios';


const ParmentFrom = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState();
  const { campId } = useParams();
  console.log(campId)
  const navigate = useNavigate(); // ✅ Navigation setup
  const axiosSecure = useAxoiseSecure();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ['camps', campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${campId}`);
      return res.data;
    }
  });

  if (isPending) {
    return '.......loading';
  }
 console.log(parcelInfo)
  const amountBDT = parcelInfo.fees || 0;
  const amountInCentsBDT = amountBDT * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      setError();
      console.log('Payment method created:', paymentMethod);
    }

    // Create Payment Intent
    /* const res = await axiosSecure.post('/create-payment-intent', {
      amountInCents: amountInCentsBDT,
      campId
    });
 */
const res = await axiosSecure.post('http://localhost:5000/create-payment-intent', {
  amountInCents: Math.round(amountInCentsBDT) // ✅ শুধুমাত্র একবার * 100 করা যথেষ্ট
});


    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: 'belal khan'
        }
      }
    });

    if (result.error) {
      console.log(result.error.message);
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('✅ Payment succeeded!', result);

        const paymentsData = {
          campId,
          email: user?.email,
          amount: parcelInfo?.cost,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types?.[0],
          date: new Date().toISOString(),
          status: 'paid'
        };

        const paymentsRes = await axiosSecure.post('/payments', paymentsData);
        /* 
                if (paymentsRes.data?.insertedId || paymentsRes.data?.paymentId) {
                  Swal.fire({
                    title: 'Payment Successful!',
                    text: `Your payment of ৳${amountBDT} has been completed.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then(() => {
                    navigate('/dashboard/myparcel'); // ✅ Redirect user after success
                  });
                } */
        if (paymentsRes.data?.insertedId || paymentsRes.data?.paymentId) {
          Swal.fire({
            title: 'Payment Successful!',
            html: `
        <p>Your payment of <strong>৳${amountBDT}</strong> has been completed.</p>
        <p><strong>Transaction ID:</strong> ${result.paymentIntent.id}</p>
    `,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate('/dashboard/managereg');
          });
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white p-6 rounded shadow space-y-4"
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

export default ParmentFrom;
