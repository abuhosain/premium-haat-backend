import httpStatus from "http-status";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

const createReview = async (
  description: string,
  rating: number,
  productId: string,
  userId: string
) => {
  return await prisma.review.create({
    data: {
      description,
      rating,
      productId,
      userId,
    },
  });
};

const getReviewByProductId = async (productId: string) => {
  const result = await prisma.review.findMany({
    where: {
      productId,
    },
    include: {
      user: {
        select: {
          id: true, // Include the user ID
          email: true, // Include the user's email
          profile: {
            select: {
              firstName: true,
              lastName: true,
              img: true,
            },
          },
        },
      },
    },
  });
  return result;
};

const updateReview = async (
  reviewId: string,
  description: string,
  rating: number
) => {
  return await prisma.review.update({
    where: { id: reviewId },
    data: {
      description,
      rating,
    },
  });
};

const deleteReview = async (reviewId: string) => {
  return await prisma.review.delete({
    where: { id: reviewId },
  });
};

// create response
const createVendorResponse = async (
  reviewId: string,
  userId: string,
  description: string
) => {
  const vendor = await prisma.vendor.findFirst({
    where: {
      user: {
        id: userId,
      },
    },
    select: { id: true },
  });

  if (!vendor) {
    throw new ApiError(httpStatus.NOT_FOUND, "Vendor not found");
  }

  const vendorId = vendor.id;

  // Check if the vendor is the product owner
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    include: {
      product: {
        select: {
          vendorId: true, // Check if the vendor is the product owner
        },
      },
    },
  });

  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review not found");
  }

  if (review.product.vendorId !== vendorId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Only the vendor can respond to this review"
    );
  }

  // Create the vendor response
  return await prisma.response.create({
    data: {
      reviewId,
      vendorId,
      description,
    },
  });
};

// Update Vendor Response to Review
const updateVendorResponse = async (
  responseId: string,
  description: string
) => {
  const response = await prisma.response.findUnique({
    where: { id: responseId },
  });

  if (!response) {
    throw new ApiError(httpStatus.NOT_FOUND, "Vendor response not found");
  }

  return await prisma.response.update({
    where: { id: responseId },
    data: {
      description,
    },
  });
};

export const ReviewServices = {
  createReview,
  getReviewByProductId,
  updateReview,
  deleteReview,
  createVendorResponse,
  updateVendorResponse,
};
