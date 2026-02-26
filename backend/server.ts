import express from "express";
import cors from "cors";

const server = express();

// CORS
server.use(
  cors({
    origin: ["http://localhost:5173"],
    // credentials: true,
  }),
);

const PORT = 3003;
server.listen(PORT, () => console.log(`Backend is running on port ${PORT}`));
