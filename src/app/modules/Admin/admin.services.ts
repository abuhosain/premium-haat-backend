import { User } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

// Get all non-deleted users (ACTIVE or BLOCKED)
const getAllNonDeletedUsersFromDB = async (): Promise<User[]> => {
  return await prisma.user.findMany({
    where: {
      status: {
        in: ["ACTIVE", "BLOCKED"],
      },
    },
  });
};

// Block a user (set status to BLOCKED)
const blockUser = async (userId: string): Promise<User | null> => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status: "BLOCKED" },
  });
};

// Unblock a user (set status to ACTIVE)
const unblockUser = async (userId: string): Promise<User | null> => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status: "ACTIVE" },
  });
};

// Delete a user (set status to DELETED)
const deleteUser = async (userId: string): Promise<User | null> => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status: "DELETED" },
  });
};

export const AdminServices = {
  getAllNonDeletedUsersFromDB,
  blockUser,
  unblockUser,
  deleteUser,
};
