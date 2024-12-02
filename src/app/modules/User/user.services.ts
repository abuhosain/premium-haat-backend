import { Profile, UserRole } from "@prisma/client";
import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";

const createAdmin = async (req: Request): Promise<Profile> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    console.log(uploadToCloudinary);
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

export const UserServices = {
  createAdmin,
};
