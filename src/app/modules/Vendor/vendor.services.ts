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
  console.log(req.body)
  // console.log(getVendor);
  const file = req?.file as IFile;
  // If a file is uploaded, upload to Cloudinary and update the logo
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.logo = uploadToCloudinary?.secure_url;
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
