import express from "express";
import { AdminControllers } from "./admin.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

// Get all non-deleted users
router.get("/", auth(UserRole.ADMIN), AdminControllers.getAllNonDeletedUsers);

// Block a user
router.put(
  "/block/:userId",
  auth(UserRole.ADMIN),
  AdminControllers.blockUser
);

// Unblock a user
router.put(
  "/unblock/:userId",
  auth(UserRole.ADMIN),
  AdminControllers.unblockUser
);

// Delete a user
router.delete("/:userId", auth(UserRole.ADMIN), AdminControllers.deleteUser);

export const AdminRoutes = router;
