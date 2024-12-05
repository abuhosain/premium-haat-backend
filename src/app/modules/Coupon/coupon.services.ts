import { Coupon } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const createCoupon = async (payload: Coupon) => {
  const result = await prisma.coupon.create({
    data: payload,
  });
  return result;
};

export const CouponServices = {
  createCoupon,
};
