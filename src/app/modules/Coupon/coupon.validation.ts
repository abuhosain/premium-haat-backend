import { z } from "zod";

const createCoupon = z.object({
  body: z.object({
    code: z.string({ required_error: "Code is required" }),
    percentage: z
      .number({ required_error: "Percentage is required" })
      .positive("Percentage must be a positive number")
      .max(100, "Percentage cannot exceed 100"),
    expiryDate: z
      .string()
      .refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      })
      .optional()
      .transform((date) => {
        // If no expiry date is provided, set it to 30 days from now
        if (!date) {
          return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days from now
        }
        return date;
      }),
    productId: z.string().optional(),
  }),
});

const updateCoupon = z.object({
  body: z.object({
    code: z.string().optional(),
    percentage: z
      .number()
      .positive("Percentage must be a positive number")
      .max(100, "Percentage cannot exceed 100")
      .optional(),
    expiryDate: z
      .string()
      .refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      })
      .optional(),
    productId: z.string().optional(),
  }),
});

export const CouponValidation = {
  createCoupon,
  updateCoupon,
};
