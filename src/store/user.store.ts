import { create } from "zustand";
import type { Admin, IUser, Mentor, Student } from "../types/user.type";
import axiosInstance from "../lib/axiosInstance";

type AnyUser = Partial<IUser & Mentor & Admin & Student>;

interface uStore {
  user: AnyUser | null;
  message: string;
  sendSignUpCode: (email: string) => Promise<{ success: boolean }>;
  verifySignUpCode: (
    email: string,
    code: number
  ) => Promise<{ success: boolean }>;

  registerStudent: (formData: {
    name: string;
    email: string;
    password: string;
    verificationCode: number;
  }) => Promise<{ success: boolean }>;

  registerMentor: (formData: {
    name: string;
    email: string;
    password: string;
    verificationCode: number;
  }) => Promise<{ success: boolean }>;

  login: (formData: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean }>;
  profile: () => Promise<void>;
  updateUser: (formData: AnyUser) => Promise<{ success: boolean }>;
  deleteUser: () => Promise<{ success: boolean }>;
  changePassword: (
    oldPass: string,
    newPass: string
  ) => Promise<{ success: boolean }>;
  sendForgetPassCode: (email: string) => Promise<{ success: boolean }>;
  forgetPassword: (
    email: string,
    verificationCode: number,
    newPass: string
  ) => Promise<{ success: boolean }>;
  logout: () => Promise<void>;
  resetMessage: () => Promise<void>;
}

const register = async (
  formData: {
    name: string;
    email: string;
    password: string;
    verificationCode: number;
  },
  api: string,
  set
) => {
  try {
    const res = await axiosInstance.post(api, formData);
    set({ message: res.data.message });
    return { success: res.data.success };
  } catch (error) {
    set({
      message: error?.response.data.message || "Something went wrong",
    });
    return { success: false };
  }
};

export const UserStore = create<uStore>((set) => {
  return {
    user: null,
    message: "",

    sendSignUpCode: async (email) => {
      try {
        const res = await axiosInstance.post("/auth/sendSignUpCode", {
          email,
        });
        if (!res) {
          throw new Error("Response not found");
        }
        set({ message: res.data.message });

        return { success: res.data.success };
      } catch (error) {
        set({
          message: error?.response.data.message || "Something went wrong",
        });

        return { success: false };
      }
    },

    verifySignUpCode: async (email, code) => {
      try {
        const res = await axiosInstance.post("/auth/verifySignUpCode", {
          email,
          verificationCode: code,
        });
        if (!res) {
          throw new Error("Response not found");
        }
        set({ message: res.data.message });
        return { success: res.data.success };
      } catch (error) {
        set({
          message: error?.response.data.message || "Something went wrong",
        });
        return { success: false };
      }
    },

    registerStudent: async (formData: {
      name: string;
      email: string;
      verificationCode: number;
      password: string;
    }) => {
      return register(formData, "/auth/student/register", set);
    },

    registerMentor: async (formData: {
      name: string;
      email: string;
      password: string;
      verificationCode: number;
    }) => {
      return register(formData, "/auth/mentor/register", set);
    },

    login: async (formData: { email: string; password: string }) => {
      try {
        const res = await axiosInstance.post("/auth/login", formData);
        const result = res.data.user;
        switch (result?.role) {
          case "student":
            set({ user: result as Student, message: res.data.message });
            break;
          case "mentor":
            set({ user: result as Mentor, message: res.data.message });
            break;
          case "admin":
            set({ user: result as Admin, message: res.data.message });
            break;

          default:
            set({ user: result as IUser, message: res.data.message });
            break;
        }

        return { success: res.data.success };
      } catch (error) {
        set({
          message: error?.response.data.message || "Something went wrong",
        });
        return { success: false };
      }
    },
    profile: async () => {
      try {
        const res = await axiosInstance.get("/auth/profile");
        set({ message: res.data.message, user: res.data.user });
      } catch (error) {
        set({
          message: error?.response.data.message || "Something went wrong",
        });
      }
    },
    updateUser: async (formData) => {
      try {
        const res = await axiosInstance.put("/auth/updateProfile", formData);
        set({ message: res.data.message, user: res.data.updatedUser });
        return { success: res.data.success };
      } catch (error) {
        set({
          message: error?.response.data.message || "Something went wrong",
        });
        return { success: false };
      }
    },
    deleteUser: async () => {
      try {
        const res = await axiosInstance.put("/auth/deleteUser");
        set({ message: res.data.message, user: null });
        return { success: res.data.success };
      } catch (error) {
        set({
          message: error?.response.data.message || "Something went wrong",
        });
        return { success: false };
      }
    },
    changePassword: async (oldPass: string, newPass: string) => {
      try {
        const res = await axiosInstance.put("/auth/changePassword", {
          oldPass,
          newPass,
        });
        set({ message: res.data.message, user: res.data.user });
        return { success: res.data.success };
      } catch (error) {
        set({
          message: error?.response.data.message || "Something went wrong",
        });
        return { success: false };
      }
    },
    sendForgetPassCode: async (email: string) => {
      try {
        const res = await axiosInstance.post("/auth/sendForgetPasswordCode", {
          email,
        });
        set({ message: res.data.message });
        return { success: res.data.success };
      } catch (error) {
        set({
          message: error?.response.data.message || "Something went wrong",
        });
        return { success: false };
      }
    },
    forgetPassword: async (email, verificationCode, newPass) => {
      try {
        const res = await axiosInstance.post("/auth/forgetPassCode", {
          email,
          verificationCode,
          newPass,
        });
        set({ message: res.data.message });
        return { success: res.data.success };
      } catch (error) {
        set({
          message: error?.response.data.message || "Something went wrong",
        });
        return { success: false };
      }
    },

    logout: async () => {
      try {
        const res = await axiosInstance.post("/auth/logout");
        set({ message: res.data.message, user: null });
      } catch (error) {
        set({
          message: error?.response.data.message || "Something went wrong",
        });
      }
    },
    resetMessage: async () => {
      set({ message: "" });
    },
  };
});
