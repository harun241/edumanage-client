import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://edumanage-server-rho.vercel.app';

const fetchClassInfo = async (id) => {
  const res = await axios.get(`${API_BASE}/classes/${id}`);
  return res.data;
};

const createPaymentIntent = async ({ id, email, role }) => {
  const res = await axios.post(
    `${API_BASE}/create-payment-intent`,
    { classId: id },
    {
      headers: {
        'x-user-email': email,
        'x-user-role': role || 'student',
      },
    }
  );
  return res.data.clientSecret;
};

const savePaymentSuccess = async ({ classInfo, user, paymentIntentId }) => {
  const res = await axios.post(
    `${API_BASE}/payment-success`,
    {
      classId: classInfo._id,
      email: user.email,
      amount: classInfo.price,
      paymentId: paymentIntentId,
      classTitle: classInfo.title,
    },
    {
      headers: {
        'x-user-email': user.email,
        'x-user-role': user.role || 'student',
      },
    }
  );
  return res.data;
};

const Payment = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams(); // class ID
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch class info using TanStack Query
  const { data: classInfo, isLoading: loadingClass, isError: errorClass } = useQuery(
    ['classInfo', id],
    () => fetchClassInfo(id),
    {
      enabled: !!id,
    }
  );

  // Mutation for creating payment intent
  const paymentIntentMutation = useMutation(createPaymentIntent, {
    onSuccess: (data) => {
      setClientSecret(data);
    },
    onError: (err) => {
      console.error('Failed to create payment intent:', err);
      setError('❌ Failed to initialize payment.');
    },
  });

  // Mutation for saving payment success
  const paymentSuccessMutation = useMutation(savePaymentSuccess, {
    onSuccess: (data) => {
      if (data.success) {
        setSuccess('✅ Payment & enrollment successful!');
        setTimeout(() => navigate('/dashboard/student/my-classes'), 2000);
      } else {
        setError('Payment succeeded but saving enrollment failed.');
      }
    },
    onError: (err) => {
      console.error('Failed to save payment success:', err);
      setError('❌ Failed to save payment details.');
    },
  });

  // Create payment intent when classInfo and user are ready
  useEffect(() => {
    if (classInfo && user?.email) {
      paymentIntentMutation.mutate({ id, email: user.email, role: user.role });
    }
  }, [classInfo, user, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!stripe || !elements) {
      setError('Stripe not loaded.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Card element not found.');
      return;
    }

    try {
      // Create payment method
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
      if (methodError) throw new Error(methodError.message);

      // Confirm payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
      if (confirmError) throw new Error(confirmError.message);

      if (paymentIntent.status !== 'succeeded') {
        throw new Error('Payment was not successful');
      }

      // Save payment success with mutation
      paymentSuccessMutation.mutate({ classInfo, user, paymentIntentId: paymentIntent.id });
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Something went wrong.');
    }
  };

  if (loadingClass) return <p>Loading class info...</p>;
  if (errorClass) return <p>Failed to load class info.</p>;

  return (
    <div
      className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow
                 bg-white text-gray-900
                 dark:bg-gray-900 dark:text-gray-100"
    >
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
          disabled={
            !stripe ||
            !clientSecret ||
            paymentIntentMutation.isLoading ||
            paymentSuccessMutation.isLoading
          }
          className="bg-blue-600 text-white px-4 py-2 rounded
                     hover:bg-blue-700
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
        >
          {paymentIntentMutation.isLoading || paymentSuccessMutation.isLoading
            ? 'Processing...'
            : `Pay $${classInfo?.price || '0'}`}
        </button>
      </form>

      {error && (
        <p className="text-red-600 dark:text-red-400 mt-4 whitespace-pre-wrap">{error}</p>
      )}
      {success && (
        <p className="text-green-600 dark:text-green-400 mt-4 whitespace-pre-wrap">{success}</p>
      )}
    </div>
  );
};

export default Payment;
