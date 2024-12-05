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

const getCouponByCode = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await CouponServices.getCouponByCode(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon fetched successfully",
    data: result,
  });
});

const updateCoupon = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await CouponServices.updateCoupon(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon updated successfully",
    data: result,
  });
});

const deleteCoupon = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await CouponServices.deleteCoupon(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon deleted successfully",
    data: result,
  });
});

export const CouponControllers = {
  createCoupon,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
};
