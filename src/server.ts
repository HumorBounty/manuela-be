import cloudinary from "cloudinary";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import http from "http";
import { router } from "./routes/api";

const app = express();
dotenv.config();

// Security headers
app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" },
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
  express.json()(req, res, next);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", router);

// cloudinary config
// @ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const server = http.createServer(app);

// config port 4000
const port = process.env.PORT || 4000;

// run server port
server.listen(port, () => {
  console.log(`start at port ${port}`);
});

export default app;
