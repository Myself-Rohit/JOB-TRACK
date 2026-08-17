import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  deleteProfile,
  getProfileInfo,
  updateProfileInfo,
} from "../controlers/profile.controllers.js";
const router = express.Router();

router.get("/info", verifyToken, getProfileInfo);
router.post("/info/update", verifyToken, updateProfileInfo);
router.delete("/delete", verifyToken, deleteProfile);
export default router;
