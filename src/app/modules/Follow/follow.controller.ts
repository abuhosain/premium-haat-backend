import httpStatus from "http-status";
import catchAsynch from "../../../shared/catchAsynch";
import { FollowServices } from "./follow.services";
import sendResponse from "../../../shared/sendResponse";

const followVendor = catchAsynch(async (req: any, res) => {
  const userId = req?.user?.id;
  console.log("userId:", userId);
  const vendorId = req.params.vendorId;
  const result = await FollowServices.followVendor(userId, vendorId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result.message,
    data: result,
  });
});

const getFollowersByVendorId = catchAsynch(async (req, res) => {
  const vendorId = req.params.vendorId;
  const result = await FollowServices.getFollowersByVendorId(vendorId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all followers",
    data: result,
  });
});

export const FollowControllers = {
  followVendor,
  getFollowersByVendorId,
};
