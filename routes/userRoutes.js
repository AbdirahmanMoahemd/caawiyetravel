import express from "express";
import {
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
  verifyOtp,
  updateOtpAndVerify
} from "../controllers/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getAllUser).post(createUser);
router.route("/register").post(createBuyerUser);
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(protect, verifyOtp);
router.route("/update/otp/:id").put(protect, updateOtpAndVerify)
router.route("/:id").put(updateUser).delete(protect, admin, deletUser);
router.route("/login").post(login);
router.route("/profile/:id").post(getUserProfileById);
router.route("/update/passwors/:id").put(updatePassword);
router.route("/role/:id").put(protect, updateUserRole);
router.route("/profile/:id").put(protect, updateProfile);

export default router;
