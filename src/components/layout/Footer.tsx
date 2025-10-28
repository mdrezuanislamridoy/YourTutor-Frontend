import React from "react";
import { Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-indigo-950 to-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg rotate-45 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg -rotate-45">
                  YT
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">YourTutor</h3>
              <p className="text-sm text-cyan-200">
                Best platform for virtual learning
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-center md:text-left text-lg font-medium mb-4">
              Subscribe to get our Newsletter
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full pl-12 pr-4 py-3 bg-indigo-800/50 border border-indigo-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-500 text-indigo-900 font-semibold rounded-full hover:from-cyan-300 hover:to-teal-400 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="border-indigo-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-cyan-200">
            <a href="#" className="hover:text-cyan-400 transition">
              Careers
            </a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-cyan-400 transition">
              Privacy Policy
            </a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-cyan-400 transition">
              Terms & Conditions
            </a>
          </div>

          <p className="text-cyan-300 text-xs">
            © {new Date().getFullYear()} YourTutor Technologies Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
