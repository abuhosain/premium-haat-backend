import httpStatus from "http-status";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { CouponServices } from "./coupon.services";

const createCoupon = catchAsynch(async (req, res) => {
  const result = await CouponServices.createCoupon(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon created successfully!",
    data: result,
  });
});

export const CouponControllers = {
  createCoupon,
};
