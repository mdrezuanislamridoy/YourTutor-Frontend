"use client";

import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaBook,
  FaTrophy,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";
import axiosInstance from "../../../../lib/axiosInstance";
import { UserStore } from "../../../../store/user.store";
import { Link } from "react-router-dom";
import EnrollmentCard from "../../../../components/EnrollmentCard";
import { Loader2 } from "lucide-react";

const StudentDashboard = () => {
  const { user } = UserStore();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/enrollment/getMyEnrollments");
        const data = res.data;
        setEnrollments(data.enrollments || []);
        setTotalCourses(data.total || 0);
        setCompletedCourses(data.completed || 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  const ProgressBar = ({ percentage }: { percentage: number }) => (
    <div className="w-full h-2.5 bg-gray-200 rounded-full mt-1">
      <div
        className="h-2.5 bg-teal-500 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 min-h-[80vh]">
        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
      </div>
    );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <header className="mb-8 p-6 bg-white rounded-xl shadow-lg border-t-4 border-teal-500">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Hello, <span className="text-teal-600">{user?.name}</span>!
          </h1>
          <FaUserCircle className="w-10 h-10 text-gray-400" />
        </div>
        <p className="text-gray-600 mt-2">
          Here’s your learning progress overview.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4 border-l-4 border-blue-500">
          <Link to={`/enrollment-list`}>
            <FaBook className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{totalCourses}</p>
              <h3 className="text-sm text-gray-500">Enrolled Courses</h3>
            </div>
          </Link>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4 border-l-4 border-green-500">
          <FaTrophy className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {completedCourses}
            </p>
            <h3 className="text-sm text-gray-500">Courses Completed</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-center border-l-4 border-teal-500 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Overall Learning Progress
          </h3>
          <ProgressBar
            percentage={
              totalCourses
                ? Math.round((completedCourses / totalCourses) * 100)
                : 0
            }
          />
          <p className="text-sm text-gray-500 mt-1">
            You've completed{" "}
            <span className="text-teal-600 font-bold">
              {totalCourses
                ? Math.round((completedCourses / totalCourses) * 100)
                : 0}
              %
            </span>{" "}
            of your enrolled courses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
            Courses In Progress
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {loading ? (
              <p className="text-gray-500 col-span-2">Loading courses...</p>
            ) : enrollments.length > 0 ? (
              enrollments.map((course) => (
                <EnrollmentCard enrollment={course} />
              ))
            ) : (
              <p className="text-gray-500 col-span-2">
                No courses in progress. Start learning now!
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Recent Activity
            </h3>
            {enrollments.length > 0 ? (
              <div className="flex items-start space-x-3">
                <FaCheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700">
                    Last accessed:{" "}
                    {enrollments[0].progress?.lastAccessedVideo
                      ? new Date(
                          enrollments[0].progress.lastAccessedVideo.createdAt
                        ).toLocaleString()
                      : "No activity yet"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No recent activity.</p>
            )}
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <a
                href="/courses"
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-gray-700"
              >
                <span>Browse All Courses</span>
                <FaChevronRight className="w-3 h-3" />
              </a>
              <a
                href="/profile"
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-gray-700"
              >
                <span>Update Profile</span>
                <FaChevronRight className="w-3 h-3" />
              </a>
              <a
                href="/certificates"
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-gray-700"
              >
                <span>View Certificates</span>
                <FaChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
