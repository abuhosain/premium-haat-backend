import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import { initiatePayment } from "../payment/payment.utils";
import ApiError from "../../errors/ApiError";

const prisma = new PrismaClient();

const createOrder = async (user: JwtPayload, payload: any) => {
  if (!user || !user.email) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid user");
  }

  if (!payload || !payload.vendorId || !Array.isArray(payload.orderItems)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid payload");
  }

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
  const orderItemsData = payload.orderItems.map((item: any) => ({

    productId: item.productId,
    orderId: order.id,
    quantity: item.quantity.toString(),
  }));

  if (!orderItemsData.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No order items provided");
  }

  await prisma.orderItem.createMany({
    data: orderItemsData,
  });

  // Decrease product quantities
  for (const item of payload.orderItems) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });

    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, `Product not found: ${item.productId}`);
    }

    if (product.quantity < item.quantity) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Insufficient stock for product: ${product.title}`
      );
    }

    await prisma.product.update({
      where: { id: item.productId },
      data: {
        quantity: product.quantity - item.quantity,
      },
    });
  }

  // Prepare payment data
  const paymentData = {
    transactionId,
    amount: payload.totalPrice,
    customerName: `${isUser.firstName} ${isUser.lastName}`,
    customerEmail: isUser.email,
    customerPhone: isUser.phone || "Unknown",
    customerAddress: "Bogura, Bangladesh",
  };

  // Log payment data for debugging
  console.log("Payment Data:", paymentData);

  // Initiate the payment
  const paymentSession = await initiatePayment(paymentData);

  return paymentSession;
};

export const OrderService = {
  createOrder,
};
