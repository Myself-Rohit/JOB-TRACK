import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { createApplication } from "../controlers/application.controllers.js";

const router = express.Router();

router.post("/create", verifyToken, createApplication);

export default router;
