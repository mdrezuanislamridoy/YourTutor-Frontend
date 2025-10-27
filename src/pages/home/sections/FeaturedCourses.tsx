import { useEffect, useState } from "react";
import { CourseCard } from "../../../components/CourseCard";
import axiosInstance from "../../../lib/axiosInstance";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";


interface Course {
  _id: string;
  title: string;
  thumbnail: { imageUrl: string };
  ratings: number;
  duration: string;
  live: boolean;
  description: string;
  price: number;
}

const FeaturedCourses = () => {
  const [featuredList, setFeaturedList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedCourse = async () => {
    try {
      const res = await axiosInstance.get<{ courses: Course[] }>(
        "/course/get-featured-courses",
        {
          params: {
            limit: 4,
          },
        }
      );
      setFeaturedList(res.data.courses || []);
      setError(null);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(
        axiosError.response?.data?.message || "Failed to fetch featured courses"
      );
      console.error("Error fetching recommended courses:", axiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedCourse();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our hand-picked selection of top-rated courses designed to
            fast-track your skills.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-2xl font-semibold">Loading...</div>
        ) : error ? (
          <div className="text-center text-2xl font-semibold text-red-500">
            {error}
          </div>
        ) : (
          <>
            {featuredList.length === 0 && (
              <div className="text-center mt-12">
                <h1 className="text-7xl md:text-8xl font-extrabold text-gray-900 mb-4">
                  4
                  <span className="text-8xl md:text-9xl -rotate-12 inline-block">
                    0
                  </span>
                  4
                </h1>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                  No Featured Courses
                </h2>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mt-12">
              {featuredList.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </>
        )}

        <div className="flex justify-center mt-8">
          <Link
            to="/courses"
            className="py-3 px-8 text-lg font-semibold bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-300 shadow-lg"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
