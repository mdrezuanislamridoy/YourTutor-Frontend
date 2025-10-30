export interface ICoupon {
  _id: string;
  code: string;
  courses: string[];
  discount: number;
  discountType: "percentage" | "amount";
  minSpend?: number;
  maxDiscount?: number;
  expiresIn: string; 
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CouponFormData = Omit<ICoupon, "_id" | "createdAt" | "updatedAt">;
