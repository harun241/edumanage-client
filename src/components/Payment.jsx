import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://edumanage-server-rho.vercel.app";

// Fetch class info
const fetchClassInfo = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const res = await axios.get(`${API_BASE}/classes/${id}`);
  return res.data;
};

// Create payment intent
const createPaymentIntent = async ({ id, email, role }) => {
  const res = await axios.post(
    `${API_BASE}/create-payment-intent`,
    { classId: id },
    {
      headers: {
        "x-user-email": email,
        "x-user-role": role || "student",
      },
    }
  );
  return res.data.clientSecret;
};

// Save payment success
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
        "x-user-email": user.email,
        "x-user-role": user.role || "student",
      },
    }
  );
  return res.data;
};

const Payment = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");

  // ✅ Fetch class info using object-form query
  const {
    data: classInfo,
    isLoading: loadingClass,
    isError: errorClass,
  } = useQuery({
    queryKey: ["classInfo", id],
    queryFn: fetchClassInfo,
    enabled: !!id,
  });

  // ✅ Create payment intent
  const paymentIntentMutation = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: (secret) => {
      setClientSecret(secret);
    },
    onError: (err) => {
      console.error("Create payment intent failed:", err);
      toast.error(" Failed to initialize payment.");
    },
  });

  // ✅ Save payment success
  const paymentSuccessMutation = useMutation({
    mutationFn: savePaymentSuccess,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(" Payment & enrollment successful!");
        setTimeout(() => navigate("/dashboard/student/my-classes"), 2000);
      } else {
        toast.error("⚠️ Payment succeeded but saving enrollment failed.");
      }
    },
    onError: (err) => {
      console.error("Payment save failed:", err);
      toast.error("Failed to save payment details.");
    },
  });

  // ⚙️ Trigger intent when info is ready
  useEffect(() => {
    if (classInfo && user?.email) {
      paymentIntentMutation.mutate({ id, email: user.email, role: user.role });
    }
  }, [classInfo, user, id]);

  // 💳 Handle payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe not loaded.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card element not found.");
      return;
    }

    try {
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });
      if (methodError) throw new Error(methodError.message);

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
      if (confirmError) throw new Error(confirmError.message);

      if (paymentIntent.status !== "succeeded") {
        throw new Error("Payment was not successful");
      }

      // Save payment info to server
      paymentSuccessMutation.mutate({ classInfo, user, paymentIntentId: paymentIntent.id });
    } catch (err) {
      console.error("Payment error:", err);
      toast.error(err.message || "Something went wrong.");
    }
  };

  // 💡 Loading & error UI
  if (loadingClass) return <p>Loading class info...</p>;
  if (errorClass) return <p>❌ Failed to load class info.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-4">Pay for: {classInfo?.title || "Loading..."}</h2>

      <form onSubmit={handleSubmit}>
        <div className="border rounded mb-4 bg-white dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-100">
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {paymentIntentMutation.isLoading || paymentSuccessMutation.isLoading
            ? "Processing..."
            : `Pay $${classInfo?.price || "0"}`}
        </button>
      </form>
    </div>
  );
};

export default Payment;
