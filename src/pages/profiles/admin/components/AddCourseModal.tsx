import { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import axiosInstance from "../../../../lib/axiosInstance";

interface ICategory {
  _id: string;
  name: string;
}

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCourseAdded: () => void;
}

export default function AddCourseModal({
  isOpen,
  onClose,
  onCourseAdded,
}: AddCourseModalProps) {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Main form data
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
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [includedInThisCourse, setIncludedInThisCourse] = useState<string[]>(
    []
  );
  const [forWhom, setForWhom] = useState<string[]>([]);
  const [whatYouWillLearn, setWhatYouWillLearn] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Narrow type for checkbox
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleAddItem = (type: string, value: string) => {
    if (!value.trim()) return;
    switch (type) {
      case "includedInThisCourse":
        setIncludedInThisCourse((prev) => [...prev, value]);
        break;
      case "forWhom":
        setForWhom((prev) => [...prev, value]);
        break;
      case "whatYouWillLearn":
        setWhatYouWillLearn((prev) => [...prev, value]);
        break;
      default:
        break;
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get<{ categories: ICategory[] }>(
        "/category"
      );
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submissionData = new FormData();

      (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
        const value = formData[key];
        submissionData.append(key, String(value));
      });

      if (thumbnail) submissionData.append("thumbnail", thumbnail);

      const incInTC = includedInThisCourse.join(",");
      const whatWL = whatYouWillLearn.join(",");
      const forWM = forWhom.join(",");

      submissionData.append("includedInThisCourse", incInTC);
      submissionData.append("forWhom", forWM);
      submissionData.append("whatYouWillLearn", whatWL);

      const res = await axiosInstance.post<{ success: boolean }>(
        "/course/create-course",
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );


      
      onCourseAdded();
      onClose();
    } catch (error: any) {
      console.error("Error adding course:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to add course.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isOpen) return null;

  const renderStep = () => {
    if (step === 1)
      return (
        <form className="flex flex-col gap-3">
          <label>
            Course Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 bg-white text-black rounded"
            />
          </label>

          <label>
            Batch No:
            <input
              type="number"
              name="batchNo"
              value={formData.batchNo}
              onChange={handleChange}
              className="w-full p-2 bg-white text-black rounded"
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="live"
              checked={formData.live}
              onChange={handleChange}
            />
            Live Course
          </label>

          <label>
            Intro Video Link:
            <input
              type="text"
              name="introVideo"
              value={formData.introVideo}
              onChange={handleChange}
              className="w-full p-2 bg-white text-black rounded"
            />
          </label>

          <label>
            Thumbnail:
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full p-2 bg-white text-black rounded"
            />
          </label>
          {thumbnail && (
            <div className="mt-2 flex items-center gap-2">
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="Preview"
                className="w-16 h-16 object-cover rounded"
              />
              <p className="text-sm text-gray-200">{thumbnail.name}</p>
            </div>
          )}
        </form>
      );
    else if (step === 2) {
      return (
        <form className="flex flex-col gap-3">
          <label>
            About:
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full p-2 bg-white text-black rounded"
            />
          </label>

          <div>
            <h4>Included In This Course:</h4>
            <ArrayInputList
              items={includedInThisCourse}
              onAdd={(val) => handleAddItem("includedInThisCourse", val)}
            />
          </div>

          <div>
            <h4>For Whom:</h4>
            <ArrayInputList
              items={forWhom}
              onAdd={(val) => handleAddItem("forWhom", val)}
            />
          </div>

          <div>
            <h4>What You Will Learn:</h4>
            <ArrayInputList
              items={whatYouWillLearn}
              onAdd={(val) => handleAddItem("whatYouWillLearn", val)}
            />
          </div>
        </form>
      );
    } else
      return (
        <form className="flex flex-col gap-3">
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 bg-white text-black rounded"
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFree"
              checked={formData.isFree}
              onChange={handleChange}
            />
            Free Course
          </label>

          <label>
            Discount (%):
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full p-2 bg-white text-black rounded"
            />
          </label>

          <label>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 bg-white text-black rounded"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>No categories found</option>
              )}
            </select>
          </label>
        </form>
      );
  };

  return (
    <div className="fixed max-h-screen overflow-scroll inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 text-white">
      <div className="bg-teal-600 p-6 rounded-2xl w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-gray-200 hover:text-teal-200"
        >
          <RiCloseCircleLine />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Add New Course — Step {step} / 3
        </h2>

        <div className="mb-6">{renderStep()}</div>

        {message && <p className="text-red-500 mb-4">{message}</p>}

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 bg-gray-500 rounded disabled:opacity-50"
          >
            Previous
          </button>

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-teal-400 hover:bg-teal-500 rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleAddCourse}
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const ArrayInputList = ({
  items,
  onAdd,
}: {
  items: string[];
  onAdd: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 bg-white text-black rounded"
        />
        <button
          type="button"
          onClick={() => {
            onAdd(inputValue);
            setInputValue("");
          }}
          className="px-3 py-2 bg-teal-700 rounded"
        >
          Add
        </button>
      </div>
      <ul className="text-sm list-disc pl-5">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
