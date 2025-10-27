const PopularCourseCard = ({ course }: any) => {
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

export default PopularCourseCard;
