import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { CategoryControllers } from "./category.controller";
import { fileUploader } from "../../helpers/fileUploader";
import { CategoryValidation } from "./category.validtion";

const router = express.Router();

router.post(
  "/create-category",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CategoryValidation.createCategory.parse(
      JSON.parse(req.body.data)
    );
    return CategoryControllers.createCategory(req, res, next);
  }
);

export const CategoryRoutes = router;
