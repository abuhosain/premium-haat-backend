import httpStatus from "http-status";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { ProductServices } from "./product.services";

const createProduct = catchAsynch(async (req, res) => {
  const result = await ProductServices.createProduct(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully!",
    data: result,
  });
});

const getAllProduct = catchAsynch(async (req, res) => {
  const result = await ProductServices.getAllProductFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product data fetched successfully",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
};
