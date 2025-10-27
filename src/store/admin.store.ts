import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";

const doWork = async (api: string, set: any) => {
  try {
    const response = await axiosInstance.put(api);
    const message = response.data.message;
    set({ message });
    return { success: response.data.success, message };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    set({ message });
    return { success: false, message };
  }
};

export const adminStore = create((set) => {
  return {
    message: "",

    getRequestedMentors: async () => {
      try {
        const result = await axiosInstance.get("/admin/requestedMentors");
        return result;
      } catch (error: any) {
        console.log(error);
      }
    },

    getMentors: async () => {
      try {
        const result = await axiosInstance.get("/admin/mentors");
        return result;
      } catch (error: any) {
        console.log(error);
      }
    },

    approveMentor: async (id: string) =>
      await doWork(`/admin/approveMentor/${id}`, set),

    rejectMentor: async (id: string) =>
      await doWork(`/admin/rejectMentor/${id}`, set),

    rejectedMentors: async () => {
      try {
        const result = await axiosInstance.get("/admin/rejectedMentors");
        return result;
      } catch (error: any) {
        console.log(error);
      }
    },
    block: async (id: string) => await doWork(`/admin/block/${id}`, set),

    unblock: async (id: string) => await doWork(`/admin/unblock/${id}`, set),

    getBlockedAcc: async () => {
      try {
        const result = await axiosInstance.get("/admin/blockedAccount");
        return result;
      } catch (error: any) {
        console.log(error);
      }
    },

    deleteUser: async (id: string) => await doWork(`/admin/delete/${id}`, set),

    undoDelete: async (id: string) =>
      await doWork(`/admin/undoDelete/${id}`, set),
    getDeletedAcc: async () => {
      try {
        const result = await axiosInstance.get("/admin/getDeletedAccount");
        return result;
      } catch (error: any) {
        console.log(error);
      }
    },
  };
});
