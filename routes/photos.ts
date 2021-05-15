import express from "express";
import { add, getAll } from "../controllers/photos";

const router = express.Router();

router.post("/", add);
router.get("/", getAll);

export default router;
