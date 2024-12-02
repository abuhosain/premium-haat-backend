import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./user.services";

const createAdmin = catchAsynch(async (req, res) => {
  const result = await UserServices.createAdmin();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

export const UserController = {
  createAdmin,
};
