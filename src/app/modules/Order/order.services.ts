import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import { initiatePayment } from "../payment/payment.utils";
import ApiError from "../../errors/ApiError";

const prisma = new PrismaClient();

const createOrder = async (
  user: JwtPayload,
  payload: {
    vendorId: string;
    totalPrice : number;
    orderItems: { productId: string; quantity: number; price: number }[];
  }
) => {
  // Validate the user
  const isUser = await prisma.profile.findUnique({
    where: { email: user.email },
  });

  if (!isUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Validate the vendor
  const isVendor = await prisma.vendor.findUnique({
    where: { id: payload.vendorId },
  });

  if (!isVendor) {
    throw new ApiError(httpStatus.NOT_FOUND, "Vendor not found");
  }

  // const totalPrice = payload?.orderItems?.reduce(
  //   (sum, item) => sum + item.quantity * item.price,
  //   0
  // );

  // Generate a unique transaction ID
  const transactionId = `TXN-${Date.now()}`;

  // Create the order in the database
  const order = await prisma.order.create({
    data: {
      userId: user?.id,
      vendorId: payload.vendorId,
      totalPrice: payload.totalPrice,
      txId: transactionId,
    },
  });

  // Create the order items
  const orderItemsData = payload?.orderItems?.map((item) => ({
    productId: item.productId,
    orderId: order.id,
    quantity: item.quantity.toString(),
  }));

  await prisma.orderItem.createMany({
    data: orderItemsData,
  });

  // Prepare payment data
  const paymentData = {
    transactionId,
    amount: payload.totalPrice,
    customerName: isUser.firstName + " " + isUser.lastName,
    customerEmail: isUser.email,
    customerPhone: isUser.phone || "Unknown",
    customerAddress: "Bogura, Bangladesh",
  };

  // Initiate the payment
  const paymentSession = await initiatePayment(paymentData);
  return paymentSession;
};

export const OrderService = {
  createOrder,
};
