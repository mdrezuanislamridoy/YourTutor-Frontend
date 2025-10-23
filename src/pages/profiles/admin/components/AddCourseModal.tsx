import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle, FaUpload } from "react-icons/fa";
import axiosInstance from "../../../../lib/axiosInstance";

const AddCourseModal = ({ isOpen, onClose, onCourseAdded }) => {
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 3;

  const [formData, setFormData] = useState({
    title: "",
    batchNo: 1,
    live: false,
    introVideo: "",
    about: "",
    price: 0,
    isFree: false,
    discount: 0,
    category: "",
    includedInThisCourse: [],
    forWhom: [],
    whatYouWillLearn: [],
    thumbnail: null,
  });

  const [arrayInputText, setArrayInputText] = useState({
    includedInThisCourse: "",
    forWhom: "",
    whatYouWillLearn: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Fetch categories when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/category");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setSubmissionError("Could not load categories.");
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();

    // Convert arrays → comma-separated strings for editing
    setArrayInputText({
      includedInThisCourse: (formData.includedInThisCourse || []).join(", "),
      forWhom: (formData.forWhom || []).join(", "),
      whatYouWillLearn: (formData.whatYouWillLearn || []).join(", "),
    });
  }, [isOpen]);

  if (!isOpen) return null;

  // Input handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleArrayChange = (name, value) => {
    setArrayInputText((prev) => ({ ...prev, [name]: value }));
    const parsedArray = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    setFormData((prev) => ({ ...prev, [name]: parsedArray }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handleNext = () => {
    setSubmissionError(null);
    if (
      step === 1 &&
      (!formData.title ||
        formData.title.length < 4 ||
        !formData.batchNo ||
        !formData.thumbnail)
    ) {
      return setSubmissionError(
        "Please fill in all required fields and upload a thumbnail."
      );
    }

    if (
      step === 2 &&
      (!formData.about ||
        formData.whatYouWillLearn.length === 0 ||
        formData.includedInThisCourse.length === 0 ||
        formData.forWhom.length === 0)
    ) {
      return setSubmissionError("Please fill in all required Step 2 fields.");
    }

    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const resetForm = () => {
    setFormData({
      title: "",
      batchNo: 1,
      live: false,
      introVideo: "",
      about: "",
      price: 0,
      isFree: false,
      discount: 0,
      category: "",
      includedInThisCourse: [],
      forWhom: [],
      whatYouWillLearn: [],
      thumbnail: null,
    });
    setArrayInputText({
      includedInThisCourse: "",
      forWhom: "",
      whatYouWillLearn: "",
    });
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(null);
    setIsSubmitting(true);

    try {
      const dataToSend = new FormData();

      if (formData.thumbnail) {
        dataToSend.append("thumbnail", formData.thumbnail);
      }

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "thumbnail") return;

        if (Array.isArray(value)) {
          value.forEach((v) => dataToSend.append(key, v));
        } else {
          dataToSend.append(key, String(value ?? ""));
        }
      });

      const res = await axiosInstance.post(
        "/course/create-course",
        dataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(res.data.message || "Course created successfully!");
      onCourseAdded?.();
      onClose();
      resetForm();
    } catch (error) {
      console.error("Course creation failed:", error);
      setSubmissionError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step renderer
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Course Title (min 4 characters)"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="batchNo"
              placeholder="Batch Number"
              value={formData.batchNo}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="introVideo"
              placeholder="Intro Video URL (optional)"
              value={formData.introVideo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <div className="flex items-center space-x-3">
              <label className="text-gray-700">Live Course?</label>
              <input
                type="checkbox"
                name="live"
                checked={formData.live}
                onChange={handleChange}
                className="h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
            </div>
            <div
              className={`border border-dashed p-4 rounded-lg text-center ${
                formData.thumbnail ? "bg-green-50 border-green-400" : ""
              }`}
            >
              <label
                htmlFor="thumbnail-upload"
                className="cursor-pointer text-teal-600 hover:text-teal-700 flex items-center justify-center space-x-2"
              >
                <FaUpload className="w-5 h-5" />
                <span>
                  {formData.thumbnail
                    ? `Selected: ${formData.thumbnail.name}`
                    : "Upload Thumbnail Image (required)"}
                </span>
              </label>
              <input
                id="thumbnail-upload"
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="hidden"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <textarea
              name="about"
              placeholder="About the course"
              value={formData.about}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded h-24"
            />
            <textarea
              name="whatYouWillLearn"
              placeholder="What you will learn (comma separated)"
              value={arrayInputText.whatYouWillLearn}
              onChange={(e) =>
                handleArrayChange("whatYouWillLearn", e.target.value)
              }
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              name="includedInThisCourse"
              placeholder="Included in this course (comma separated)"
              value={arrayInputText.includedInThisCourse}
              onChange={(e) =>
                handleArrayChange("includedInThisCourse", e.target.value)
              }
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              name="forWhom"
              placeholder="For whom (comma separated)"
              value={arrayInputText.forWhom}
              onChange={(e) => handleArrayChange("forWhom", e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <label className="text-gray-700">Is this course FREE?</label>
              <input
                type="checkbox"
                name="isFree"
                checked={formData.isFree}
                onChange={handleChange}
                className="h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
            </div>
            <input
              type="number"
              name="price"
              placeholder="Price (required if not free)"
              value={formData.price}
              onChange={handleChange}
              required={!formData.isFree}
              disabled={formData.isFree}
              min="0.01"
              step="0.01"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="discount"
              placeholder="Discount (0-100)"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full p-2 border rounded"
            />
            {isLoadingCategories ? (
              <div className="p-2 text-gray-500">Loading categories...</div>
            ) : (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded bg-white"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            <div className="flex items-center justify-center text-teal-600 font-semibold pt-4">
              <FaCheckCircle className="w-5 h-5 mr-2" /> Ready to Submit
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-5 border-b flex justify-between items-center z-10">
          <h3 className="text-xl font-bold text-gray-800">
            Add New Course (Step {step} of {TOTAL_STEPS})
          </h3>
          <button
            type="button"
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5" noValidate>
          {renderStep()}

          {submissionError && (
            <p className="text-red-500 text-sm mt-3 p-2 bg-red-50 border border-red-200 rounded">
              Error: {submissionError}
            </p>
          )}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1 || isSubmitting}
              className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 disabled:opacity-50 transition"
            >
              Previous
            </button>

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition flex items-center space-x-2"
              >
                {isSubmitting ? "Creating..." : "Create Course"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
