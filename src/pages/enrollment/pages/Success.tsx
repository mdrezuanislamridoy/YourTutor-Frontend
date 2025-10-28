import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../lib/axiosInstance";

export default function Success() {
  const { id } = useParams<{ id: string }>();
  const [enrollment, setEnrollment] = useState<any>(null);

  useEffect(() => {
    try {
      const fetchEnrollment = async () => {
        const res = await axiosInstance.post(`/payment/success/${id}`);
        setEnrollment(res.data);
      };
      fetchEnrollment();
    } catch (error: any) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <h1>Success</h1>
      <p>{enrollment?.message}</p>
    </div>
  );
}
