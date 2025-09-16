// backend/routes/detect.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const router = express.Router();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload + processed folders
const uploadFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const processedFolder = path.join(__dirname, "../processed");
if (!fs.existsSync(processedFolder)) fs.mkdirSync(processedFolder);

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Detection route
router.post("/", upload.single("video"), (req, res) => {
  const { exercise } = req.body;

  if (!req.file) return res.status(400).json({ message: "No video uploaded" });
  if (!exercise) return res.status(400).json({ message: "Exercise not selected" });

  const videoPath = req.file.path;

  // Map exercise to Python script
  let scriptName;
  if (exercise === "running") scriptName = "running_model.py";
  else if (exercise === "pushup" || exercise === "push-up") scriptName = "push_model.py";
  else return res.status(400).json({ message: "Invalid exercise" });

  const modelPath = path.join(__dirname, "../models", scriptName);

  if (!fs.existsSync(modelPath)) {
    return res.status(500).json({ message: "Python model script not found", script: modelPath });
  }

  console.log("Running Python script:", modelPath);

  const outputVideo = path.join(
    processedFolder,
    `${Date.now()}_${req.file.originalname.replace(/\s/g, "_")}.webm`
  );

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

    if (code === 0 && fs.existsSync(outputVideo)) {
      // ✅ Success → return processed video
      return res.json({
        message: "ML Analysis complete",
        videoUrl: `http://localhost:5000/processed/${path.basename(outputVideo)}`,
        pythonOutput: stdoutData
      });
    } else {
      // ❌ Fallback → copy original to processed
      const fallbackVideo = path.join(processedFolder, `fallback_${Date.now()}_${req.file.originalname.replace(/\s/g, "_")}.webm`);
      fs.copyFileSync(videoPath, fallbackVideo);

      return res.json({
        message: "⚠️ ML analysis failed, showing original video instead",
        videoUrl: `http://localhost:5000/processed/${path.basename(fallbackVideo)}`,
        pythonError: stderrData || stdoutData
      });
    }
  });
});

export default router;
