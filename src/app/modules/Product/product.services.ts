import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import { prisma } from "../../../shared/prisma";
import { Product } from "@prisma/client";

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

const getAllProductFromDb = async (): Promise<Product[]> => {
  return await prisma.product.findMany();
};

const getProductById = async (id: string): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

const updateProduct = async (
  id: string,
  req: Request
): Promise<Product | null> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.img = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.product.update({
    where: { id },
    data: req.body,
  });
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProductFromDb,
  getProductById,
  updateProduct,
};
