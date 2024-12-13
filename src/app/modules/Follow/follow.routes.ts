import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { FollowControllers } from "./follow.controller";

const router = express.Router();

router.post(
  "/:vendorId",
  auth(UserRole.CUSTOMER),
  FollowControllers.followVendor
);

export const FollowRoutes = router;
