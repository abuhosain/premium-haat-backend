import httpStatus from "http-status";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { ProductServices } from "./product.services";
import { productFilterableFields } from "./product.constance";
import pick from "../../../shared/pick";
import { any } from "zod";

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
  const filters = pick(req.query, productFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder",]);
  const result = await ProductServices.getAllProductFromDb(options, filters);
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

const getProductByVendor = catchAsynch(async (req, res) => {
  const result = await ProductServices.getProductByVendor(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully",
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
  getProductByVendor,
};
