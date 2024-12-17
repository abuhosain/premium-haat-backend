import { Vendor } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";
import { fileUploader } from "../../helpers/fileUploader";

const GetVendor = async (req: any) => {
  const { email } = req.user;

  const getVendor = await prisma.vendor.findUnique({
    where: { email },
    include: {
      product: true,
      follow: true,
      Order: true,
    },
  });

  return getVendor;
};

const updateVendor = async (req: any): Promise<Vendor> => {
  const { email } = req.user;
  const getVendor = await prisma.vendor.findUnique({
    where: { email: email },
  });
  const file = req.file as IFile;
  if (file) {
    req.body.logo = file.path;
  }

  const result = await prisma.vendor.update({
    where: { id: getVendor?.id },
    data: req.body,
  });
  // console.log(result)

  return result;
};

export const VendorServices = {
  GetVendor,
  updateVendor,
};
