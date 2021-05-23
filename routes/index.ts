import express from "express";

import photos from "./photos";

const router = express.Router();

router.use("/photo", photos);

export default router;
