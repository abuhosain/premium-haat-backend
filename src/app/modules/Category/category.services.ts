import { Category } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { fileUploader } from "../../helpers/fileUploader";
import { Request } from "express";
import { IFile } from "../../interfaces/file";

const createCategory = async (req: Request) => {
  const file = req.file as IFile;
  if (file) {
    req.body.icon = file.path;
  }
  const result = await prisma.category.create({
    data: req.body,
  });
  return result;
};

const getAllCategoryFromDB = async (): Promise<Category[]> => {
  return await prisma.category.findMany();
};

const getCategoryById = async (id: string): Promise<Category | null> => {
  return await prisma.category.findUnique({
    where: { id },
  });
};

const updateCategory = async (
  id: string,
  req: Request
): Promise<Category | null> => {
  const file = req.file as IFile;
  if (file) {
    req.body.icon = file.path;
  }

  const result = await prisma.category.update({
    where: { id },
    data: req.body,
  });
  return result;
};

const deleteCategoryFromDB = async (id: string): Promise<Category | null> => {
  return await prisma.category.delete({
    where: { id },
  });
};

export const CategoryServices = {
  createCategory,
  getAllCategoryFromDB,
  getCategoryById,
  updateCategory,
  deleteCategoryFromDB,
};
