import React from "react";

import FemalePillImage from "/hero-girl-image.png";

const Card = ({ children, className = "" }) => (
  <div className={`p-4 rounded-xl bg-white shadow-xl ${className}`}>
    {children}
  </div>
);

export default function HeroSection() {
  const tealColorClass = "bg-[#2FC4C0]";

  return (
    <section className="relative w-full overflow-hidden">
      <div className={`w-full ${tealColorClass} relative z-20`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="text-yellow-300">Studying </span>Online is now
                much easier
              </h1>

              <p className="text-lg text-white/90 max-w-md">
                YourTutor is an interesting platform that will teach you in more
                an interactive way.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
                <button className="py-3 px-8 text-lg font-semibold bg-white text-teal-500 rounded-full hover:bg-gray-100 transition duration-300 shadow-md">
                  Join for free
                </button>
                <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-200 transition duration-300">
                  <div className="p-3 bg-white/30 rounded-full">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 15V5L15 10L6 15Z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">
                    Watch how it works
                  </span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:flex w-xl h-96 lg:h-[500px]  justify-center items-end">
              <div className="absolute inset-x-0 bottom-0 h-full max-w-md mx-auto lg:max-w-none lg:w-full">
                <img
                  src={FemalePillImage}
                  alt="Student studying"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>

              <Card className="absolute top-10 left-10  lg:top-20  p-4 text-center">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 4h-2V3h-2v1H9V3H7v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                  </svg>
                  <div>
                    <p className="text-xl font-bold text-gray-800">250k</p>
                    <p className="text-sm text-gray-500">Assisted Student</p>
                  </div>
                </div>
              </Card>

              <Card className="absolute top-1/2 right-1/4 translate-y-8 lg:top-1/2 lg:right-0 transform lg:translate-y-[-25%] p-4">
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-6 h-6 text-orange-500 mt-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      Congratulations
                    </p>
                    <p className="text-sm text-gray-500">
                      Your admission completed
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:bottom-12 lg:left-[20%] p-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-800">
                      User Experience Class
                    </p>
                    <p className="text-xs text-gray-500">Today at 12:00 PM</p>
                    <button className="mt-2 py-1 px-4 text-sm font-medium text-white bg-[#D65D8F] rounded-full hover:bg-[#c24c7f] transition">
                      Join Now
                    </button>
                  </div>
                </div>
              </Card>

              <div className="absolute top-10 right-20 lg:right-4 p-2 rounded-lg bg-red-400 text-white">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 13h2v7H3zM7 10h2v10H7zM11 16h2v4h-2zM15 14h2v6h-2zM19 9h2v11h-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full z-10">
        <div
          className={`w-[200%] h-32 bg-white rounded-t-[50%] absolute left-1/2 transform -translate-x-1/2 -mt-16`}
        ></div>
      </div>
    </section>
  );
}
