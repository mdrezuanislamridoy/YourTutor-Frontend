import React, { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserStore } from "../store/user.store";

export default function Navbar({ bgColor = "transparent" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const logout = UserStore((state) => state.logout);
  const user = UserStore((state) => state.user);
  const profile = UserStore((state) => state.profile);

  const loginBtnStyle =
    "py-2 px-6 rounded-full font-semibold transition duration-300";
  const loginBaseClass =
    "bg-white text-teal-500 hover:shadow-lg hover:shadow-teal-200";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Course", href: "/course" },
    { name: "Career", href: "/career" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      await profile();
    };
    fetchProfile();
  }, [profile]);
  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const AuthOrProfile = () => {
    if (user) {
      return (
        <div
          className="flex items-center space-x-2 text-white cursor-pointer hover:text-gray-200 relative"
          onClick={() => setShowProfile(!showProfile)}
        >
          <FaUserCircle className="w-7 h-7" />
          <span className="hidden lg:inline font-medium">
            {user.name || "Profile"}
          </span>
          {showProfile && (
            <div className="absolute top-10 right-0 bg-white shadow-lg p-4 rounded-md w-48 z-50">
              <Link
                to="/profile"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex space-x-3">
          <Link to="/auth" className={`${loginBtnStyle} ${loginBaseClass}`}>
            Login
          </Link>
        </div>
      );
    }
  };

  return (
    <nav
      className={`w-full ${bgColor} sticky z-50 top-0 left-0 transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold text-white tracking-widest"
            >
              YourTutor
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition duration-150"
                >
                  {link.name}
                </Link>
              ))}
              <div className="ml-6">
                <AuthOrProfile />
              </div>
            </div>
          </div>

          <div className="flex md:hidden items-center">
            <div className="mr-3">
              <AuthOrProfile />
            </div>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              {isOpen ? (
                <HiX className="h-6 w-6 transition duration-150" />
              ) : (
                <HiMenu className="h-6 w-6 transition duration-150" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-teal-600/90`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block text-white hover:bg-teal-500/70 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-150"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
