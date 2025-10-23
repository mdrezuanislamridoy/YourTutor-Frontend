import { useState, useEffect } from "react";

const CourseForm = ({ onSubmit, isSubmitting }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    batchNo: 1,
    live: false,
    introVideo: "",
    includedInThisCourse: [],
    about: "",
    forWhom: [],
    price: 0,
    isFree: false,
    discount: 0,
    category: "",
    whatYouWillLearn: [],
  });

  const [arrayInputText, setArrayInputText] = useState({
    includedInThisCourse: "",
    forWhom: "",
    whatYouWillLearn: "",
  });

  useEffect(() => {
    setArrayInputText({
      includedInThisCourse: (formData.includedInThisCourse || []).join(", "),
      forWhom: (formData.forWhom || []).join(", "),
      whatYouWillLearn: (formData.whatYouWillLearn || []).join(", "),
    });
  }, []);

  // prevent enter key from submitting
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && step !== 3) e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setArrayInputText((prev) => ({ ...prev, [name]: value }));
    setFormData((prev) => ({
      ...prev,
      [name]: value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
    }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      noValidate
      className="max-w-2xl mx-auto p-5 bg-white rounded-xl shadow space-y-5"
    >
      <h2 className="text-2xl font-semibold text-teal-600 text-center">
        Step {step} of 3
      </h2>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title"
            className="border p-2 w-full rounded"
            required
          />
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="About the Course"
            className="border p-2 w-full rounded"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 w-full rounded"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <textarea
            name="includedInThisCourse"
            value={arrayInputText.includedInThisCourse}
            onChange={handleArrayChange}
            placeholder="Included in this course (comma separated)"
            className="border p-2 w-full rounded"
          />
          <textarea
            name="forWhom"
            value={arrayInputText.forWhom}
            onChange={handleArrayChange}
            placeholder="For whom (comma separated)"
            className="border p-2 w-full rounded"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <textarea
            name="whatYouWillLearn"
            value={arrayInputText.whatYouWillLearn}
            onChange={handleArrayChange}
            placeholder="What you will learn (comma separated)"
            className="border p-2 w-full rounded"
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 w-full rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFree"
              checked={formData.isFree}
              onChange={handleChange}
            />
            Free Course
          </label>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              ← Previous
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CourseForm;
