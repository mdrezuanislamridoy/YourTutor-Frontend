import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaStar,
  FaUserGraduate,
} from "react-icons/fa";
import AddCourseModal from "../components/AddCourseModal";

const fetchCourses = async ({
  pageNumber = 1,
  limit = 16,
  search = "",

}) => {
  console.log("Fetching courses with:", {
    pageNumber,
    limit,
    search,
  
  });

  
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockData = Array.from({ length: 16 }, (_, i) => ({
    _id: `course_${(pageNumber - 1) * limit + i + 1}`,
    title: `${search || "Master"}ing React & Next.js ${i + 1}`,
    thumbnail: {
      imageUrl: `https://via.placeholder.com/600x400?text=Course+${
        (pageNumber - 1) * limit + i + 1
      }`,
    },
    ratings: (Math.random() * 5).toFixed(1),
    enrolledStudents: Math.floor(Math.random() * 10000) + 100,
    price: i % 4 === 0 ? 0 : (Math.random() * 80 + 20).toFixed(2),
    isFree: i % 4 === 0,
    live: i % 5 === 0,
    duration: `${Math.floor(Math.random() * 10 + 20)} Hours`,
  }));

  const totalItems = 80;

  return {
    courses: mockData,
    totalCourses: totalItems,
    totalPages: Math.ceil(totalItems / limit),
  };
};

const CourseCard = ({ course }) => {
  const priceText = course.isFree
    ? "FREE"
    : `$${parseFloat(course.price).toFixed(2)}`;

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
          <div className="space-x-2">
            <button
              title="Edit Course"
              className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition duration-150"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              title="Delete Course"
              className="p-2 text-red-500 hover:bg-red-100 rounded-full transition duration-150"
            >
              <FaTrashAlt className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Match your backend limit
  const COURSES_PER_PAGE = 16;

  const loadCourses = async (page = pageNumber, search = searchTerm) => {
    setIsLoading(true);
    try {
      // Note: Add other query parameters like category, level, sort as needed
      const data = await fetchCourses({
        pageNumber: page,
        limit: COURSES_PER_PAGE,
        search: search,
        // category: '', level: '', sort: 'ratings'
      });

      setCourses(data.courses);
      setTotalPages(data.totalPages);
      setTotalCourses(data.totalCourses);
      setPageNumber(page);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCourses(1); // Load initial courses on mount
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Always search from the first page
    loadCourses(1, searchTerm);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Optional: Implement debouncing here for real-time search
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      loadCourses(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      loadCourses(pageNumber - 1);
    }
  };

  return (
    <>
      <div className="space-y-8">
        {/* Top Section: Search and Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full md:w-2/3 relative"
          >
            <input
              type="text"
              placeholder="Search courses by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </form>

          {/* Add Course Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-300 shadow-md"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
        </div>

        {/* Course Grid */}
        <h2 className="text-xl font-bold text-gray-700">
          Courses (
          {courses.length ? (pageNumber - 1) * COURSES_PER_PAGE + 1 : 0}-
          {(pageNumber - 1) * COURSES_PER_PAGE + courses.length} of{" "}
          {totalCourses} total)
        </h2>
        {isLoading ? (
          <div className="text-center py-10 text-teal-500 font-medium">
            Loading courses...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No courses found matching your criteria.
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 pt-4">
          <button
            onClick={handlePrevPage}
            disabled={pageNumber === 1 || isLoading}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {pageNumber} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pageNumber === totalPages || isLoading}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCourseAdded={() => loadCourses(1)} // Refresh courses on page 1 after creation
      />
    </>
  );
}
