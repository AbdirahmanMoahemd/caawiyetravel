import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  createRequest,
  deleteRequest,
  getMyRequests,
  getRequestById,
  
  getRequests,
  updateRequestStatus,
  updateRequestToPaid,
} from "../controllers/requestController.js";

const router = express.Router();

router.route("/").get(protect, admin, getRequests).post(createRequest);
router.route("/myrequests/:id").get(protect, getMyRequests);
router.route("/updateRequest/:id").put(protect, updateRequestToPaid);
router
  .route("/:id")
  .get(protect, getRequestById)
  .put(protect, admin, updateRequestStatus)
  .delete(protect, deleteRequest);

export default router;
