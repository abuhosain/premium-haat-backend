import { prisma } from "../../../shared/prisma";

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

export const VendorServices = {
  GetVendor,
};
