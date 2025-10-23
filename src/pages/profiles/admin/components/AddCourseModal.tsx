import { RiCloseCircleLine } from "react-icons/ri";

export default function AddCourseModal({ isOpen, onClose, onCourseAdded }) {
  if (!isOpen) return null;
  return (
    <div className="w-full min-h-screen fixed top-0 left-0 flex items-center justify-center bg-black/30 backdrop-blur-lg text-white ">
      AddCourseModal
      <button onClick={onClose}>
        <RiCloseCircleLine />
      </button>
    </div>
  );
}
