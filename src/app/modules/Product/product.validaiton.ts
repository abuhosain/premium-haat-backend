import { z } from "zod";

const createProduct = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  price: z
    .number({ required_error: "Price is required" })
    .positive("Price must be a positive number"),
  categoryId: z.string({ required_error: "Category ID is required" }),
  // vendorId: z.string({ required_error: "Vendor ID is required" }),
  quantity: z.number({ required_error: "Quantity is required" }),
  discount: z.number().optional(),
  couponId: z.string().optional(),
});

const updateProduct = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  categoryId: z.string().optional(),
  quantity: z.number().optional(),
  discount: z.number().optional(),
  couponId: z.string().optional(),
});

export const ProductValidation = {
  createProduct,
  updateProduct,
};
