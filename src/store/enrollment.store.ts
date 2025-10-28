import { create } from "zustand";

export const EnrollmentStore = create((set) => ({
  message: "",
  setMessage: (message: string) => set({ message }),
}));
