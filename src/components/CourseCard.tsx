import React from "react";
import {
  FaEdit,
  FaStar,
  FaTrashAlt,
  FaUserGraduate,
  FaPlayCircle,
} from "react-icons/fa";
import { UserStore } from "../store/user.store";

export const CourseCard = ({ course, onEnroll, onEdit, onDelete }) => {
  const { user } = UserStore();
  const role = user?.role;

  const priceText = course.isFree
    ? "FREE"
    : `$${parseFloat(course.price).toFixed(2)}`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-lg flex flex-col">
      {/* Thumbnail */}
      <div className="h-40 bg-gray-100 overflow-hidden">
        <img
          src={course.thumbnail?.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Badge & Duration */}
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

        {/* Rating & Students */}
        <div className="flex justify-between items-center text-sm border-t pt-3 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-yellow-500">
              <FaStar className="w-4 h-4 mr-1" /> {course.ratings || 0}
            </span>
            <span className="flex items-center text-blue-500">
              <FaUserGraduate className="w-4 h-4 mr-1" />{" "}
              {course.enrolledStudents?.toLocaleString() || 0}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-extrabold text-teal-600">
            {priceText}
          </span>

          {/* Actions based on role */}
          <div className="space-x-2">
            {role === "student" ? (
              <button
                onClick={() => onEnroll?.(course)}
                className="flex items-center px-3 py-1 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition"
              >
                <FaPlayCircle className="mr-2" />{" "}
                {course.isEnrolled ? "Continue" : "Enroll"}
              </button>
            ) : (
              <>
                <button
                  title="Edit Course"
                  onClick={() => onEdit?.(course)}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition duration-150"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <button
                  title="Delete Course"
                  onClick={() => onDelete?.(course)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full transition duration-150"
                >
                  <FaTrashAlt className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
