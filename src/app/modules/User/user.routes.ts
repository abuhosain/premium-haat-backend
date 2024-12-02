import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controllers";
import { fileUploader } from "../../helpers/fileUploader";
import { UserValidation } from "./user.validation";

const router = express.Router();

// create admiin
router.post(
  "/create-admin",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.creatAdmin.parse(JSON.parse(req.body.data));
    return UserController.createAdmin(req, res, next);
  }
);

// create customer
router.post(
  "/create-customer",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createCustomer.parse(JSON.parse(req.body.data));
    return UserController.createCustomer(req, res, next);
  }
);

// create vendor
router.post(
  "/create-vendor",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createVendor.parse(JSON.parse(req.body.data));
    return UserController.createVendor(req, res, next);
  }
);

export const UserRoutes = router;
