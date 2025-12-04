// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [isSent, setIsSent] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email) {
//       setError("Please enter your email address");
//       return;
//     }

//     setError("");
//     setIsSent(true);
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F5F5F7]">

//       {/* LEFT SIDE — FORM */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-6">
//         <div className="w-full max-w-md">

//           {/* outsource.com */}
//           <h1 className="text-4xl font-bold text-[#5A2ABF] mb-10">
//             outsource.com
//           </h1>

//           {/* Heading */}
//           <h2 className="text-3xl font-semibold mb-6">Forgot Password</h2>

//           {/* Error */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
//               {error}
//             </div>
//           )}

//           {!isSent ? (
//             <>
//               {/* Small Description */}
//               <p className="text-gray-600 text-sm mb-8">
//                 Enter your email and we will send you a password reset link.
//               </p>

//               {/* FORM */}
//               <form onSubmit={handleSubmit} className="space-y-6">

//                 {/* Email */}
//                 <div>
//                   <label className="text-sm font-medium mb-1 block">Email address</label>
//                   <Input
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <Button
//                   type="submit"
//                   className="w-full py-6 bg-[#5A2ABF] text-white hover:bg-[#4c21a3]"
//                 >
//                   Send Reset Link
//                 </Button>
//               </form>

//               {/* Back to login */}
//               <p className="text-center text-sm text-gray-600 mt-6">
//                 Remember your password?{" "}
//                 <Link href="/login" className="text-[#5A2ABF] font-medium hover:underline">
//                   Back to Sign In
//                 </Link>
//               </p>
//             </>
//           ) : (
//             <>
//               {/* Success */}
//               <h3 className="text-2xl font-semibold mb-3 text-gray-900">
//                 Check Your Email
//               </h3>

//               <p className="text-gray-600 text-sm mb-8">
//                 A password reset link has been sent to:
//                 <br />
//                 <span className="font-medium">{email}</span>
//               </p>

//               <Link href="/login">
//                 <Button className="w-full py-6 bg-[#5A2ABF] text-white hover:bg-[#4c21a3]">
//                   Return to Login
//                 </Button>
//               </Link>
//             </>
//           )}

//           {/* Footer */}
//           <p className="text-gray-500 text-sm mt-10 text-center">
//             © {new Date().getFullYear()} Outsource.com
//           </p>
//         </div>
//       </div>

//       {/* RIGHT SIDE IMAGE */}
//       <div className="hidden md:block w-1/2 relative">
//         <Image
//           src="/login-image.jpg"
//           alt="Forgot Password Image"
//           fill
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-[#5A2ABF]/10"></div>
//       </div>
//     </div>
//   );
// }
