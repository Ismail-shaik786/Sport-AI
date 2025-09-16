import { spawn } from "child_process";
import path from "path";

export const pushupDetection = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), "models", "pushup.py"); // ensure this exists

    const process = spawn("python", [scriptPath, inputPath, outputPath]);

    process.stdout.on("data", (data) => console.log("Python stdout:", data.toString()));
    process.stderr.on("data", (data) => console.error("Python stderr:", data.toString()));

    process.on("close", (code) => {
      if (code === 0) resolve(true);
      else reject(new Error(`Python process exited with code ${code}`));
    });
  });
};
