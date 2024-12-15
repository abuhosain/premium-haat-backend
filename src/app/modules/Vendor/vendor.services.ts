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
    where: { email },
    include: {
      product: true,
      follow: true,
      Order: true,
    },
  });
  const file = req?.file as IFile;
  // Prepare the update data
  let updateData: any = req?.body;
  // If a file is uploaded, upload to Cloudinary and update the logo
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    updateData.logo = uploadToCloudinary?.secure_url;
  }
  const result = await prisma.vendor.update({
    where: { id: getVendor?.id },
    data: updateData,
  });

  return result;
};

export const VendorServices = {
  GetVendor,
  updateVendor,
};
