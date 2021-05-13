import express from "express";
import { add, getAll } from "../controllers/photo";

const router = express.Router();

router.post("/", add);
router.get("/", getAll);

export default router;
