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

export const ReviewServices = {
  createReview,
  getReviewByProductId,
  updateReview,
};
