import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { CouponControllers } from "./coupon.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { CouponValidation } from "./coupon.validation";

const router = express.Router();
router.post(
  "/create-coupon",
  auth(UserRole.VENDOR),
  validateRequest(CouponValidation.createCoupon),
  CouponControllers.createCoupon
);
// get coupon by code
router.get("/:id", CouponControllers.getCouponByCode);

// update coupon
router.put(
  "/:id",
  auth(UserRole.VENDOR),
  validateRequest(CouponValidation.updateCoupon),
  CouponControllers.updateCoupon
);

// delete coupon
router.delete("/:id", CouponControllers.deleteCoupon);

export const CouponRoutes = router;
