import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PopularCourseCard from "../../../components/PopularCourseCard";
import axiosInstance from "../../../lib/axiosInstance";

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

export default function PopularCourses() {
  const [popularList, setPopularList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/course/get-courses", {
        params: {
          limit: 4,
          sort: "desc",
        },
      });
      setPopularList(res?.data?.courses || []);
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Popular Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners in our most sought-after programs based
            on enrollment and reviews.
          </p>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {popularList.length === 0 && (
              <div className="text-center mt-12">
                <h1 className="text-7xl md:text-8xl font-extrabold text-gray-900 mb-4">
                  4
                  <span className=" text-8xl md:text-9xl -rotate-12 inline-block">
                    0
                  </span>
                  4
                </h1>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                  No Featured Courses
                </h2>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularList.map((course: Course) => (
                <PopularCourseCard key={course._id} course={course} />
              ))}
            </div>
          </>
        )}

        <div className="text-center mt-12">
          <Link
            to={"/courses"}
            className="py-3 px-8 text-lg font-semibold bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-300 shadow-lg"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
