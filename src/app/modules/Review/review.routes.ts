import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ReviewController } from "./review.controller";

const router = express.Router();
// create review
router.post(
  "/:productId",
  auth(UserRole.CUSTOMER),
  ReviewController.createReview
);
// get all review
router.get("/:productId", ReviewController.getReviewByProductId);
// update review
router.put(
  "/:reviewId",
  auth(UserRole.CUSTOMER),
  ReviewController.updateReview
);
// delete review
router.delete(
  "/:reviewId",
  auth(UserRole.CUSTOMER),
  ReviewController.deleteReview
);

// create response
router.post(
  "/:reviewId/response",
  auth(UserRole.VENDOR),
  ReviewController.createVendorResponse
);
// update response
router.put(
  "/response/:responseId",
  auth(UserRole.VENDOR),
  ReviewController.updateVendorResponse
);

// delete response
router.delete(
  "/response/:responseId",
  auth(UserRole.VENDOR),
  ReviewController.deleteVendorResponse
);

export const ReviewRoutes = router;
