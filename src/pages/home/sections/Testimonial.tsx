import React from "react";
import { Star, ChevronRight, ArrowRight } from "lucide-react";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm font-medium text-indigo-600">
              <div className="w-8 h-px bg-indigo-600"></div>
              TESTIMONIAL
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              What They Say?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              YourTutor has got more than <strong>100k positive ratings</strong>{" "}
              from our users around the world.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Some of the students and teachers were greatly helped by
              YourTutor.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Are you too? Please give your assessment
            </p>

            <button className="group inline-flex items-center gap-3 bg-transparent border-2 border-cyan-500 text-cyan-500 font-medium py-3 px-6 rounded-full hover:bg-cyan-50 transition-all duration-300">
              Write your assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/laptopImage.jpg"
                alt="Happy student with books"
                className="w-full h-full object-cover"
              />

              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md">
                <svg
                  className="w-6 h-6 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
                </svg>
              </div>

              <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition">
                <ChevronRight className="w-6 h-6 text-cyan-500" />
              </div>
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <blockquote className="space-y-4">
                  <p className="text-gray-700 italic text-sm leading-relaxed">
                    "Thank you so much for your help. It's exactly what I've
                    been looking for. You won't regret it. It really saves me
                    time and effort.{" "}
                    <strong>
                      YourTutor is exactly what our business has been lacking.
                    </strong>
                    "
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Gloria Rose</p>
                      <p className="text-xs text-gray-500">
                        12 reviews at Yelp
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4
                              ? "text-orange-400 fill-orange-400"
                              : "text-orange-400 fill-orange-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </blockquote>
              </div>

              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-l border-t border-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
