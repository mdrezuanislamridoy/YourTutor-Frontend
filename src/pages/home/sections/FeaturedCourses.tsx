import React from "react";

// === 1. COURSE CARD COMPONENT (Updated) ===
const CourseCard = ({ course }) => {
  // Extract data based on the new schema structure
  const title = course.title;
  const price = course.isFree ? "FREE" : `$${course.price.toFixed(2)}`;
  const imageSrc = course.thumbnail.imageUrl;
  const instructorName = course.instructors?.[0]?.name || "Unknown Instructor";
  const tag = course.category?.[0]?.name || "Featured";
  const rating = course.ratings.toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl border border-gray-100">
      <div className="h-40 bg-gray-100 overflow-hidden">
        <img
          src={
            imageSrc || "https://via.placeholder.com/600x400?text=Course+Image"
          }
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-100 text-teal-600">
            {tag}
          </span>
          <span className="text-xl font-bold text-teal-500">{price}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 min-h-[56px] line-clamp-2">
          {title}
        </h3>
        <div className="flex justify-between items-center text-sm border-t pt-3 mt-3">
          <p className="text-sm text-gray-600">
            Instructor:{" "}
            <span className="font-medium text-gray-800">{instructorName}</span>
          </p>
          <p className="flex items-center text-yellow-500 font-medium">
            ⭐ {rating}
          </p>
        </div>
      </div>
    </div>
  );
};

// === 2. FAKE DATA SOURCE ===
const allFeaturedCoursesData = [
  {
    _id: "65345b90d3d9e8b7c6a54331",
    title: "Complete Guide to Web Development 2024",
    price: 49.99,
    isFree: false,
    ratings: 4.8,
    instructors: [{ _id: "inst_a", name: "Alex Smith" }],
    category: [{ _id: "cat_dev", name: "Development" }],
    thumbnail: {
      imageUrl: "https://via.placeholder.com/600x400?text=Web+Dev",
      publicId: "thumb-1",
    },
    duration: "45 Hours",
  },
  {
    _id: "65345b90d3d9e8b7c6a54332",
    title: "Advanced Data Science & Machine Learning with Python",
    price: 79.0,
    isFree: false,
    ratings: 4.9,
    instructors: [{ _id: "inst_b", name: "Dr. Ben Lee" }],
    category: [{ _id: "cat_data", name: "Data Science" }],
    thumbnail: {
      imageUrl: "https://via.placeholder.com/600x400?text=Data+Science",
      publicId: "thumb-2",
    },
    duration: "60 Hours",
  },
  {
    _id: "65345b90d3d9e8b7c6a54333",
    title: "UI/UX Design Masterclass: From Zero to Expert",
    price: 35.5,
    isFree: false,
    ratings: 4.7,
    instructors: [{ _id: "inst_c", name: "Sarah Chen" }],
    category: [{ _id: "cat_design", name: "Design" }],
    thumbnail: {
      imageUrl: "https://via.placeholder.com/600x400?text=UX+Design",
      publicId: "thumb-3",
    },
    duration: "30 Hours",
  },
  {
    _id: "65345b90d3d9e8b7c6a54334",
    title: "Cloud Computing Fundamentals (AWS/Azure)",
    price: 0.0,
    isFree: true,
    ratings: 4.6,
    instructors: [{ _id: "inst_d", name: "Mike Johnson" }],
    category: [{ _id: "cat_cloud", name: "Cloud" }],
    thumbnail: {
      imageUrl: "https://via.placeholder.com/600x400?text=Cloud+Computing",
      publicId: "thumb-4",
    },
    duration: "20 Hours",
  },
  {
    _id: "65345b90d3d9e8b7c6a54335",
    title: "Digital Marketing: SEO and Content Strategy",
    price: 25.0,
    isFree: false,
    ratings: 4.5,
    instructors: [{ _id: "inst_e", name: "Lisa Ray" }],
    category: [{ _id: "cat_marketing", name: "Marketing" }],
    thumbnail: {
      imageUrl: "https://via.placeholder.com/600x400?text=Marketing",
      publicId: "thumb-5",
    },
    duration: "15 Hours",
  },
];

// === 3. FEATURED COURSES COMPONENT (Updated) ===
export default function FeaturedCourses() {
  // Slice the data to get only the first 3 items (as requested by the design)
  const featuredList = allFeaturedCoursesData.slice(0, 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our hand-picked selection of top-rated courses designed to
            fast-track your skills.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredList.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
