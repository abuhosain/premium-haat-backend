import { z } from "zod";

const createCategory = z.object({
  name: z.string({ required_error: "Name is required" }),
});

const updateCategory = z.object({
  name: z.string().min(1).optional(),
});

export const CategoryValidation = {
  createCategory,
  updateCategory,
};
