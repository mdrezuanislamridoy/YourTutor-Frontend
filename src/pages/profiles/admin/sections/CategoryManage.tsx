import { FaCheckCircle, FaClock, FaPlus, FaTag, FaTrash } from "react-icons/fa";
import AddCategoryModal from "./AddCategoryModal";
import { IoIosWarning } from "react-icons/io";
import axiosInstance from "../../../../lib/axiosInstance";
import { useEffect, useState } from "react";
import type { ICategory } from "../../../../types/category.types";

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionInProgressId, setActionInProgressId] = useState<string | null>(
    null
  );

  const loadCategories = async () => {
    setIsLoading(true);
    setError(null);
    setStatusMessage("");
    try {
      const response = await axiosInstance.get("/category");
      if (response && response.data && response.data.categories) {
        setCategories(response.data.categories);
      } else {
        setCategories([]);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch categories.");
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleStatusUpdate = (message: string) => {
    setStatusMessage(message);
    loadCategories();
    const timer = setTimeout(() => setStatusMessage(""), 5000);
    return () => clearTimeout(timer);
  };
  const handleDeleteCategory = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This action is irreversible."
      )
    ) {
      setActionInProgressId(id as string);
      setError(null);

      try {
        const response = await axiosInstance.delete(`/category/delete/${id}`);
        handleStatusUpdate(
          response.data.message || "Category deleted successfully!"
        );
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to delete category.");
      } finally {
        setActionInProgressId(null);
      }
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <FaTag className="mr-3 text-teal-600" />
        Category Management
      </h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition"
      >
        <FaPlus className="mr-2" /> Add New Category
      </button>

      {(error || statusMessage) && (
        <div
          className={`p-4 mb-4 rounded-lg ${
            error
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          <p className="flex items-center font-medium">
            {error ? (
              <IoIosWarning className="w-5 h-5 mr-2" />
            ) : (
              <FaCheckCircle className="w-5 h-5 mr-2" />
            )}
            {error || statusMessage}
          </p>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-12 text-teal-600 font-medium text-lg flex justify-center items-center">
          <FaClock className="animate-spin mr-3" /> Loading categories...
        </div>
      )}

      {!isLoading && categories.length === 0 && !error && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
          <p className="text-xl text-gray-500">
            No categories found. Click "Add New Category" to start.
          </p>
        </div>
      )}

      {!isLoading && categories.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Icon
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((cat: ICategory) => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-mono text-gray-500">
                    {cat._id.substring(0, 8)}...
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {cat.icon.iconUrl ? (
                      <img
                        src={cat.icon.iconUrl}
                        alt={cat.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">
                        No Icon
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cat.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      disabled={actionInProgressId === cat._id}
                      className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 transition min-w-[100px]"
                    >
                      {actionInProgressId === cat._id ? (
                        "Deleting..."
                      ) : (
                        <>
                          <FaTrash className="mr-2 hidden sm:inline" /> Delete
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCategoryAdded={handleStatusUpdate}
      />
    </div>
  );
};

export default CategoryManage;
