import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { UserStore } from "../../store/user.store";
import axiosInstance from "../../lib/axiosInstance";

const EnrollmentPage = () => {
  const { id } = useParams<{ id: string }>();

  const { user } = UserStore();
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/course/${id}`);
        setCourse(res.data.course);
        setTotalAmount(res.data.course.price);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

 
const handleEnroll = async () => {
  if (!user) {
    navigate("/login");
    return;
  }

  setEnrolling(true);
  try {
    const enrollRes = await axiosInstance.post(`/enrollment/enroll/${id}`, {
      couponCode: couponCode ? { code: couponCode } : undefined,
    });

    alert(enrollRes.data.message || "Enrollment successful!");

    if (enrollRes.data.enrollment && enrollRes.data.enrollment._id) {
      
      const payRes = await axiosInstance.get(
        `/payment/payBill/${enrollRes.data.enrollment._id}`
      ); 

      if (payRes.data.url) {
     
        window.location.href = payRes.data.url;
      } else {
        alert(
          "Payment init failed: " + (payRes.data.message || "No payment URL")
        );
      }
    }
  } catch (err: any) {
    console.error("Error:", err); 
    alert(err.response?.data?.message || "Enrollment failed!");
  } finally {
    setEnrolling(false);
  }
};


  if (loading) return <p className="text-center mt-12">Loading course...</p>;
  if (error) return <p className="text-center mt-12 text-red-500">{error}</p>;
  if (!course) return null;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <img
          src={course.thumbnail.imageUrl}
          alt={course.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            {course.title}
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="flex items-center text-yellow-500">
              <FaStar className="w-4 h-4 mr-1" /> {course.ratings}
            </span>
            <span className="text-gray-500">{course.duration}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                course.live
                  ? "bg-red-100 text-red-600"
                  : "bg-teal-100 text-teal-600"
              }`}
            >
              {course.live ? "LIVE" : "RECORDED"}
            </span>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-3">
            {course.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 sm:mb-0 sm:mr-2 flex-grow"
            />
            <button
              // onClick={applyCoupon}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply Coupon
            </button>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div>
              {discount > 0 && (
                <p className="text-gray-500 line-through">
                  ${course.price.toFixed(2)}
                </p>
              )}
              <span className="text-2xl font-bold text-teal-600">
                ${totalAmount.toFixed(2)}
              </span>
              {discount > 0 && (
                <span className="ml-2 text-green-600 font-medium">
                  -{discount.toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
            >
              {enrolling ? "Enrolling..." : "Enroll & Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;
