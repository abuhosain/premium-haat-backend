import httpStatus from "http-status";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { AdminServices } from "./admin.services";

const getAllActiveUsersFromDB = catchAsynch(async (req, res) => {
  const result = await AdminServices.getAllActiveUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllActiveUsersFromDB,
};
