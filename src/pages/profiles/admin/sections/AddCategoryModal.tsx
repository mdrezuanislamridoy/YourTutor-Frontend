import { FaPlus, FaTimes, FaUpload } from "react-icons/fa";
import axiosInstance from "../../../../lib/axiosInstance";
import { useState } from "react";

const AddCategoryModal = ({ isOpen, onClose, onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError(null);
    if (!name.trim()) {
      setModalError("Category name is required.");
      return;
    }
    if (!iconFile) {
      setModalError("Icon image is required.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("icon", iconFile);

    try {
      const response = await axiosInstance.post(
        "/category/addCategory",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      onCategoryAdded(response.data.message || "Category created!");
      setName("");
      setIconFile(null);
      onClose();
    } catch (error) {
      console.error("Add Category Error:", error);
      setModalError(error.response?.data?.message || "Failed to add category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        <div className="p-5 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <FaPlus className="mr-2 text-teal-600" /> Add New Category
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
          />

          <div className="border border-dashed border-gray-400 p-4 rounded-lg text-center cursor-pointer hover:border-teal-500 transition">
            <label
              htmlFor="icon-upload"
              className="flex flex-col items-center justify-center space-y-2"
            >
              <FaUpload className="w-6 h-6 text-teal-600" />
              <span className="text-sm font-medium text-gray-700">
                {iconFile
                  ? `Selected: ${iconFile.name}`
                  : "Upload Icon Image (Required)"}
              </span>
            </label>
            <input
              id="icon-upload"
              type="file"
              name="icon"
              accept="image/*"
              onChange={(e) => setIconFile(e.target.files[0])}
              className="hidden"
              required
            />
          </div>

          {modalError && (
            <p className="text-red-500 text-sm p-2 bg-red-50 border border-red-200 rounded">
              {modalError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:opacity-50 transition flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              "Creating..."
            ) : (
              <>
                <FaPlus /> <span>Create Category</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
