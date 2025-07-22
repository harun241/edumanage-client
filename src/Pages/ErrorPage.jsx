import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "Oops!";
  let message = "Sorry, an unexpected error has occurred.";

  if (isRouteErrorResponse(error)) {
    title = error.statusText || title;
    message = error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 p-6 text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="bg-black bg-opacity-30 rounded-3xl p-10 max-w-lg w-full shadow-xl text-center"
      >
        <motion.h1
          className="text-9xl font-extrabold mb-6 select-none"
          initial={{ rotate: -15 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
        >
          404
        </motion.h1>
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="mb-8 text-lg">{message}</p>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#FBBF24" }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full shadow-lg transition-colors"
          onClick={() => window.history.back()}
          aria-label="Go Back"
        >
          Go Back
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
