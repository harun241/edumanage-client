import React, { useState } from "react";
import { useNavigate, Link } from "react-router"; 
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
       toast.success(" Login successful!");
      navigate("/");
    } catch (err) {
       toast.error( err.message);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="mt-4 px-6 py-3 text-lg font-semibold rounded-xl 
                bg-gradient-to-r from-sky-500 to-blue-700 text-white shadow-lg 
                hover:shadow-blue-400/50 transition-all duration-300">
          Login
        </button>
      </form>
          <p className="text-center mt-5">OR</p>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full mt-4 flex justify-center items-center space-x-2"
      >
    
        <span className="flex items-center gap-4"><FcGoogle className="size-8"/>Login with Google</span>
      </button>

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-blue-600 underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
