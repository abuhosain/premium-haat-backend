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
  auth(UserRole.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CategoryValidation.createCategory.parse(
      JSON.parse(req.body.data)
    );
    return CategoryControllers.createCategory(req, res, next);
  }
);
// get all category
router.get("/", CategoryControllers.getAllCategoryFromDB);
// get category by id
router.get("/:id", CategoryControllers.getCategoryById);
// delete category
router.delete("/:id", CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
