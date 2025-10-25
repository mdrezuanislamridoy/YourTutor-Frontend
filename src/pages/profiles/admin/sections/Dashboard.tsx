import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaBookOpen,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";
import { UserStore } from "../../../../store/user.store";
import axiosInstance from "../../../../lib/axiosInstance";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <motion.div
    className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 flex items-center gap-4"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className={`text-3xl ${color}`}>
      <Icon />
    </div>
    <div>
      <p className="text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </motion.div>
);

const CourseListItem = ({ title, detail, isPopular = false, rank }: any) => (
  <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 transition">
    <div className="flex items-center gap-3">
      {isPopular && <span className="text-yellow-500 font-bold">{rank}.</span>}
      <p className="font-medium">{title}</p>
    </div>
    <span className="text-gray-500 text-sm">
      {isPopular ? `${detail} Enrollments` : detail}
    </span>
  </div>
);

const Dashboard = () => {
  const { user } = UserStore();

  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [popularCourses, setPopularCourses] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    pendingMentors: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const studentsRes = await axiosInstance.get("/admin/students");

        const totalStudents = studentsRes.data.total || 0;

        const mentorsRes = await axiosInstance.get("/admin/mentors");
 

        const pendingMentors = mentorsRes.data.count || 0;

        const coursesRes = await axiosInstance.get("/course/get-courses", {
          params: { limit: 5, sort: "createdAt:desc" },
        });

 

        const recentCourses = coursesRes.data.courses || [];
        const totalCourses = coursesRes.data.total || 0;

        const popularRes = await axiosInstance.get(
          "/course/get-popular-courses",
          {
            params: { limit: 5, sort: "createdAt:desc" },
          }
        );
        const popularCourses = popularRes.data.courses || [];

        const totalRevenue = popularCourses.reduce(
          (acc: number, course: any) => acc + (course.enrollments || 0) * 5,
          0
        );

        setStats({ totalStudents, totalCourses, pendingMentors, totalRevenue });
        setRecentCourses(recentCourses);
        setPopularCourses(popularCourses);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Welcome back, <span className="text-teal-600">{user?.name}</span>!
        </h1>
        <p className="text-gray-500 mt-1">
          Here's a snapshot of your platform's performance.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          icon={FaUserGraduate}
          color="text-green-600"
        />
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={FaBookOpen}
          color="text-blue-600"
        />
        <StatCard
          title="Pending Mentors"
          value={stats.pendingMentors}
          icon={FaCalendarAlt}
          color="text-yellow-600"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={FaStar}
          color="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Recent 5 Courses
          </h2>
          <div className="space-y-1">
            {recentCourses.map((course: any) => (
              <CourseListItem
                key={course._id} // use _id from MongoDB
                title={course.title}
                detail={new Date(course.createdAt).toLocaleDateString()} // format date
                isPopular={false}
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Popular 5 Courses
          </h2>
          <div className="space-y-1">
            {popularCourses.map((course: any, index: number) => (
              <CourseListItem
                key={course._id}
                title={course.title}
                detail={course.enrollments || 0}
                isPopular={true}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
