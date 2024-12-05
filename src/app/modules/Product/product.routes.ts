import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { ProductValidation } from "./product.validaiton";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post(
  "/create-product",
  fileUploader.upload.single("file"),
  auth(UserRole.VENDOR),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductValidation.createProduct.parse(JSON.parse(req.body.data));
    return ProductControllers.createProduct(req, res, next);
  }
);
// get all category
router.get("/", ProductControllers.getAllProduct);

export const ProductRoutes = router;
