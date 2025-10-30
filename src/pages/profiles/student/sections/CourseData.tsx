import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../lib/axiosInstance";
import { Loader2, ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import type { IEnrollment } from "../../../../types/enrollment.types";

export default function CourseData() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<IEnrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<number | null>(0);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(
          `/enrollment/getSingleEnrollment/${id}`
        );
        setCourse(res.data.enrollment || null);
        const firstVideo =
          res.data.enrollment?.courseId?.modules?.[0]?.content?.[0]?.videoUrl;
        if (firstVideo) setCurrentVideo(firstVideo);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 min-h-[80vh]">
        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
      </div>
    );

  if (!course)
    return <p className="text-center py-20 text-gray-500">Course not found</p>;

  const modules = course.courseId?.modules || [];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">
        <div className="w-full md:w-[70%]">
          <div className="rounded-lg overflow-hidden shadow-md bg-black">
            {currentVideo ? (
              <video
                key={currentVideo}
                controls
                className="w-full h-[220px] sm:h-[300px] md:h-[400px]"
              >
                <source src={currentVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="flex justify-center items-center h-[220px] sm:h-[300px] md:h-[400px] bg-gray-800 text-gray-400">
                No video selected
              </div>
            )}
          </div>

          <h1 className="text-2xl font-semibold mt-4 text-gray-800">
            {course.courseId?.title}
          </h1>

          <div className="mt-3 bg-white rounded-lg shadow-sm p-4 border">
            <div
              onClick={() => setShowDescription(!showDescription)}
              className="flex justify-between items-center cursor-pointer"
            >
              <h2 className="font-medium text-gray-700">Description</h2>
              {showDescription ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
            {showDescription && (
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {course.courseId?.about || "No description available."}
              </p>
            )}
          </div>
        </div>

        <div className="w-full md:w-[30%] bg-white rounded-lg shadow-md border p-4 h-fit">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Course Modules
          </h2>
          <div className="space-y-3">
            {modules.length ? (
              modules.map((mod: any, index: number) => (
                <div
                  key={mod._id}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setActiveModule(activeModule === index ? null : index)
                    }
                    className="flex justify-between items-center w-full p-3 bg-teal-50 hover:bg-teal-100 transition"
                  >
                    <span className="font-medium text-gray-700">
                      {mod.title || `Module ${index + 1}`}
                    </span>
                    {activeModule === index ? (
                      <ChevronUp className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    )}
                  </button>

                  {activeModule === index && (
                    <div className="p-3 bg-white border-t">
                      {mod.content?.length ? (
                        mod.content.map((vid: any) => (
                          <div
                            key={vid._id}
                            onClick={() => setCurrentVideo(vid.videoUrl)}
                            className={`flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer transition ${
                              currentVideo === vid.videoUrl
                                ? "bg-teal-100 text-teal-700"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <PlayCircle className="w-4 h-4" />
                            <span className="text-sm">{vid.title}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No videos available
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No modules found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
