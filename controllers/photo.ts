import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { nanoid } from "nanoid";
import AWS from "aws-sdk";

const S3 = new AWS.S3();
const DynamoDB = new AWS.DynamoDB();

export const upload = async (req: Request, res: Response) => {
  try {
    if (!req.files) return res.status(400).json({ success: false, error: "Missing photo" });

    const photo = req.files.photo as UploadedFile;
    const { name, author } = req.body;

    const filename = nanoid();

    // Upload photo
    const fileParams = {
      Bucket: process.env.S3_BUCKET_NAME as string,
      Body: photo.data,
      Key: `photos/${filename}`,
      ACL: "public-read",
      ContentType: "image/jpeg",
    };

    await S3.upload(fileParams).promise();

    // Store to database
    const dbParams = {
      TableName: "photo",
      Item: {
        photoId: { S: filename },
        name: { S: name },
        author: { S: author },
      },
    };
    await DynamoDB.putItem(dbParams).promise();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};
