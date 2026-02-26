import express from "express";
import cors from "cors";
import { env } from "#config/env.ts";
import uploadRouter from "#routes/upload.ts";

const server = express();

// CORS
server.use(
  cors({
    origin: ["http://localhost:5173"],
    // credentials: true,
  }),
);

// Routes
server.use("/api/upload", uploadRouter);

server.listen(env.PORT, () => console.log(`Backend is running on port ${env.PORT}`));
