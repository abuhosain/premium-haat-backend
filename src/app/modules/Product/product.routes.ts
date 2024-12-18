import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { ProductValidation } from "./product.validaiton";
import { ProductControllers } from "./product.controller";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/create-product",
  multerUpload.single("file"),
  auth(UserRole.VENDOR),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductValidation.createProduct.parse(JSON.parse(req.body.data));
    return ProductControllers.createProduct(req, res, next);
  }
);

// get all product
router.get("/", ProductControllers.getAllProduct);

// get product by id
router.get("/:id", ProductControllers.getProductById);
// get product by id
router.get(
  "/vendor/product",
  auth(UserRole.VENDOR),
  ProductControllers.getProductByVendor
);

// Update product
router.put(
  "/:id",
  multerUpload.single("file"),
  auth(UserRole.VENDOR),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = ProductValidation.updateProduct.parse(
        JSON.parse(req.body.data)
      );
    }
    return ProductControllers.updateProduct(req, res, next);
  }
);

// delete product
router.delete("/:id", ProductControllers.deleteProduct);

// POST /api/products/multiple
router.post("/multiple", ProductControllers.fetchMultipleProducts);

export const ProductRoutes = router;
