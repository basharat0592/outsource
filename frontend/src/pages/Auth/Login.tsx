import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import loginImage from "../../assets/img1.jpg";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        username: email,
        password: password,
      });

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid email or password");
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

          <h2 className="text-3xl font-bold mb-8 text-gray-900">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="w-full p-3 border border-gray-300 rounded-md bg-[#eff4ff]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>

                {/* ✅ FIXED LINK */}
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-700 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-md bg-[#eff4ff]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#4c1d95] hover:bg-purple-900 text-white font-semibold rounded-md"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="pt-20">
            <p className="text-gray-400 text-xs">© 2024 Outsource.com</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div
        className="hidden md:block md:w-[55%] bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImage})` }}
      />
    </div>
  );
};

export default Login;
