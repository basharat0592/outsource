"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuthStore();
  const [email, setEmail] = useState("test1@gmail.com"); // Default email for testing
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simple validation
      if (!email || !password) {
        setError("Please enter both email and password");
        setIsLoading(false);
        return;
      }

      // TODO: Actual API call - yeh services/auth.ts se aayega
      // For now, simulate API response
      setTimeout(() => {
        // Mock API response
        const mockResponse = {
          success: true,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token
          user: { id: 1, name: "Test User", email }
        };

        if (email === "test1@gmail.com" && password === "password123") {
          // Token set karo store mein
          setToken(mockResponse.token);
          
          // Redirect to dashboard
          router.push("/dashboard");
        } else {
          setError("Invalid email or password");
        }
        
        setIsLoading(false);
      }, 1000);

    } catch (err) {
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F7]">
      {/* LEFT SIDE — FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <h1 className="text-4xl font-bold text-[#5A2ABF] mb-8">
            outsource.com
          </h1>

          {/* Title */}
          <h2 className="text-3xl font-semibold text-black mb-6">Sign In</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-black mb-1 block">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-6 px-4 border-gray-300 focus:border-[#5A2ABF] focus:ring-[#5A2ABF]"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="text-sm font-medium text-black block">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-[#5A2ABF] text-sm font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-6 px-4 border-gray-300 focus:border-[#5A2ABF] focus:ring-[#5A2ABF]"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-white bg-[#5A2ABF] hover:bg-[#4b22a3] transition-colors text-md font-medium"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#5A2ABF] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-gray-500 text-sm mt-10 text-center">
            © {new Date().getFullYear()} Outsource.com
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/login-image.jpg"
          alt="Login background"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-[#5A2ABF]/10" />
      </div>
    </div>
    
  );
}