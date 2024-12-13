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

export const ReviewController = {
  createReview,
};
