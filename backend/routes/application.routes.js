import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  createApplication,
  deleteApplication,
  getApplicationById,
  getApplications,
  updateApplicationById,
} from "../controlers/application.controllers.js";

const router = express.Router();

router.post("/create", verifyToken, createApplication);
router.get("/all", verifyToken, getApplications);
router.get("/details/:id", verifyToken, getApplicationById);
router.post("/update/:id", verifyToken, updateApplicationById);
router.delete("/remove/:id", verifyToken, deleteApplication);

export default router;
