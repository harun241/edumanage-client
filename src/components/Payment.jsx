// src/components/Payment.jsx
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const Payment = () => {
    const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams(); // class ID
  const [classInfo, setClassInfo] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch class info
    axios.get(`${API_BASE}/classes/${id}`)
      .then(res => {
        setClassInfo(res.data);

        // Create payment intent
        return axios.post(`${API_BASE}/create-payment-intent`, { amount: res.data.price });
      })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load payment info');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Card element not found');
      return;
    }

    // Create payment method
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      return;
    }

    // Confirm card payment
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setSuccess('Payment successful! 🎉');

      // Save payment info to backend
      try {
       await axios.post("http://localhost:3000/api/payments", {
  classId: classInfo._id,
  email: user?.email,
  amount: classInfo.price,         // ✅ backend expects 'amount'
  paymentId: paymentIntent.id      // ✅ backend expects 'paymentId'
});
      } catch (saveError) {
        console.error('Error saving payment:', saveError);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Pay for: {classInfo?.title || 'Loading...'}</h2>
      <form onSubmit={handleSubmit}>
        <CardElement className="border p-2 rounded mb-4" />
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Pay ${classInfo?.price || '0'}
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
};

export default Payment;
