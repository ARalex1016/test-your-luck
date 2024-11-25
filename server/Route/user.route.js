import express from "express";

// Controllers
import { protect } from "../Controller/auth.controller.js";
import { getReferrals } from "../Controller/user.controller.js";

const router = express.Router();

router.get("/getReferrals", protect, getReferrals);

export default router;
