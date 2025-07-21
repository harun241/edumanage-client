import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://edumanage-server-rho.vercel.app';

const Payment = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams(); // class ID
  const navigate = useNavigate();

  const [classInfo, setClassInfo] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Load class info and create payment intent
  useEffect(() => {
    if (!id || !user?.email) return;

    const loadPaymentIntent = async () => {
      try {
        const classRes = await axios.get(`${API_BASE}/classes/${id}`);
        setClassInfo(classRes.data);

        const intentRes = await axios.post(
          `${API_BASE}/create-payment-intent`,
          { classId: id },
          {
            headers: {
              'x-user-email': user.email,
              'x-user-role': user.role || 'student',
            },
          }
        );
        setClientSecret(intentRes.data.clientSecret);
      } catch (err) {
        console.error('Failed to load payment info:', err);
        setError('❌ Failed to load payment info.');
      }
    };

    loadPaymentIntent();
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!stripe || !elements) {
      setError('Stripe not loaded.');
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Card element not found.');
      setLoading(false);
      return;
    }

    try {
      // 1. Create payment method
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
      if (methodError) throw new Error(methodError.message);

      // 2. Confirm payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
      if (confirmError) throw new Error(confirmError.message);

      // 3. Check success
      if (paymentIntent.status !== 'succeeded') {
        throw new Error('Payment was not successful');
      }

      // 4. Save to backend
      const res = await axios.post(
        `${API_BASE}/payment-success`,
        {
          classId: classInfo._id,
          email: user.email,
          amount: classInfo.price,
          paymentId: paymentIntent.id,
          classTitle: classInfo.title,
        },
        {
          headers: {
            'x-user-email': user.email,
            'x-user-role': user.role || 'student',
          },
        }
      );

      if (res.data.success) {
        setSuccess('✅ Payment & enrollment successful!');
        setTimeout(() => navigate('/dashboard/student/my-classes'), 2000);
      } else {
        throw new Error('Payment succeeded but saving enrollment failed.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow
                    bg-white text-gray-900
                    dark:bg-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-4">
        Pay for: {classInfo?.title || 'Loading...'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div
          className="border rounded mb-4
                     bg-white dark:bg-gray-800
                     p-2
                     text-gray-900 dark:text-gray-100"
        >
          <CardElement />
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded
                     hover:bg-blue-700
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
        >
          {loading ? 'Processing...' : `Pay $${classInfo?.price || '0'}`}
        </button>
      </form>

      {error && (
        <p className="text-red-600 dark:text-red-400 mt-4 whitespace-pre-wrap">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-600 dark:text-green-400 mt-4 whitespace-pre-wrap">
          {success}
        </p>
      )}
    </div>
  );
};

export default Payment;
