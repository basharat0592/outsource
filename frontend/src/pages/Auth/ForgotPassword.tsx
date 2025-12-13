import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import forgotImage from "../../assets/img1.jpg";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/forgot-password", {
        email: email,
      });

      toast.success("If this email exists, reset instructions have been sent.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full font-sans bg-white">
      {/* LEFT SIDE */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-12 md:px-24 bg-[#fbfbfb]">
        <div className="max-w-md w-full mx-auto">

          <div className="mb-12">
            <h1 className="text-3xl font-bold text-[#4c1d95] tracking-tighter">
              outsource<span className="text-gray-600 font-normal">.com</span>
            </h1>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            Forgot Password
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            Enter your registered email address
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="w-full p-3 border border-gray-300 rounded-md bg-[#eff4ff] text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#4c1d95] hover:bg-purple-900 text-white font-semibold rounded-md transition duration-200 shadow-sm"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* BACK TO LOGIN */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-purple-700 hover:underline font-medium"
            >
              ← Back to Login
            </Link>
          </div>

          <div className="mt-auto pt-20">
            <p className="text-gray-400 text-xs">© 2024 Outsource.com</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div
        className="hidden md:block md:w-[55%] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${forgotImage})` }}
      ></div>
    </div>
  );
};

export default ForgotPassword;
