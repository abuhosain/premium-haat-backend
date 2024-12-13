import { join } from "path";
import ejs from "ejs";

import { verifyPayment } from "../payment/payment.utils";
import { prisma } from "../../../shared/prisma";
import { OrderStatus, PaymentStatus } from "@prisma/client";

const confirmationService = async (txId: string, status: string) => {
  // Verify payment
  const verifyResponse = await verifyPayment(txId);
  // console.log("verifyResponse", verifyResponse);
  let paymentData;

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    // Update order payment status
    const updatedOrder = await prisma.order.update({
      where: { txId },
      data: {
        paymentStatus: PaymentStatus.PAID, // Replace with your actual enum or constant value for "paid"
        status: OrderStatus.DELIVERED, // Replace with the appropriate status
      },
    });

    // Retrieve updated order details
    const orderData = await prisma.order.findUnique({
      where: { txId },
    });

    if (!orderData) {
      throw new Error("Order not found.");
    }

    // Create a payment record and link it to the order
    await prisma.payment.create({
      data: {
        txId,
        amount: verifyResponse.amount,
        orderId: orderData.id,
      },
    });

    // Prepare payment data for the confirmation template
    paymentData = {
      consumerName: verifyResponse.cus_name,
      email: verifyResponse.cus_email,
      phone: verifyResponse.cus_phone,
      transactionId: verifyResponse.mer_txnid,
      amount: verifyResponse.amount,
      currency: "BDT",
      paymentType: verifyResponse.payment_type,
      payTime: verifyResponse.date,
      paymentStatus: verifyResponse.pay_status,
    };
    console.log("payment dat", paymentData);
  }

  // Render appropriate template based on status
  const templatePath =
    status === "success"
      ? join(process.cwd(), "views", "confirmation.ejs")
      : join(process.cwd(), "views", "failed.ejs");

  const template = await ejs.renderFile(templatePath, paymentData || {});
  return template;
};

export const paymentServices = {
  confirmationService,
};
