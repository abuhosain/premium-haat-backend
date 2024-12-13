import httpStatus from "http-status";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { ReviewServices } from "./review.services";
import ApiError from "../../errors/ApiError";

const createReview = catchAsynch(async (req: any, res) => {
  const { description, rating } = req.body;
  const { productId } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  const result = await ReviewServices.createReview(
    description,
    rating,
    productId,
    userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create review",
    data: result,
  });
});

const getReviewByProductId = catchAsynch(async (req: any, res) => {
  const { productId } = req.params;
  const result = await ReviewServices.getReviewByProductId(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch all reviews",
    data: result,
  });
});

const updateReview = catchAsynch(async (req: any, res) => {
  const { reviewId } = req.params;
  const { description, rating } = req.body;
  const result = await ReviewServices.updateReview(
    reviewId,
    description,
    rating
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Updated Done",
    data: result,
  });
});
const deleteReview = catchAsynch(async (req: any, res) => {
  const { reviewId } = req.params;
  const result = await ReviewServices.deleteReview(reviewId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Deleted Done",
    data: result,
  });
});

const createVendorResponse = catchAsynch(async (req: any, res) => {
  const { reviewId, description } = req.body;
  const userId = req.user.id;
  const result = await ReviewServices.createVendorResponse(
    reviewId,
    userId,
    description
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Response Submited Done",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReviewByProductId,
  updateReview,
  deleteReview,
  createVendorResponse,
};
