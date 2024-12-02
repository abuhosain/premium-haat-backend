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

export const UserRoutes = router;
