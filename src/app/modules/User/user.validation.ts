import { z } from "zod";

const creatAdmin = z.object({
  password: z.string({ required_error: "Password is require" }),
  admin: z.object({
    firstName: z.string({ required_error: "First Name is required" }),
    lastName: z.string().optional(),
    email: z.string({ required_error: "email is required" }),
    phone: z.string({ required_error: "phone is required" }),
    address: z.string({ required_error: "address is required" }),
  }),
});

export const UserValidation = {
  creatAdmin,
};
