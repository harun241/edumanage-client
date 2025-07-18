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

  // Load class info and create payment intent
  useEffect(() => {
    if (!id || !user?.email) return;

    // Get class info first
    axios.get(`${API_BASE}/classes/${id}`)
      .then(res => {
        const data = res.data;
        setClassInfo(data);

        // Then create payment intent by sending classId and user headers
        return axios.post(`${API_BASE}/create-payment-intent`,
          { classId: id },
          {
            headers: {
              'x-user-email': user.email,
              'x-user-role': user.role || 'student',
              'Content-Type': 'application/json',
            },
          }
        );
      })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(err => {
        console.error('Failed to load payment info:', err);
        setError('Failed to load payment info');
      });
  }, [id, user?.email, user?.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      return;
    }

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
      setSuccess('✅ Payment successful!');

      try {
        // Save payment info to backend
        await axios.post(`${API_BASE}/api/payments`, {
          classId: classInfo._id,
          email: user.email,
          amount: classInfo.price,
          paymentId: paymentIntent.id,
        }, {
          headers: {
            'x-user-email': user.email,
            'x-user-role': user.role || 'student',
            'Content-Type': 'application/json',
          },
        });

        // Save enrollment info to backend
        await axios.post(`${API_BASE}/enroll/${id}`, {}, {
          headers: {
            'x-user-email': user.email,
            'x-user-role': user.role || 'student',
            'Content-Type': 'application/json',
          },
        });

      } catch (saveError) {
        console.error('❌ Error saving to database:', saveError);
        setError('Payment succeeded but failed to save enrollment/payment info.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        Pay for: {classInfo?.title || 'Loading...'}
      </h2>

      <form onSubmit={handleSubmit}>
        <CardElement className="border p-2 rounded mb-4" />
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
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
