import express from "express";
import routes from "./routes";

const server = express();

server.use("/api", routes);

server.listen(process.env.PORT || 8080, () => console.log(`Started on port ${process.env.PORT || 8080}`));
