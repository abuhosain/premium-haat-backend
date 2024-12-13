import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post(
  "/:productId",
  auth(UserRole.CUSTOMER),
  ReviewController.createReview
);

router.get("/:productId", ReviewController.getReviewByProductId);

export const ReviewRoutes = router;
