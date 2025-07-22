import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const createPaymentIntent = async (amount) => {
  const res = await axios.post(
    "https://edumanage-server-rho.vercel.app/create-payment-intent",
    { amount }
  );
  return res.data.clientSecret;
};

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  // Mutation for creating payment intent
  const { mutate: getClientSecret, isLoading, isError, error } = useMutation(createPaymentIntent, {
    onSuccess: (data) => {
      setClientSecret(data);
    },
    onError: (err) => {
      console.error("Error creating payment intent:", err);
      alert("Failed to initiate payment.");
    },
  });

  useEffect(() => {
    if (amount > 0) {
      getClientSecret(amount);
    }
  }, [amount, getClientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (stripeError) {
      console.error(stripeError.message);
      alert(stripeError.message);
    } else if (paymentIntent?.status === "succeeded") {
      alert("Payment Successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || isLoading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isLoading ? "Processing..." : `Pay $${amount}`}
      </button>
      {isError && <p className="text-red-600 mt-2">Error: {error.message}</p>}
    </form>
  );
};

export default CheckoutForm;
