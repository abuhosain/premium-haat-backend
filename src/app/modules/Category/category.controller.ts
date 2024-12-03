import httpStatus from "http-status";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { CategoryServices } from "./category.services";

const createCategory = catchAsynch(async (req, res) => {
  const result = await CategoryServices.createCategory(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully!",
    data: result,
  });
});

const getAllCategoryFromDB = catchAsynch(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category data fetched successfully",
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategoryFromDB,
};
