import { Request, Response } from "express";

export const upload = (req: Request, res: Response) => {
  res.status(200).json({ success: true });
};
