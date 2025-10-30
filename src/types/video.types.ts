export interface IThumbnail {
  imageUrl: string;
  publicId: string;
}
export interface IVideo extends Document {
  _id: string;
  title: string;
  thumbnail: IThumbnail;
  videoUrl: string;
  duration: number;
  isFree: boolean;
  description: string;
  createdAt: Date;
}
