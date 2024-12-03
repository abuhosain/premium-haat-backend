import { z } from "zod";

const createCategory = z.object({
  name: z.string({ required_error: "Name is required" }),
});

export const CategoryValidation = {
  createCategory,
};
