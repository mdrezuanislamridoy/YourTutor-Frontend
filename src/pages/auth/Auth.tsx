import  { useEffect, useState } from "react";
import Login from "./Login";
import StudentSignup from "./StudentSignup";
import MentorSignup from "./MentorSignup";

import loginPageImage from "/loginPageImage.png";
import signupPageImage from "/signupPageImage.png";
import mentorSignupImage from "/signupPageImage.png";
import { UserStore } from "../../store/user.store";

export default function Auth() {
  const { message, resetMessage } = UserStore();

  useEffect(() => {
    setTimeout(() => {
      resetMessage();
    }, 3000);
  }, [message]);

  const [page, setPage] = useState<"login" | "studentSignup" | "mentorSignup">(
    "login"
  );

  // Select correct component
  const renderSection = () => {
    switch (page) {
      case "login":
        return <Login />;
      case "studentSignup":
        return <StudentSignup />;
      case "mentorSignup":
        return <MentorSignup />;
      default:
        return <Login />;
    }
  };

  // Select correct image
  const imageLink = () => {
    switch (page) {
      case "mentorSignup":
        return { image: mentorSignupImage, text: "Mentor Signup" };
      case "studentSignup":
        return { image: signupPageImage, text: "Student Signup" };
      default:
        return { image: loginPageImage, text: "Login Page" };
    }
  };

  const { image, text } = imageLink();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-teal-300 to-teal-500 p-10">
        <img
          src={image}
          alt={text}
          className="w-full max-w-lg rounded-3xl shadow-2xl object-cover"
        />
      </div>

      <div className="flex flex-col justify-center w-full md:w-1/2 px-6 sm:px-10 py-10">
        <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4">
            Welcome to <span className="text-teal-500">YourTutor</span>
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {page === "login"
              ? "Access your account to continue learning."
              : page === "studentSignup"
              ? "Create your student account to start your journey."
              : "Join as a mentor and start guiding learners."}
          </p>

          <div className="flex justify-center space-x-3 mb-6">
            <button
              onClick={() => setPage("login")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                page === "login"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setPage("studentSignup")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                page === "studentSignup"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Register
            </button>
          </div>

          <div className="text-center mb-6">
            <span className="text-gray-600">Want to teach? </span>
            <button
              onClick={() => setPage("mentorSignup")}
              className="text-teal-500 font-semibold hover:underline"
            >
              Join as Mentor
            </button>
          </div>

          {message && (
            <div className="text-center mb-6">
              <span className="text-slate-500">{message}</span>
            </div>
          )}

          <div className="mt-4">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
}
