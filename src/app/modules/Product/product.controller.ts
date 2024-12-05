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

const getProductById = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getProductById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

const updateProduct = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.updateProduct(id, req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
