import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./user.services";

const createAdmin = catchAsynch(async (req, res) => {
  const result = await UserServices.createAdmin(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const createCustomer = catchAsynch(async (req, res) => {
  const result = await UserServices.createCustomer(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createCustomer,
};
