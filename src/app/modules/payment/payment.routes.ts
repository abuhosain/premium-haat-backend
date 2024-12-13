import express from "express";
import { PaymentControllers } from "./payment.controller";
const router = express.Router();

router.post("/confirmation", PaymentControllers.confirmationController);
export const PaymentRoutes = router;
