import cv2
import mediapipe as mp
import numpy as np
import sys
import os

# Get input/output paths from command line
input_video_path = sys.argv[1]
output_video_path = sys.argv[2]

# Convert to .webm instead of .mp4
output_video_path = output_video_path.replace(".mp4", ".webm")

# Clean filename: remove spaces
output_video_path = output_video_path.replace(" ", "_")

# Create output folder if it doesn't exist
output_folder = os.path.dirname(output_video_path)
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
mp_draw = mp.solutions.drawing_utils

# Push-up counters
pushup_count = 0
pushup_stage = None

def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    if angle > 180.0:
        angle = 360 - angle
    return angle

# Open video
cap = cv2.VideoCapture(input_video_path)
if not cap.isOpened():
    print(f"Error: Cannot open video {input_video_path}")
    sys.exit(1)

width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)

# Use VP9 codec for WebM
fourcc = cv2.VideoWriter_fourcc(*'VP90')
out = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))
if not out.isOpened():
    print(f"Error: Cannot open VideoWriter for {output_video_path}")
    sys.exit(1)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(img_rgb)

    if results.pose_landmarks:
        landmarks = results.pose_landmarks.landmark
        shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
        elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                 landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
        wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                 landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]

        angle = calculate_angle(shoulder, elbow, wrist)

        if angle > 160:
            pushup_stage = "up"
        if angle < 90 and pushup_stage == "up":
            pushup_stage = "down"
            pushup_count += 1

        mp_draw.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        cv2.putText(frame, f'Push-ups: {pushup_count}', (50,50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2, cv2.LINE_AA)

    out.write(frame)

cap.release()
out.release()
cv2.destroyAllWindows()
print("Push-up analysis complete")
print(f"Output saved at: {output_video_path}")
