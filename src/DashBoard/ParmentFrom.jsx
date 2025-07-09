import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../AuthProvider/UseAuth';
import useAxoiseSecure from '../AuthProvider/UseAxios';

const ParmentFrom = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const { campId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxoiseSecure();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ['camps', campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${campId}`);
      return res.data;
    }
  });

  if (isPending) return '.......loading';

  const amountBDT = parcelInfo.fees || 0;
  const amountInCentsBDT = Math.round(amountBDT * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (paymentError) {
      setError(paymentError.message);
      return;
    } else {
      setError('');
      console.log('✅ Payment method created:', paymentMethod);
    }

    // Create payment intent
    const res = await axiosSecure.post('http://localhost:5000/create-payment-intent', {
      amountInCents: amountInCentsBDT,
      campId
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user.displayName,
          email: user.email
        }
      }
    });

    if (result.error) {
      setError(result.error.message);
    } else {


    if (result.paymentIntent.status === 'succeeded') {
  console.log('✅ Payment successful:', result);

  const paymentsData = {
    campId,
    email: user?.email,
    amount: parcelInfo?.fees,
    transactionId: result.paymentIntent.id,
    paymentMethod: result.paymentIntent.payment_method_types?.[0],
    date: new Date().toISOString(),
    payment_status: 'paid'
  };

  console.log("Sending payment data:", paymentsData); // 👈 Check this in console

  // ✅ ✅ Correct endpoint here:
  const paymentsRes = await axiosSecure.post('/payments', paymentsData);

  if (paymentsRes.data?.success && paymentsRes.data?.insertedId) {
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
  } else {
    Swal.fire("Payment Successful!", "Payment saved Database ");
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