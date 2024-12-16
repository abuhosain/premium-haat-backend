import { User } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const getAllActiveUsersFromDB = async (): Promise<User[]> => {
  return await prisma.user.findMany({
    where: {
      isDeleted: false,
    },
  });
};

export const AdminServices = {
  getAllActiveUsersFromDB,
};
