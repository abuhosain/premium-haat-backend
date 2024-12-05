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

export const CouponServices = {
  createCoupon,
  getCouponByCode,
};
