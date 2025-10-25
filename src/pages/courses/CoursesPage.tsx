import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { CourseCard } from "../../components/CourseCard";
import { Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

export default function CoursesPage() {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
    }
  }, [location.search]);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/category");
      setCategories(res?.data?.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchCourse = async (
    page = 1,
    search = searchTerm,
    category = "",
    sort = ""
  ) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/course/get-courses", {
        params: { pageNumber: page, limit: 20, search, category, sort },
      });

      setCourses(res?.data?.courses || []);
      setTotalCourses(Number(res?.data?.total) || 0);
      setTotalPages(Number(res?.data?.totalPage) || 0);
      setPageNumber(page);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse(pageNumber, searchTerm, category, sortBy);
  }, [category, searchTerm, sortBy, pageNumber]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPageNumber(1);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setPageNumber(1);

    if (selectedCategory) {
      navigate(`/courses?category=${selectedCategory}`);
    } else {
      navigate("/courses");
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setPageNumber(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchCourse(newPage, searchTerm, category, sortBy);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-2">Browse Our Courses</h1>
        <p className="text-lg text-gray-100">
          Learn from experts. Upgrade your skills today.
        </p>
      </div>

      <div className="container mx-auto px-6 mt-10 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white shadow p-4 rounded-xl">
          <div className="flex items-center gap-2 w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={category}
              onChange={handleCategory}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={handleSort}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="">Sort by</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="createdAt:desc">Newest First</option>
            </select>
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p>
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {courses.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">{totalCourses}</span>{" "}
            courses
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((course: any) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500 text-lg">
            No courses found matching your filters.
          </div>
        )}

        <div>
          <Pagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
          />
        </div>
      </div>
    </div>
  );
}
