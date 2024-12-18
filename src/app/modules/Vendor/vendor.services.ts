import { Product, Vendor } from "@prisma/client";
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

const getProductsByVendorId = async (vendorId: string): Promise<Product[]> => {
  return await prisma.product.findMany({
    where: { vendorId },
    include: {
      category: true,
      vendor: true,
      coupon: true,
      review: true,
    },
  });
};

const getVendorById = async (id: string): Promise<Vendor | null> => {
  return await prisma.vendor.findUnique({
    where: { id },
    include: {
      product: {
        include: {
          vendor: true, // Include the vendor details within each product
        },
      },
      follow: true, // Include other related data (like followers)
    },
  });
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
  getProductsByVendorId,
  getVendorById,
};
