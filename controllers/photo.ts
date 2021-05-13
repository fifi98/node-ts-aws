import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { nanoid } from "nanoid";

import s3 from "../config/s3";

export const upload = async (req: Request, res: Response) => {
  try {
    if (!req.files) return res.status(400).json({ success: false, error: "Missing photo" });

    const photo = req.files.photo as UploadedFile;
    const { name, author } = req.body;

    const filename = nanoid();

    // Upload photo
    const params = {
      Bucket: process.env.S3_BUCKET_NAME as string,
      Body: photo.data,
      Key: `photos/${filename}`,
      ACL: "public-read",
      ContentType: "image/jpeg",
    };

    await s3.upload(params).promise();

    // Store to database

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
