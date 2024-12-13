import { prisma } from "../../../shared/prisma";

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
    include: { user: true },
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

export const ReviewServices = {
  createReview,
  getReviewByProductId,
  updateReview,
  deleteReview,
};
