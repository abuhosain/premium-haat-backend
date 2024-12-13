import { UserRole } from "@prisma/client";
import express from "express";
import { OrderControllers } from "./order.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/confirmation",
  auth(UserRole.CUSTOMER),
  OrderControllers.createOrder
);
export const OrderRoutes = router;
