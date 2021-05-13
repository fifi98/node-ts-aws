import express, { Application } from "express";
import fileUpload from "express-fileupload";
import * as dotenv from "dotenv";
import AWS from "aws-sdk";

dotenv.config();
AWS.config.update({ region: process.env.AWS_REGION });

import routes from "./routes";

const app: Application = express();

app.use(fileUpload());
app.use("/api", routes);

app.listen(process.env.PORT || 8080, () => console.log(`Started on port ${process.env.PORT || 8080}`));
