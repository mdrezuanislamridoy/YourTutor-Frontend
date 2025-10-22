type UserRole = "student" | "mentor" | "admin";
type Gender = "male" | "female" | "others";

interface Contact {
  contactNo?: string;
  emergencyContact?: string;
  address?: string;
}

interface Social {
  facebook?: string;
  linkedIn?: string;
  github?: string;
}

interface ProfileImg {
  imageUrl: string;
  publicId: string;
}
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  mentorStatus: string;
  dateOfBirth?: Date;
  contactInfo?: Contact;
  socialAccounts?: Social;
  profileImg?: ProfileImg;
  gender?: Gender;
  profession: string;
  isPasswordChanged?: boolean;
  isDeleted?: boolean;
  isBlocked?: boolean;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Mentor extends IUser {
  designation?: string;
  departmentName?: string;
  expertise?: string;
  education_qualification?: string[];
  workExperience?: string[];
  myJoinedCourses?: string[];
}

export interface Student extends IUser {
  enrolledCourses?: string[];
}

export type Admin = Pick<IUser, "_id" | "name" | "email" | "password">;
