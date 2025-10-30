import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import type { ICourse } from "../types/course.type";

type cStore = {
  message: string;
  setMessage: (message: string) => void;
  resetMessage: () => void;
  total: number;
  completed: number;
  enrolledCourses: Partial<ICourse>[];
  getEnrolledCourses: () => Promise<{ success: boolean }>;
};

export const CourseStore = create(
  (set): cStore => ({
    message: "",
    setMessage: (message: string) => set({ message }),
    resetMessage: () => set({ message: "" }),
    enrolledCourses: [],
    total: 0,
    completed: 0,

    getEnrolledCourses: async () => {
      try {
        const res = await axiosInstance.get("/course/getMyEnrollments");
        set({
          message: res.data.message,
          enrolledCourses: res.data.enrollments || [],
          total: res.data.total || 0,
          completed: res.data.completed || 0,
        });
        return { success: res.data.success };
      } catch (error: any) {
        set({
          message: error?.response.data.message || "Something went wrong",
        });
        return { success: false };
      }
    },
  })
);
