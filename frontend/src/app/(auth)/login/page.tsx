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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (email === "test1@gmail.com" && password === "password123") {
        setToken("mock_token_123");
        router.push("/dashboard");
      } else {
        setError("Invalid email or password");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F7]">

      {/* LEFT SIDE — LOGO + FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          {/* outsource.com */}
          <h1 className="text-4xl font-bold text-[#5A2ABF] mb-10">
            outsource.com
          </h1>

          {/* Sign In Title */}
          <h2 className="text-3xl font-semibold mb-6">Sign In</h2>

          {/* Error Box */}
          {error && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="text-sm font-medium mb-1 block">Email address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[#5A2ABF] text-sm hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-[#5A2ABF] text-white hover:bg-[#4c21a3]"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/login-image.jpg"
          alt="Login Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#5A2ABF]/10"></div>
      </div>
    </div>
  );
}
