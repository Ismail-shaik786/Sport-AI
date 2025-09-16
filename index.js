// backend/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import multer from "multer";
import { spawn } from "child_process";
import authRoutes from "./routes/auth.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Create folders if they don't exist
const uploadFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const processedFolder = path.join(__dirname, "processed");
if (!fs.existsSync(processedFolder)) fs.mkdirSync(processedFolder);

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ML Detection Endpoint
app.post("/api/detect", upload.single("video"), (req, res) => {
  const { exercise } = req.body;

  if (!req.file) return res.status(400).json({ message: "No video uploaded" });
  if (!exercise) return res.status(400).json({ message: "Exercise not selected" });

  const videoPath = req.file.path;
  let scriptName;

  if (exercise === "running") scriptName = "running_model.py";
  else if (exercise === "pushup" || exercise === "push-up") scriptName = "push_model.py";
  else return res.status(400).json({ message: "Invalid exercise" });

  const modelPath = path.join(__dirname, "models", scriptName);

  // Check if Python script exists
  if (!fs.existsSync(modelPath)) {
    return res.status(500).json({ message: "Python model script not found", script: modelPath });
  }

  console.log("Running Python script:", modelPath);

  const baseName = path.basename(req.file.originalname, path.extname(req.file.originalname)).replace(" ", "_");
  // baseName=baseName.replace(" ", "_");
const outputVideo = path.join(processedFolder, `${Date.now()}_${baseName}.webm`);


  // Spawn Python process
  const pyProcess = spawn("python", [modelPath, videoPath, outputVideo]);

  let stdoutData = "";
  let stderrData = "";

  pyProcess.stdout.on("data", (data) => {
    stdoutData += data.toString();
    console.log("Python stdout:", data.toString());
  });

  pyProcess.stderr.on("data", (data) => {
    stderrData += data.toString();
    console.error("Python stderr:", data.toString());
  });

  pyProcess.on("close", (code) => {
    console.log("Python process exited with code", code);
    if (code === 0) {
      res.json({
        message: "Analysis complete",
        videoUrl: `http://localhost:5000/processed/${path.basename(outputVideo)}`,
        pythonOutput: stdoutData
      });
    } else {
      res.status(500).json({
        message: "ML detection failed",
        pythonError: stderrData || stdoutData
      });
    }
  });
});

// Serve processed videos
app.use("/processed", express.static(path.join(__dirname, "processed")));app.use("/uploads", express.static(uploadFolder));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
