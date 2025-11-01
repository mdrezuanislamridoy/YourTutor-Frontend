import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstance";
import { toast } from "react-toastify";

export default function AddModule() {
  const [courses, setCourses] = useState<any[]>([]);
  const [moduleData, setModuleData] = useState({
    title: "",
    description: "",
    isLive: false,
  });
  const [message, setMessage] = useState("");

  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchCourse = async () => {
    try {
      const res = await axiosInstance.get("/course/get-courses");
      setCourses(res?.data?.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses!");
    }
  };

  useEffect(() => {
    handleFetchCourse();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModuleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse) {
      toast.warning("Please select a course first!");
      return;
    }

    if (!moduleData.title.trim()) {
      toast.warning("Module title is required!");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        `/module/addModule/${selectedCourse}`,
        moduleData
      );
      toast.success("Module added successfully!");
      console.log(res.data);

      setMessage(res.data.message);
      // Reset form
      setModuleData({ title: "", description: "", isLive: false });
      setSelectedCourse("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add module!");
      setMessage("Failed to add module!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className=" min-h-screen md:min-h-[70vh] flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Add New Module
        </h2>

        <form onSubmit={handleAddModule} className="space-y-6">
          {message && <p className="">{message}</p>}
          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Course
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select a course</option>
              {courses.map((course: any) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Module Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={moduleData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter module title"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={moduleData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter short description"
            />
          </div>

          {/* isLive */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isLive"
              name="isLive"
              checked={moduleData.isLive}
              onChange={(e) =>
                setModuleData({ ...moduleData, isLive: e.target.checked })
              }
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isLive"
              className="ml-2 text-sm text-gray-700 font-medium"
            >
              This module is live
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-teal-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Adding Module..." : "Add Module"}
          </button>
        </form>
      </div>
    </div>
  );
}
