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
import { Loader2 } from "lucide-react";

// ---------- Types ----------
interface Instructor {
  _id: string;
  name: string;
  designation?: string;
  expertise?: string;
  profileImg?: string;
}

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  duration?: string;
  thumbnail?: string;
  isFree?: boolean;
}

interface Module {
  _id: string;
  title: string;
  videos: Video[];
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  user: { name: string };
}

interface Course {
  _id: string;
  title: string;
  about?: string;
  batchNo?: number;
  ratings?: number;
  enrolledStudents?: number;
  duration?: string;
  totalLessons?: number;
  price: number;
  discount?: number;
  thumbnail?: string | { imageUrl?: string };
  forWhom?: string[];
  includedInThisCourse?: string[];
  instructors?: Instructor[];
  modules?: Module[];
  reviews?: Review[];
}

// ---------- Component ----------
export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<
    "About" | "Instructor" | "Modules" | "Reviews"
  >("About");
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const { user } = UserStore();
  const navigate = useNavigate();

  // -------- Fetch Course --------
  const fetchCourse = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/course/${id}`);
      setCourse(res.data?.course || null);
    } catch (error) {
      console.error("❌ Failed to fetch course:", error);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCourse();
    window.scrollTo(0, 0);
  }, [id]);

  const finalPrice = (course?.price || 0) - (course?.discount || 0);
  const hasDiscount = !!course?.discount && course.discount > 0;

  const handleEnroll = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "student") return;
    if (course?._id) navigate(`/enrollment/${course._id}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {course?.about || "No course description available."}
            </p>

            {course?.forWhom?.length ? (
              <>
                <h4 className="text-lg font-semibold text-gray-800 pt-2 border-t mt-4">
                  Required Skills / Knowledge
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {course.forWhom.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        );

      case "Instructor":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {course?.instructors?.length ? (
              course.instructors.map((inst) => (
                <div
                  key={inst._id}
                  className="flex items-center space-x-4 p-4 bg-teal-50 rounded-lg"
                >
                  <img
                    src={
                      inst.profileImg ||
                      "https://via.placeholder.com/100x100?text=Instructor"
                    }
                    alt={inst.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-400"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{inst.name}</p>
                    {inst.designation && (
                      <p className="text-sm text-gray-600">
                        {inst.designation}
                      </p>
                    )}
                    {inst.expertise && (
                      <p className="text-sm text-teal-600">{inst.expertise}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No instructor information found.</p>
            )}
          </div>
        );

      case "Modules":
        return (
          <div className="space-y-4">
            {course?.modules?.length ? (
              course.modules.map((mod) => (
                <div key={mod._id} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {mod.title}
                  </h3>
                  {mod.videos?.length ? (
                    <ul className="space-y-2">
                      {mod.videos.map((vid) => (
                        <li
                          key={vid._id}
                          className="flex items-center space-x-3 border-b pb-2 last:border-none"
                        >
                          <FaCheckCircle className="text-teal-600" />
                          <span className="text-gray-700">{vid.title}</span>
                          {vid.isFree && (
                            <span className="text-xs text-green-600 ml-2 bg-green-100 px-2 py-0.5 rounded">
                              Free
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No videos in this module.</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No modules found.</p>
            )}
          </div>
        );

      case "Reviews":
        return (
          <div className="space-y-4">
            {course?.reviews?.length ? (
              course.reviews.map((rev) => (
                <div key={rev._id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <FaStar className="text-yellow-400" />
                    <p className="font-medium text-gray-800">{rev.user.name}</p>
                  </div>
                  <p className="text-gray-700 text-sm">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        );

      default:
        return <p className="text-gray-500">No data available.</p>;
    }
  };

  // -------- UI Render --------
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20 text-gray-600">
        <p>❌ Course not found or unavailable.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-teal-600 text-white pt-16 pb-12 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {course.title}
            </h1>
            <p className="text-sm opacity-80">
              Batch-{course.batchNo || "N/A"}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-teal-100">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{course.ratings || 0} Ratings</span>
              </div>
              <div className="flex items-center gap-1">
                <FaUserFriends />
                <span>{course.enrolledStudents || 0} Students</span>
              </div>
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{course.duration || "Flexible Duration"}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaBookOpen />
                <span>{course.totalLessons || 0} Lessons</span>
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="lg:col-span-1 flex justify-center lg:justify-end">
            <img
              src={
                typeof course.thumbnail === "string"
                  ? course.thumbnail
                  : course.thumbnail?.imageUrl ||
                    "https://via.placeholder.com/400x250?text=Course"
              }
              alt="Course Thumbnail"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {["About", "Instructor", "Modules", "Reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-3 text-sm font-semibold whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-teal-600 text-teal-600"
                    : "text-gray-600 hover:text-teal-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">{renderTabContent()}</div>
        </div>

        {/* Enroll Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleEnroll}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all"
          >
            Enroll Now{" "}
            {hasDiscount && (
              <span className="ml-2 text-sm opacity-80 line-through">
                ${course.price}
              </span>
            )}
            <span className="ml-2 text-lg font-bold">${finalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
