import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../lib/axiosInstance";

export default function CourseData() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = React.useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const getCourse = await axiosInstance.get(
          `/enrollment/getSingleEnrollment/${id}`
        );
        setCourse(getCourse.data.course || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourse();
  }, [id]);

  return (
    <div>
      {course.map((c: any) => (
        <div key={c._id}>
          <h1>{c.courseId.title}</h1>
          <p>{c.courseId.description}</p>
        </div>
      ))}
    </div>
  );
}
