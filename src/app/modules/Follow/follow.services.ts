import { prisma } from "../../../shared/prisma";

const followVendor = async (userId: string, vendorId: string) => {
  const existingFollow = await prisma.follow.findUnique({
    where: {
      userId_vendorId: { userId, vendorId },
    },
  });
  if (existingFollow) {
    // If exists, unfollow (delete the record)
    await prisma.follow.delete({
      where: {
        userId_vendorId: { userId, vendorId },
      },
    });
    return { message: "Unfollowed successfully" };
  } else {
    // If not, follow (create a record)
    await prisma.follow.create({
      data: { userId, vendorId },
    });
    return { message: "Followed successfully" };
  }
};

const getFollowersByVendorId = async (vendorId: string) => {
  const result = await prisma.follow.findMany({
    where: {
      vendorId: vendorId,
    },
  });
  return result;
};

export const FollowServices = {
  followVendor,
  getFollowersByVendorId,
};
