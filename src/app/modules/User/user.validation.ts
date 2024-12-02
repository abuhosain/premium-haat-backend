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

const createCustomer = z.object({
  password: z.string({ required_error: "Password is require" }),
  customer: z.object({
    firstName: z.string({ required_error: "First Name is required" }),
    lastName: z.string().optional(),
    email: z.string({ required_error: "email is required" }),
    phone: z.string({ required_error: "phone is required" }),
    address: z.string({ required_error: "address is required" }),
  }),
});

const createVendor = z.object({
  password: z.string({ required_error: "Password is require" }),
  vendor: z.object({
    name: z.string({ required_error: " Name is required" }),
    email: z.string({ required_error: "email is required" }),
    phone: z.string({ required_error: "phone is required" }),
    description: z.string({ required_error: "description is required" }),
  }),
});

export const UserValidation = {
  creatAdmin,
  createCustomer,
  createVendor,
};
