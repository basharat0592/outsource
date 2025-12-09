export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full bg-white flex">
      {/* LEFT HALF - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Image instead of Outsource.com text */}
          <div className="mb-10 text-2xl flex">
            <img 
              src="/logo2.png" 
              alt="Outsource.com Logo"
              className="h-12"
            />
          </div>

          <div className="">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Reset Password</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address*
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white p-2 font-semibold rounded bg-[#5321A9] transition-colors"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-gray-500">© 2024 Outsource.com</p>
          </div>
        </div>
      </div>

      {/* RIGHT HALF - BACKGROUND IMAGE */}
      <div className="hidden lg:block lg:w-1/2">
        <img 
          src="/login-image.jpg" 
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}