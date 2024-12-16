import httpStatus from "http-status";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { AdminServices } from "./admin.services";

// Get all non-deleted users
const getAllNonDeletedUsers = catchAsynch(async (req, res) => {
  const result = await AdminServices.getAllNonDeletedUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
});

const getAllVendor = catchAsynch(async (req, res) => {
  const result = await AdminServices.getAllVendor();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor fetched successfully",
    data: result,
  });
});

// Get all  order
const getAllOrder = catchAsynch(async (req, res) => {
  const result = await AdminServices.getAllOrder();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order fetched successfully",
    data: result,
  });
});

// Block a user
const blockVendor = catchAsynch(async (req, res) => {
  const { vendorId } = req.params;
  const result = await AdminServices.blockVendor(vendorId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor blocked successfully",
    data: result,
  });
});

// Unblock a user
const unblockVendor = catchAsynch(async (req, res) => {
  const { vendorId } = req.params;
  const result = await AdminServices.unblockVendor(vendorId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor unblocked successfully",
    data: result,
  });
});

// Block a user
const blockUser = catchAsynch(async (req, res) => {
  const { userId } = req.params;
  const result = await AdminServices.blockUser(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User blocked successfully",
    data: result,
  });
});

// Unblock a user
const unblockUser = catchAsynch(async (req, res) => {
  const { userId } = req.params;
  const result = await AdminServices.unblockUser(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User unblocked successfully",
    data: result,
  });
});

// Delete a user
const deleteUser = catchAsynch(async (req, res) => {
  const { userId } = req.params;
  const result = await AdminServices.deleteUser(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllNonDeletedUsers,
  blockUser,
  unblockUser,
  deleteUser,
  getAllOrder,
  getAllVendor,
  blockVendor,
  unblockVendor,
};
