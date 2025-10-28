import { useState } from "react";
import { UserStore } from "../../store/user.store";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function StudentSignup() {
  const sendSignUpCode = UserStore((state) => state.sendSignUpCode);
  const verifySignUpCode = UserStore((state) => state.verifySignUpCode);
  const registerStudent = UserStore((state) => state.registerStudent);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    name: "",
    password: "",
  });

  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isSentCode, setIsSentCode] = useState(false);
  const [isVerifiedCode, setIsVerifiedCode] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSendCode = async () => {
    if (!formData.email) return console.log("Please enter your email.");

    setIsSendingCode(true);
    try {
      const result = await sendSignUpCode(formData.email);
      if (result.success) {
        setIsSentCode(true);
      }
    } catch (error) {
      console.error("Send Code Error:", error);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (String(formData.verificationCode).length !== 6)
      return console.log("Please enter the 6-digit verification code.");

    setIsVerifyingCode(true);
    try {
      const code = parseInt(formData.verificationCode, 10);
      const result = await verifySignUpCode(formData.email, code);
      if (result.success) {
        setIsVerifiedCode(true);
      }
    } catch (error) {
      console.error("Verify Code Error:", error);
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    if (!isVerifiedCode) return;

    if (!formData.name || !formData.password || !formData.verificationCode) {
      return alert("All fields are required for registration.");
    }

    try {
      await registerStudent(formData as any);
      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error);
      alert("An unexpected error occurred during registration.");
    } finally {
      setIsRegistering(false);
    }
  };

  const buttonColor = "bg-teal-400 hover:bg-teal-500";
  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition duration-150";

  return (
    <div className="p-4">
      <h4 className="text-xl font-semibold text-gray-800 mb-6">
        Student Registration
      </h4>
      <form onSubmit={handleRegistration} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="flex space-x-2">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={inputStyle}
              required
              disabled={isSentCode}
            />
            {!isSentCode && (
              <button
                type="button"
                onClick={handleSendCode}
                disabled={isSendingCode || !formData.email}
                className={`py-3 px-4 rounded-lg text-white font-medium whitespace-nowrap transition duration-300 ease-in-out ${buttonColor} ${
                  isSendingCode || !formData.email
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSendingCode ? "Sending..." : "Send Code"}
              </button>
            )}
            {isSentCode && !isVerifiedCode && (
              <p className="py-3 px-4 text-sm text-green-600 bg-green-50 rounded-lg flex items-center">
                Code Sent!
              </p>
            )}
          </div>
        </div>

        {isSentCode && !isVerifiedCode && (
          <div className="space-y-1">
            <label
              htmlFor="verificationCode"
              className="text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                id="verificationCode"
                name="verificationCode"
                placeholder="Enter 6-digit code"
                value={formData.verificationCode}
                onChange={handleChange}
                className={inputStyle}
                required
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                disabled={isVerifyingCode}
                className={`py-3 px-4 rounded-lg text-white font-medium whitespace-nowrap transition duration-300 ease-in-out ${buttonColor} ${
                  isVerifyingCode ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isVerifyingCode ? "Verifying..." : "Verify Code"}
              </button>
            </div>
          </div>
        )}

        {isVerifiedCode && (
          <>
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-bold text-white transition duration-300 ease-in-out ${buttonColor}`}
            >
              {isRegistering ? "Registering..." : "Register"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
