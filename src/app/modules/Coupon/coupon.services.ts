import { Coupon } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const createCoupon = async (payload: Coupon) => {
  const result = await prisma.coupon.create({
    data: payload,
  });
  return result;
};

// Get All Coupons by Code
const getCouponByCode = async (code: string) => {
  const coupons = await prisma.coupon.findMany({
    where: {
      code,
    },
  });
  return coupons;
};

// Update Coupon by ID
const updateCoupon = async (id: string, payload: Partial<Coupon>) => {
  const updatedCoupon = await prisma.coupon.update({
    where: {
      id,
    },
    data: payload,
  });
  return updatedCoupon;
};

export const CouponServices = {
  createCoupon,
  getCouponByCode,
  updateCoupon,
};
