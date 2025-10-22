import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserStore } from "../../store/user.store";

export default function Login() {
  const { login } = UserStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login({ email: formData.email, password: formData.password });
    } catch (error) {
      console.error("Login Error:", error);
      alert("An unexpected error occurred during login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonColor = "bg-teal-400 hover:bg-teal-500";
  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition duration-150";

  return (
    <div className="p-4">
      <h4 className="text-xl font-semibold text-gray-800 mb-6">
        Welcome to YourTutor
      </h4>
      <p className="text-sm text-gray-500 mb-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email/Username Field */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            User name
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your User name"
            value={formData.email}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              className={inputStyle + " pr-10"}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {/* Eye icon for password visibility */}
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showPassword ? (
                  // Open eye
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                ) : (
                  // Closed eye
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7.23a1.4 1.4 0 010-1.54C3.732 5.943 7.522 3 12 3c1.761 0 3.447.476 4.975 1.353m-2.126 1.954l-5.753 5.753m7.766 7.766L15.42 16.92M10 12h.01"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center text-sm pt-1">
          <label className="flex items-center space-x-2 text-gray-600">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="rounded text-teal-500 border-gray-300 focus:ring-teal-500"
            />
            <span>Remember me</span>
          </label>
          <a
            href="#"
            className="text-sm text-teal-500 hover:text-teal-600 font-medium"
          >
            Forgot Password ?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-bold text-white transition duration-300 ease-in-out ${buttonColor} ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
}
