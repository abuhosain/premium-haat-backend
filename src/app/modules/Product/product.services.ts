import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import { prisma } from "../../../shared/prisma";

const createProduct = async (req: Request) => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.img = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.product.create({
    data: req.body,
  });
  return result;
};

export const ProductServices = {
  createProduct,
};
