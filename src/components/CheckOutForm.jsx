import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios.post("https://edumanage-server-rho.vercel.app/create-payment-intent", { amount })
      .then(res => setClientSecret(res.data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (error) {
      console.error(error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment Successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Pay ${amount}
      </button>
    </form>
  );
};

export default CheckoutForm;
