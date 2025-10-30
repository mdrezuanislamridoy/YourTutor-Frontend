import type { ICourse } from "./course.type";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface IVideo {
  _id: string;
  title: string;
  duration?: string;
  url?: string;
}

export interface IModule {
  _id: string;
  title: string;
  videos: IVideo[];
}

export interface IInstructor {
  _id: string;
  name: string;
  expertise: string;
  designation?: string;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface IThumbnail {
  imageUrl: string;
  publicId: string;
}

export interface IProject {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
}

export interface IProgress {
  finishedModules: IModule[] | string[];
  finishedVideos: IVideo[] | string[];
  totalModules: number;
  totalVideos: number;
  percentage: number;
  lastAccessedVideo?: IVideo | string;
}

export interface IEnrollment {
  _id: string;
  user: IUser;
  courseId: ICourse;
  totalAmount: number;
  discounted: number;
  discountType: "percentage" | "amount";
  status: "paid" | "pending" | "cancelled";
  transactionId?: string;
  phone?: string;
  progress: IProgress;
  isCompleted: boolean;
  certificateIssued: boolean;
  createdAt: string;
  updatedAt: string;
}
