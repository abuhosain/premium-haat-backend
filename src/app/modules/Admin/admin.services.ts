import { User, Vendor } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const getAllNonDeletedUsersFromDB = async (): Promise<User[]> => {
  return await prisma.user.findMany({
    where: {
      status: {
        in: ["ACTIVE", "BLOCKED"],
      },
    },
  });
};

const getAllVendor = async (): Promise<Vendor[]> => {
  return await prisma.vendor.findMany();
};

const getAllOrder = async () => {
  return await prisma.order.findMany({
    include: {
      user: true,
      vendor: true,
    },
  });
};

// Block a vendor (set isBlocked to true)
const blockVendor = async (vendorId: string): Promise<Vendor | null> => {
  return await prisma.vendor.update({
    where: { id: vendorId },
    data: { isBlocked: true },
  });
};

// Unblock a vendor (set isBlocked to false)
const unblockVendor = async (vendorId: string): Promise<Vendor | null> => {
  return await prisma.vendor.update({
    where: { id: vendorId },
    data: { isBlocked: false },
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
  getAllOrder,
  getAllVendor,
  blockVendor,
  unblockVendor,
};
