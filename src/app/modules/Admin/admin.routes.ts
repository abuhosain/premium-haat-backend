import express from "express";
import { AdminControllers } from "./admin.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

// Get all non-deleted users
router.get("/", auth(UserRole.ADMIN), AdminControllers.getAllNonDeletedUsers);

// Get all vendor
router.get("/vendor", auth(UserRole.ADMIN), AdminControllers.getAllVendor);

// Get all non-deleted users
router.get("/order", auth(UserRole.ADMIN), AdminControllers.getAllOrder);

// Block a vendor
router.put(
  "/block/vendor/:vendorId",
  auth(UserRole.ADMIN),
  AdminControllers.blockVendor
);

// Unblock a user
router.put(
  "/unblock/vendor/:vendorId",
  auth(UserRole.ADMIN),
  AdminControllers.unblockVendor
);
// Block a user
router.put("/block/:userId", auth(UserRole.ADMIN), AdminControllers.blockUser);

// Unblock a user
router.put(
  "/unblock/:userId",
  auth(UserRole.ADMIN),
  AdminControllers.unblockUser
);

// Delete a user
router.delete(
  "/user/:userId",
  auth(UserRole.ADMIN),
  AdminControllers.deleteUser
);

export const AdminRoutes = router;
