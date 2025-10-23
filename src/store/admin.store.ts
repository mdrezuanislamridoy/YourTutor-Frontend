import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";

const doWork = async (api, set) => {
  try {
    const response = await axiosInstance.put(api);
    const message = response.data.message;
    set({ message });
    return { success: response.data.success, message };
  } catch (error) {
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
      } catch (error) {
        console.log(error);
      }
    },

    getMentors: async () => {
      try {
        const result = await axiosInstance.get("/admin/mentors");
        return result;
      } catch (error) {
        console.log(error);
      }
    },

    approveMentor: async (id) =>
      await doWork(`/admin/approveMentor/${id}`, set),

    rejectMentor: async (id) => await doWork(`/admin/rejectMentor/${id}`, set),

    rejectedMentors: async () => {
      try {
        const result = await axiosInstance.get("/admin/rejectedMentors");
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    block: async (id) => await doWork(`/admin/block/${id}`, set),

    unblock: async (id) => await doWork(`/admin/unblock/${id}`, set),

    getBlockedAcc: async () => {
      try {
        const result = await axiosInstance.get("/admin/blockedAccount");
        return result;
      } catch (error) {
        console.log(error);
      }
    },

    deleteUser: async (id) => await doWork(`/admin/delete/${id}`, set),

    undoDelete: async (id) => await doWork(`/admin/undoDelete/${id}`, set),
    getDeletedAcc: async () => {
      try {
        const result = await axiosInstance.get("/admin/getDeletedAccount");
        return result;
      } catch (error) {
        console.log(error);
      }
    },
  };
});
