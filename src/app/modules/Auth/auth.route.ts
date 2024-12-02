import express from "express";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.post("/login", AuthControllers.loginUser);

// refresh token
router.post("/refresh-token", AuthControllers.refreshToken);

// change password
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
  AuthControllers.changePassword
);

export const AuthRoutes = router;
