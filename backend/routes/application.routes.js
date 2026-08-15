import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  createApplication,
  getApplications,
  updateApplicationById,
} from "../controlers/application.controllers.js";

const router = express.Router();

router.post("/create", verifyToken, createApplication);
router.get("/all", verifyToken, getApplications);
router.post("/update/:id", verifyToken, updateApplicationById);

export default router;
