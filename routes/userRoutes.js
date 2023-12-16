import express from "express";
import {
  addToWishlist,
  createBuyerUser,
  createUser,
  deletUser,
  getAllUser,
  getUserProfileById,
  login,
  updatePassword,
  updateProfile,
  updateUser,
  updateUserRole,
  sendOtp,
  verifyOtp
} from "../controllers/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getAllUser).post(createUser);
router.route("/register").post(createBuyerUser);
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(protect, verifyOtp);
router.route("/:id").put(updateUser).delete(protect, admin, deletUser);
router.route("/login").post(login);
router.route("/profile/:id").post(getUserProfileById);
router.route("/update/passwors/:id").put(updatePassword);
router.route("/role/:id").put(protect, updateUserRole);
router.route("/profile/:id").put(protect, updateProfile);
router.route("/add-to-wishlist/:id").post(protect, addToWishlist);

export default router;
