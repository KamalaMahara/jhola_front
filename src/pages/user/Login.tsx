import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'; // Optional: npm install lucide-react

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen  bg-[#111827] flex items-center justify-center p-6 font-sans">
      {/* Main Container */}
      <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-100">

        {/* Left Side: Brand & Visuals */}
        <div className="hidden md:flex md:w-5/12 bg-[#111827] relative overflow-hidden p-0">
          <img
            src="https://i.pinimg.com/736x/39/24/f7/3924f73f56abbb28c1f6821a82dc2ccf.jpg"
            alt="Shopping Illustration"
            className="w-full h-full object-fit"
          />
        </div>

        {/* Right Side: Interactive Form */}
        <div className="w-full md:w-7/12 p-10 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left ">
            <h1 className="text-[#111827] text-5xl font-black mb-3">Welcome Back</h1>
            <p className="text-gray-600 font-medium text-lg ">Good to see you again! Please enter your details.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email Input */}
            <div className="group">
              <label className="block text-sm font-bold text-[#111827] mb-2 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#F59E0B] transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-4 bg-[#F9FAFB] border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#F59E0B] outline-none transition-all duration-300 text-[#111827] font-medium placeholder:text-gray-300 shadow-sm"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-sm font-bold text-[#111827] mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#F59E0B] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-4 bg-[#F9FAFB] border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#F59E0B] outline-none transition-all duration-300 text-[#111827] font-medium placeholder:text-gray-300 shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#111827]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end pr-1">
              <button className="text-sm font-bold text-[#F59E0B] hover:text-[#d97706] transition-all hover:underline decoration-2 underline-offset-4">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button className="group w-full bg-[#111827] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all duration-300 shadow-[0_10px_30px_rgba(17,24,39,0.2)] active:scale-[0.97]">
              Log In
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Social / Divider */}
          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">Or continue with</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <p className="text-center text-gray-500 font-medium">
              New here?
              <a href="#" className="ml-2 text-[#111827] font-black hover:underline decoration-[#F59E0B] decoration-4">Create an account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;