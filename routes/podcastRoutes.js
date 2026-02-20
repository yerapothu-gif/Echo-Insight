import express from "express";
import protect from "../middleware/authMiddleware.js";
import { generatePodcast } from "../controllers/podcastController.js";

const router = express.Router();
router.post("/generate", protect, generatePodcast);
export default router;
