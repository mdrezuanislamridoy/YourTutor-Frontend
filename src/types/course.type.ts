export interface IProject {
  title: string;
  thumbnail: string;
  description: string;
}

export interface IThumbnail {
  imageUrl: string;
  publicId: string;
}

export interface ICourse {
  _id: string;
  addedBy: string;
  title: string;
  batchNo: number;
  ratings?: number;
  reviews: string[];
  enrolledStudents: number;
  duration: string;
  live: boolean;
  completedBy: number;
  modules: string[];
  thumbnail: IThumbnail;
  introVideo?: string;
  includedInThisCourse: string[];
  about: string;
  forWhom: string[];
  instructors: string[];
  projectsFromThis: IProject[];
  price: number;
  isFree: boolean;
  discount?: number;
  category: string;
  whatYouWillLearn: string[];
  couponCodes: string[];
  quiz?: string[];
  assignment?: string[];
  certificate?: string;
  meetings: string[];
  isFeatured: boolean;
  popular: number;
  createdAt?: Date;
  updatedAt?: Date;
}
