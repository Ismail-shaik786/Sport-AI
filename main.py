from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import os
from models import pushup_model, running_model

app = FastAPI()

# Allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.post("/api/detect")
async def detect_exercise(
    exercise: str = Form(...),
    video: UploadFile = File(...)
):
    # Save uploaded video
    video_path = os.path.join(UPLOAD_FOLDER, video.filename)
    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)

    # Process video with the right model
    output_path = os.path.join(OUTPUT_FOLDER, f"processed_{video.filename}")

    if exercise == "push-ups":
        result = pushup_model.process_video(video_path, output_path)
    elif exercise == "running":
        result = running_model.process_video(video_path, output_path)
    else:
        return {"error": "Exercise model not implemented"}

    # Return processed video path and result data
    return {"output_video_path": f"http://localhost:5000/{output_path}", "result": result}

# Serve processed videos
@app.get("/outputs/{filename}")
def get_processed_video(filename: str):
    file_path = os.path.join(OUTPUT_FOLDER, filename)
    return FileResponse(file_path)
