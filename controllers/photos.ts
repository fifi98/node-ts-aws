import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { nanoid } from "nanoid";
import AWS from "aws-sdk";

const S3 = new AWS.S3();
const DynamoDB = new AWS.DynamoDB.DocumentClient();

export const add = async (req: Request, res: Response) => {
  try {
    if (!req.files) return res.status(400).json({ success: false, error: "Missing photo" });

    const photo = req.files.photo as UploadedFile;
    const { name, author } = req.body;

    const filename: string = nanoid();

    // Upload photo
    const fileParams = {
      Bucket: process.env.S3_BUCKET_NAME as string,
      Body: photo.data,
      Key: `photos/${filename}`,
      ACL: "public-read",
      ContentType: "image/jpeg",
    };

    await S3.upload(fileParams).promise();

    // Store data to the database
    const dbParams = {
      TableName: "photo",
      Item: {
        photoId: filename,
        name: name,
        author: author,
      },
    };

    await DynamoDB.put(dbParams).promise();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const photos = await DynamoDB.scan({ TableName: "photo" }).promise();

    res.status(200).json({ success: true, data: photos.Items });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
