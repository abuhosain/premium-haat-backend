import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { VendorControllers } from "./vendor.controller";

const router = express.Router();

router.get("/me", auth(UserRole.VENDOR), VendorControllers.getVendor);

export const VendorRoutes = router;