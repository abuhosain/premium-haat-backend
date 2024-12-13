import httpStatus from "http-status";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.services";

const createOrder = catchAsynch(async (req: any, res) => {
  const user = req.user;
  const payload = req.body;
  const order = await OrderService.createOrder(user, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created Successfully",
    data: order,
  });
});

export const OrderControllers = {
  createOrder,
};
