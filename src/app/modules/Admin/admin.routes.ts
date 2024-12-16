import express, { NextFunction, Request, Response } from "express";
import { AdminControllers } from "./admin.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

// get all category
router.get("/", auth(UserRole.ADMIN), AdminControllers.getAllActiveUsersFromDB);

export const AdminRoutes = router;
