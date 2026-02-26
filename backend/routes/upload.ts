import { Router } from "express";
import multer from "multer";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import crypto from "node:crypto";
import { env } from "#config/env.ts";
import {
  MAX_FILE_SIZE,
  ALLOWED_MIMETYPES,
  ALLOWED_EXTENSIONS,
  BASE_TEMP_DIR,
  VIDEO_SUBFOLDER,
} from "#config/constants.ts";

const router = Router();

const UPLOAD_DIR = path.join(BASE_TEMP_DIR, env.UPLOAD_DIR, VIDEO_SUBFOLDER);

const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
      cb(null, UPLOAD_DIR);
    } catch (err) {
      cb(err as Error, UPLOAD_DIR);
    }
  },
  filename: (_req, file, cb) => {
    const uniqueId = crypto.randomUUID();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueId}${ext}`);
  },
});

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (
    ALLOWED_MIMETYPES.includes(file.mimetype as (typeof ALLOWED_MIMETYPES)[number]) &&
    ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only MP4 and MOV files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

router.post("/", upload.single("video"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No video file uploaded" });
    return;
  }

  res.status(200).json({
    message: "Video uploaded successfully",
    file: {
      id: path.basename(req.file.filename, path.extname(req.file.filename)),
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path,
    },
  });
});

export default router;
