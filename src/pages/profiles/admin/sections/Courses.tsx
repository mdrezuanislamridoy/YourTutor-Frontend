import { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import AddCourseModal from "../components/AddCourseModal";
import { CourseCard } from "../../../../components/CourseCard";
import axiosInstance from "../../../../lib/axiosInstance";
import Pagination from "../../../../components/Pagination";
import type { ICourse } from "../../../../types/course.type";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const COURSES_PER_PAGE = 16;

  const loadCourses = async (page = pageNumber, search = searchTerm) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/course/get-courses", {
        params: {
          pageNumber: page,
          limit: COURSES_PER_PAGE,
          search: search,
        },
      });
      console.log(res);

      setCourses(res?.data?.courses || []);
      setTotalCourses(Number(res.data?.total) || 0);
      setTotalPages(Number(res?.data?.totalPage) || 0);
      setPageNumber(page);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCourses(1);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadCourses(1, searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // const handleNextPage = () => {
  //   if (pageNumber < totalPages) {
  //     loadCourses(pageNumber + 1);
  //   }
  // };

  // const handlePrevPage = () => {
  //   if (pageNumber > 1) {
  //     loadCourses(pageNumber - 1);
  //   }
  // };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      loadCourses(newPage, searchTerm);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
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

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-300 shadow-md"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
        </div>

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
              courses.map((course: ICourse) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No courses found matching your criteria.
              </div>
            )}
          </div>
        )}

        <Pagination
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          pageNumber={pageNumber}
        />
      </div>

      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCourseAdded={() => loadCourses(1)}
      />
    </>
  );
}
