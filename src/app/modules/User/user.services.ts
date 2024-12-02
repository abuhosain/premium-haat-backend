import { Profile, UserRole, Vendor } from "@prisma/client";
import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";

const createAdmin = async (req: Request): Promise<Profile> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    // console.log(uploadToCloudinary);
    req.body.admin.img = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  // console.log(hashedPassword);
  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.profile.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  return result;
};

const createCustomer = async (req: Request): Promise<Profile> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    // console.log(uploadToCloudinary);
    req.body.customer.img = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  // console.log(hashedPassword);
  const userData = {
    email: req.body.customer.email,
    password: hashedPassword,
    role: UserRole.CUSTOMER,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.profile.create({
      data: req.body.customer,
    });

    return createdAdminData;
  });

  return result;
};

const createVendor = async (req: Request): Promise<Vendor> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    console.log(uploadToCloudinary);
    req.body.vendor.logo = uploadToCloudinary?.secure_url;
  }
  // console.log(req.body.vendor);

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  // console.log(hashedPassword);
  const userData = {
    email: req.body.vendor.email,
    password: hashedPassword,
    role: UserRole.VENDOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createVendorData = await transactionClient.vendor.create({
      data: req.body.vendor,
    });

    return createVendorData;
  });

  return result;
};

export const UserServices = {
  createAdmin,
  createCustomer,
  createVendor,
};
