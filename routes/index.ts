import express from "express";
import photos from "./photos";

const router = express.Router();

router.use("/photos", photos);

export default router;
