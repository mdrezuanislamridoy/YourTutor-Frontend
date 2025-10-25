import React, { useEffect, useState } from "react";
import axiosInstance from "../../../lib/axiosInstance";
import { CourseCard } from "../../../components/CourseCard";
import { Link } from "react-router-dom";

export default function RecommendedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/course/get-courses", {
        params: {
          limit: 4,
          sort: "desc",
        },
      });
      setCourses(res?.data?.courses || []);
    } catch (error) {
      console.error("Error fetching recommended courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Recommended Courses
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Explore top-rated courses chosen for you
          </p>
        </div>
        <Link
          to="/courses"
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
        >
          See All →
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              No recommended courses found.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
