import React from "react";
import Dashboard from "./sections/Dashboard";
import MentorRequests from "./sections/MentorRequests";
import Courses from "./sections/Courses";
import BlockedAccount from "./sections/BlockedAccount";

import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaUserCheck,
  FaBan,
  FaUser,
  FaUsersSlash,
  FaShoppingBag,
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GiTargetPoster, GiTeacher } from "react-icons/gi";
import { RiCouponFill } from "react-icons/ri";
import { PiTreeStructure } from "react-icons/pi";
import RejectedMentors from "./sections/RejectedMentors";
import DeletedUsers from "./sections/DeletedUsers";
import NoticeBoard from "./sections/NoticeBoard";
import CategoryManage from "./sections/CategoryManage";
import CouponManage from "./sections/CouponManage";
import SidebarItem from "./components/SidebarItems";
import Mentors from "./sections/Mentors";
import Students from "./sections/Students";
import Products from "./sections/Products";
import { UserPlus } from "lucide-react";
import AddMentorToCourse from "./sections/AddMentorToCourse";
import AddModule from "./sections/AddModule";

export default function Admin() {
  const [selectedSection, setSelectedSection] = React.useState("dashboard");
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sections = [
    { title: "Dashboard", selection: "dashboard", icon: FaTachometerAlt },
    { title: "Courses", selection: "courses", icon: FaBook },
    { title: "Product", selection: "products", icon: FaShoppingBag },
    {
      title: "Mentor Requests",
      selection: "mentor-requests",
      icon: FaUserCheck,
    },
    {
      title: "Mentors",
      selection: "mentors",
      icon: FaUser,
    },
    { title: "Students", selection: "students", icon: FaUsers },
    { title: "Blocked Accounts", selection: "blocked-account", icon: FaBan },
    {
      title: "Rejected Mentors",
      selection: "rejected-mentors",
      icon: GiTeacher,
    },
    { title: "Deleted Users", selection: "deleted-users", icon: FaUsersSlash },
    { title: "Add Mentor To Course", selection: "add-mtc", icon: UserPlus },

    {
      title: "Notice Board Manager",
      selection: "notice-board-manager",
      icon: GiTargetPoster,
    },
    {
      title: "Category Manager",
      selection: "category-manager",
      icon: PiTreeStructure,
    },
    {
      title: "Coupon Manager",
      selection: "coupon-manager",
      icon: RiCouponFill,
    },
    {
      title: "Add Module",
      selection: "add-module",
      icon: RiCouponFill,
    },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <Students />;
      case "mentors":
        return <Mentors />;
      case "mentor-requests":
        return <MentorRequests />;
      case "courses":
        return <Courses />;
      case "products":
        return <Products />;
      case "blocked-account":
        return <BlockedAccount />;
      case "rejected-mentors":
        return <RejectedMentors />;
      case "deleted-users":
        return <DeletedUsers />;
      case "add-mtc":
        return <AddMentorToCourse />;
      case "notice-board-manager":
        return <NoticeBoard />;
      case "category-manager":
        return <CategoryManage />;
      case "coupon-manager":
        return <CouponManage />;
      case "add-module":
        return <AddModule />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen  bg-gray-50">
      <aside
        className={`flex  flex-col bg-white shadow-lg transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-4 border-b">
          {!isCollapsed && (
            <h1 className="text-lg font-bold text-teal-600 whitespace-nowrap">
              YourTutor Admin
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-600 hover:text-teal-500 transition-all"
          >
            {isCollapsed ? (
              <IoIosArrowForward className="w-6 h-6" />
            ) : (
              <IoIosArrowBack className="w-6 h-6" />
            )}
          </button>
        </div>

        <nav className="flex flex-col p-3 mt-2 overflow-y-auto">
          {sections.map((section) => (
            <SidebarItem
              key={section.selection}
              section={section}
              isCollapsed={isCollapsed}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          ))}
        </nav>
      </aside>

      <main
        className={`flex-grow transition-all duration-300 px-4 sm:px-8 py-6 ${
          isCollapsed ? "ml-2" : "ml-0"
        }`}
      >
        <header className="border-b pb-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 capitalize">
            {sections.find((s) => s.selection === selectedSection)?.title}
          </h2>
        </header>

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg min-h-[calc(100vh-160px)]">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
