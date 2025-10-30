import { useEffect, useState } from "react";
import {
  FaStar,
  FaUserFriends,
  FaClock,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../lib/axiosInstance";
import { UserStore } from "../../store/user.store";

const CourseDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("About");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>({});
  const { user } = UserStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchCourse = async () => {
    try {
      const getCourse = await axiosInstance.get(`/course/${id}`);
      console.log(getCourse);

      setCourse(getCourse.data.course || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [course, id]);

  const finalPrice = course.price - (course.discount || 0);
  const hasDiscount = course.discount > 0;

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {course.about}
            </p>
            <h4 className="text-lg font-semibold text-gray-800 pt-2 border-t mt-4">
              Required Skills/Knowledge
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {course?.forWhom?.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        );
      case "For Whom":
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Who is this course designed for?
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {course.forWhom.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        );
      case "Instructor":
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Meet the Experts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.instructors.map((instructor: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-teal-50 rounded-lg"
                >
                  <img
                    src={instructor.imageUrl}
                    alt={instructor.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-400"
                  />
                  <p className="font-semibold text-gray-800">
                    {instructor.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case "Content":
        return (
          <p className="text-gray-600">
            Course content structure (Modules and Lessons) would be displayed
            here.
          </p>
        );
      case "Projects":
        return (
          <p className="text-gray-600">
            Student projects and required assignments would be displayed here.
          </p>
        );
      default:
        return null;
    }
  };

  const handleEnroll = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "student") return;

    navigate(`/enrollment/${course._id}`);
  };

  if (loading) {
    <div>Please wait Course is loading</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-teal-600 text-white pt-16 pb-12 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {course.title}
            </h1>
            <p className="text-sm font-medium opacity-80">
              Batch-{course.batchNo}
            </p>

            <div className="flex items-center space-x-6 text-sm">
              <span className="flex items-center space-x-1 font-semibold">
                <FaStar className="text-yellow-400 w-4 h-4" />
                <span>
                  {course.ratings} ({course.reviewCount})
                </span>
              </span>
              <span className="flex items-center space-x-1">
                <FaUserFriends className="w-4 h-4" />
                <span>{course.enrolledStudents} students joined</span>
              </span>
              <span className="flex items-center space-x-1">
                <FaClock className="w-4 h-4" />
                <span>{course.duration}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FaBookOpen className="w-4 h-4" />
                <span>{course.totalLessons} total lessons</span>
              </span>
            </div>

            <p className="pt-2 text-sm">
              <span className="font-bold text-lg mr-2">
                {course.enrolledStudents}
              </span>{" "}
              learners completed this course
            </p>
          </div>

          <div className="lg:col-span-1 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-2xl">
              <img
                src={course?.thumbnail?.imageUrl}
                alt="Course Thumbnail"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Included in this course
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {course?.includedInThisCourse?.map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <FaCheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="flex flex-wrap border-b border-gray-200">
                {["About", "For Whom", "Instructor", "Content", "Projects"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                        activeTab === tab
                          ? "border-b-2 border-teal-600 text-teal-600"
                          : "text-gray-600 hover:text-teal-600"
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 sticky top-4">
              <div className="p-6">
                <div className="flex items-baseline space-x-2 mb-4">
                  {hasDiscount && (
                    <span className="text-xl text-gray-500 line-through">
                      {course.price.toLocaleString()} TK
                    </span>
                  )}
                  <span className="text-3xl font-extrabold text-teal-600">
                    {finalPrice.toLocaleString()} TK
                  </span>
                </div>

                <button
                  onClick={handleEnroll}
                  className="w-full py-3 bg-teal-600 text-white font-bold text-lg rounded-lg hover:bg-teal-700 transition shadow-md"
                >
                  Enroll Now
                </button>

                <div className="mt-4 flex space-x-2">
                  <input
                    type="text"
                    placeholder="Coupon"
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm"
                  />
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition">
                    Apply
                  </button>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 rounded-b-xl">
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Free Webinar Information
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center space-x-2">
                      <FaClock className="text-red-500" />{" "}
                      <span>{course?.meetingInfo?.daysLeft} Day left</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <FaUserFriends className="text-teal-600" />{" "}
                      <span>{course.meetingInfo?.joinedCount} Joined</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 pt-2">
                    Free Webinar of Full Stack Development with Python, Django &
                    React Batch 13.
                  </p>
                  <button className="w-full py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
                    Join Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
