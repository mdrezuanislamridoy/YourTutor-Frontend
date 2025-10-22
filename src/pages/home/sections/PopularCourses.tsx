import React from "react";

// === 1. POPULAR COURSE CARD COMPONENT (Updated) ===
const PopularCourseCard = ({ course }) => {
  const title = course.title;
  const students = course.enrolledStudents.toLocaleString();
  const rating = course.ratings.toFixed(1);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md transition duration-300 hover:shadow-lg h-full border border-gray-100 flex flex-col justify-between">
      <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2">
        {title}
      </h3>
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <span className="text-sm text-gray-500">{students} Students</span>
        <div className="flex items-center space-x-1 text-sm text-yellow-500">
          <span>⭐</span>
          <span className="font-semibold text-gray-700">{rating}</span>
        </div>
      </div>
    </div>
  );
};

// === 2. FAKE DATA SOURCE ===
const allPopularCoursesData = [
  {
    _id: "65345c90d3d9e8b7c6a54341",
    title: "Python for Beginners: Crash Course to Data Structures",
    ratings: 4.9,
    enrolledStudents: 25100, // Highest enrollment
  },
  {
    _id: "65345c90d3d9e8b7c6a54342",
    title: "React Hooks and Context API Masterclass",
    ratings: 4.8,
    enrolledStudents: 15800,
  },
  {
    _id: "65345c90d3d9e8b7c6a54343",
    title: "Introduction to Figma Design and Prototyping",
    ratings: 4.7,
    enrolledStudents: 12500,
  },
  {
    _id: "65345c90d3d9e8b7c6a54344",
    title: "Digital Marketing Fundamentals: SEO & Social Media",
    ratings: 4.5,
    enrolledStudents: 8900,
  },
  {
    _id: "65345c90d3d9e8b7c6a54345",
    title: "JavaScript ES6+ and Beyond", // Extra item
    ratings: 4.6,
    enrolledStudents: 7500,
  },
  {
    _id: "65345c90d3d9e8b7c6a54346",
    title: "Complete C++ Programming", // Extra item
    ratings: 4.4,
    enrolledStudents: 6200,
  },
];

// === 3. POPULAR COURSES COMPONENT (Updated) ===
export default function PopularCourses() {
  // Slice the data to get only the first 4 items for the 4-column grid
  const popularList = allPopularCoursesData.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Popular Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners in our most sought-after programs based
            on enrollment and reviews.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularList.map((course) => (
            <PopularCourseCard key={course._id} course={course} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="py-3 px-8 text-lg font-semibold bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-300 shadow-lg">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
}
