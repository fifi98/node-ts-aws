import express from "express";
import photo from "./photo";

const router = express.Router();

router.use("/photo", photo);

export default router;
