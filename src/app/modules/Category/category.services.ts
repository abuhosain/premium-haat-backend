import { Category } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { fileUploader } from "../../helpers/fileUploader";
import { Request } from "express";
import { IFile } from "../../interfaces/file";

const createCategory = async (req: Request) => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.category.create({
    data: req.body,
  });
};

const getAllCategoryFromDB = async (): Promise<Category[]> => {
  return await prisma.category.findMany();
};

export const CategoryServices = {
  createCategory,
  getAllCategoryFromDB,
};
