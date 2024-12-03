import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { CategoryControllers } from "./category.controller";

const router = express.Router();

router.post(
  "create-category",
  auth(UserRole.ADMIN),
  CategoryControllers.createCategory
);

export const CategoryRoutes = router;
