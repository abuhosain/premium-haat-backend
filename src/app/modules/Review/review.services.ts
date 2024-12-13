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

export const ReviewServices = {
  createReview,
};
