import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaStar, FaUserGraduate } from "react-icons/fa";
import { UserStore } from "../store/user.store";
import axiosInstance from "../lib/axiosInstance";

export const CourseCard = ({ course }) => {
  const { user } = UserStore();
  const navigate = useNavigate();
  const role = user?.role;

  const priceText = course.isFree
    ? "FREE"
    : `$${parseFloat(course.price).toFixed(2)}`;

  // Enroll button redirects to enrollment page
  const handleEnroll = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (role !== "student") return;

    navigate(`/enrollment/${course._id}`);
  };

  const handleEdit = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/admin/courses/edit/${course._id}`);
  };

  const handleDelete = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    const result = await axiosInstance.put(`/course/delete/${course._id}`);
    if (result) {
      navigate("/courses");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-lg flex flex-col">
      <div className="h-40 bg-gray-100 overflow-hidden">
        <img
          src={course.thumbnail.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>

        <div className="flex justify-between items-center text-sm mb-3">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              course.live
                ? "bg-red-100 text-red-600"
                : "bg-teal-100 text-teal-600"
            }`}
          >
            {course.live ? "LIVE" : "RECORDED"}
          </span>
          <span className="text-gray-500">{course.duration}</span>
        </div>

        <div className="flex justify-between items-center text-sm border-t pt-3 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-yellow-500">
              <FaStar className="w-4 h-4 mr-1" /> {course.ratings}
            </span>
            <span className="flex items-center text-blue-500">
              <FaUserGraduate className="w-4 h-4 mr-1" />{" "}
              {course.enrolledStudents.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-extrabold text-teal-600">
            {priceText}
          </span>
          <div className="flex space-x-2">
            {role === "admin" && (
              <>
                <button
                  title="Edit Course"
                  onClick={handleEdit}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition duration-150"
                >
                  <FaEdit className="w-4 h-4" />
                </button>

                <button
                  title="Delete Course"
                  onClick={handleDelete}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full transition duration-150"
                >
                  <FaTrashAlt className="w-4 h-4" />
                </button>
              </>
            )}

            {role === "student" && (
              <button
                onClick={handleEnroll}
                className="px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center justify-center"
              >
                Enroll
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
