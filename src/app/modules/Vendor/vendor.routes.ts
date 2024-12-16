import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { VendorControllers } from "./vendor.controller";

const router = express.Router();

router.get("/me", auth(UserRole.VENDOR), VendorControllers.getVendor);

// Update product
router.put(
  "/update",
  fileUploader.upload.single("file"),
  auth(UserRole.VENDOR),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    return VendorControllers.updateVendor(req, res, next);
  }
);

export const VendorRoutes = router;
