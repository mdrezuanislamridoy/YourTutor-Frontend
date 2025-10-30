import { FaStar, FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface EnrollmentCardProps {
  enrollment: any;
}

const EnrollmentCard = ({ enrollment }: EnrollmentCardProps) => {
  const progress = enrollment.progress?.percentage || 0;
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {enrollment.courseId?.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FaStar className="w-3 h-3 text-yellow-500 mr-1" />
          {enrollment.courseId?.ratings || 0} Rating
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full mt-1">
          <div
            className="h-2.5 bg-teal-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Status:{" "}
          <span className="font-medium text-teal-600">{enrollment.status}</span>
        </p>
      </div>

      <button
        onClick={() => navigate(`/enrolled/${enrollment._id}`)}
        className="mt-4 w-full flex items-center justify-center py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition cursor-pointer"
      >
        <FaPlayCircle className="mr-2" /> Continue Course
      </button>
    </div>
  );
};

export default EnrollmentCard;
