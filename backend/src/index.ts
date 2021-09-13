import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Request, Response } from "express";
import promiseRouter from "express-promise-router";
import { UploadFileController } from "./controllers/upload-file.controller";
import cors from "cors";
import multer from "multer";
import { connectDb } from "./db-helper";
import { FileCleaner } from "./services/file-cleaner.service";

connectDb();
const upload = multer({ dest: "uploads/" });
const app = express();
const router = promiseRouter();
app.use(router);
app.use(cors());

app.get("/", (_: Request, res: Response) =>{
  res.status(200).send("Test");
});

app.get("/hi", (_: Request, res: Response) => {
  res.send("Hello world :)");
});



app.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const controller = new UploadFileController();
    try {
      await controller.handle(req, res);
    } finally {
      const fileCleaner = new FileCleaner();
      await fileCleaner.cleanUpFile(req);
    }
  }
);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Application is listenning on port: ${port}.`);
});
