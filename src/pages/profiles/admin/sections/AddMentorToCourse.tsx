import { useEffect, useState } from "react";
import { adminStore } from "../../../../store/admin.store";
import axiosInstance from "../../../../lib/axiosInstance";
import { toast } from "sonner";

export default function AddMentorToCourse() {
  const { addMentorToCourse }: any = adminStore();
  const [courses, setCourses] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedMentor, setSelectedMentor] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, mentorRes] = await Promise.all([
          axiosInstance.get("/course/get-courses", {
            params: { limit: 10, sort: "desc" },
          }),
          axiosInstance.get("/admin/mentors"),
        ]);

        setCourses(courseRes?.data?.courses || []);
        setMentors(mentorRes?.data?.mentors || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddMentor = async () => {
    if (!selectedCourse || !selectedMentor) {
      toast.error("Please select both course and mentor");
      return;
    }

    try {
      const res = await addMentorToCourse(selectedMentor, selectedCourse);
      toast.success(res.message);
      setSelectedCourse("");
      setSelectedMentor("");
    } catch (error) {
      toast.error("Failed to add mentor to course");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md rounded-xl p-6 space-y-5">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Add Mentor to Course
      </h2>

      <div className="space-y-3">
        <div>
          <label className="block text-gray-600 mb-1">Select Course</label>
          <select
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Choose a Course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Select Mentor</label>
          <select
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
          >
            <option value="">-- Choose a Mentor --</option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddMentor}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-lg transition"
        >
          Add Mentor
        </button>
      </div>
    </div>
  );
}
