import { useEffect, useState } from "react";
import axiosInstance from "../../../lib/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function CourseCategory() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/courses?category=${categoryId}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/category");
        setCategories(res?.data?.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
        Explore Top Course Categories 🎓
      </h2>

      {loading ? (
        <div className="flex justify-center py-10 text-center">
          Loading categories...
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {categories.length > 0 ? (
            categories.map((category: any) => (
              <div
                key={category._id}
                className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg 
                         hover:shadow-2xl hover:scale-[1.03] transition duration-300 
                         ease-in-out cursor-pointer border border-gray-100"
                onClick={() => handleCategoryClick(category._id)}
              >
                <div
                  className="w-16 h-16 mb-4 p-2 flex items-center justify-center 
                           bg-indigo-50 rounded-xl"
                >
                  <img
                    src={category?.icon?.iconUrl}
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-base font-semibold text-gray-800 text-center mt-auto">
                  {category.name}
                </h3>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No categories available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
