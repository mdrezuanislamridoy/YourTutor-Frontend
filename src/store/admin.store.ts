import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";

interface AdminStore {
  message: string;
  approveMentor: (id: string) => Promise<{ success: boolean }>;
  rejectMentor: (id: string) => Promise<{ success: boolean }>;
  block: (id: string) => Promise<{ success: boolean }>;
  unblock: (id: string) => Promise<{ success: boolean }>;
  deleteUser: (id: string) => Promise<{ success: boolean }>;
  undoDelete: (id: string) => Promise<{ success: boolean }>;
}

const doWork = async (
  api: string,
  set: (state: Partial<AdminStore>) => void
): Promise<{ success: boolean; message?: string }> => {
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

export const adminStore = create<AdminStore>((set) => ({
  message: "",

  approveMentor: async (id) =>
    await doWork(`/auth/admin/approveMentor/${id}`, set),

  rejectMentor: async (id) =>
    await doWork(`/auth/admin/rejectMentor/${id}`, set),

  block: async (id) => await doWork(`/auth/admin/block/${id}`, set),

  unblock: async (id) => await doWork(`/auth/admin/unblock/${id}`, set),

  deleteUser: async (id) => await doWork(`/auth/admin/delete/${id}`, set),

  undoDelete: async (id) => await doWork(`/auth/admin/undoDelete/${id}`, set),
}));
