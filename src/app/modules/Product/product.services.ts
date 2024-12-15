import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import { prisma } from "../../../shared/prisma";
import { Product } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/paginaton";
import buildPrismaQuery from "../../helpers/Builder";

const createProduct = async (req: any) => {
  const { email } = req?.user;
  console.log(email);
  const vendor = await prisma.vendor.findUnique({
    where: {
      email: email,
    },
  });

  req.body.vendorId = vendor?.id;

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

const getAllProductFromDb = async (
  options: IPaginationOptions,
  filters: any
) => {
  const result = await buildPrismaQuery({
    model: "product",
    filters,
    pagination: options,
    include: { vendor: true },
  });
  return result;
};

const getProductById = async (id: string): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

const getProductByVendor = async (req: any) => {
  const { email } = req.user; 
   
  const getVendor = await prisma.vendor.findUnique({
    where: { email },
  });

  if (!getVendor) {
    throw new Error("Vendor not found");
  }

  // Fetch products associated with the vendor
  const products = await prisma.product.findMany({
    where: { vendorId: getVendor.id },
  });

  return products;
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

const deleteProductFromDB = async (id: string): Promise<Product | null> => {
  return await prisma.product.delete({
    where: { id },
  });
};

export const ProductServices = {
  createProduct,
  getAllProductFromDb,
  getProductById,
  updateProduct,
  deleteProductFromDB,
  getProductByVendor,
};
