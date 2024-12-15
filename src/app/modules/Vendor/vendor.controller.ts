import httpStatus from "http-status";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { VendorServices } from "./vendor.services";

const getVendor = catchAsynch(async (req, res) => {
  const result = await VendorServices.GetVendor(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor fetched successfully",
    data: result,
  });
});

const updateVendor = catchAsynch(async (req, res) => {
  const result = await VendorServices.updateVendor(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor updated successfully",
    data: result,
  });
});

export const VendorControllers = {
  getVendor,
  updateVendor,
};
