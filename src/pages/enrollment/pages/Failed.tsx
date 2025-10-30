import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../lib/axiosInstance";

export default function Failed() {
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
      <h1>Failed</h1>
      <p>{enrollment?.message}</p>
      <Link to="/enrollment">Go Back</Link>
    </div>
  );
}
