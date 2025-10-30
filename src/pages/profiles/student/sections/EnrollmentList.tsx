import { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstance";
import EnrollmentCard from "../../../../components/EnrollmentCard";

export default function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axiosInstance.get("/enrollment/getMyEnrollments");
        const data = res.data;
        setEnrollments(data.enrollments || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Enrollments</h2>
      {enrollments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment: any) => (
            <EnrollmentCard key={enrollment._id} enrollment={enrollment} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No enrollments found.</p>
      )}
    </div>
  );
}
