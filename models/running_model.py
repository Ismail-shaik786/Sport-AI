import cv2
import mediapipe as mp
import math
import time
from collections import deque
import sys
import os

# Get input/output from command line
VIDEO_INPUT = sys.argv[1]
VIDEO_OUTPUT = sys.argv[2]

# Convert to .webm instead of .mp4
VIDEO_OUTPUT = VIDEO_OUTPUT.replace(".mp4", ".webm")

# Constants
SCALE_M_PER_PIXEL = 0.002
SMOOTHING_WINDOW = 5

# Mediapipe Setup
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5)

# Video I/O
cap = cv2.VideoCapture(VIDEO_INPUT)
width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps    = cap.get(cv2.CAP_PROP_FPS)

# Use VP9 codec for WebM
fourcc = cv2.VideoWriter_fourcc(*'VP90')
out = cv2.VideoWriter(VIDEO_OUTPUT, fourcc, fps, (width, height))

prev_x, prev_y, prev_time = None, None, None
speed_buffer = deque(maxlen=SMOOTHING_WINDOW)
max_speed = 0

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb_frame)
    current_time = time.time()

    if results.pose_landmarks:
        mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        hip = results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]
        x = int(hip.x * width)
        y = int(hip.y * height)

        if prev_x is not None:
            distance_px = math.hypot(x - prev_x, y - prev_y)
            time_interval = current_time - prev_time
            if time_interval > 0:
                distance_m = distance_px * SCALE_M_PER_PIXEL
                raw_speed = distance_m / time_interval
                speed_buffer.append(raw_speed)
                smoothed_speed = sum(speed_buffer) / len(speed_buffer)
                if smoothed_speed > max_speed:
                    max_speed = smoothed_speed
                cv2.putText(frame, f"Speed: {smoothed_speed:.2f} m/s", (50, 50),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

        prev_x, prev_y, prev_time = x, y, current_time

    out.write(frame)

# Append last frame with max speed
if prev_x is not None:
    cap2 = cv2.VideoCapture(VIDEO_INPUT)
    last_frame = None
    while cap2.isOpened():
        ret, frame = cap2.read()
        if not ret:
            break
        last_frame = frame
    cap2.release()
    if last_frame is not None:
        rgb_last = cv2.cvtColor(last_frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb_last)
        if results.pose_landmarks:
            mp_drawing.draw_landmarks(last_frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        cv2.putText(last_frame, f"Max Speed: {max_speed:.2f} m/s", (50, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 255), 3)
        out.write(last_frame)

# cap = cv2.VideoCapture(VIDEO_OUTPUT)
# New_OUTPUT = VIDEO_OUTPUT.replace(".webm", ".mp4")
# if not cap.isOpened():
#     print("❌ Error: Could not open input video") 

# # Get video properties
# fps = cap.get(cv2.CAP_PROP_FPS) or 30
# width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
# height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# # Define codec and create VideoWriter for MP4
# fourcc = cv2.VideoWriter_fourcc(*"mp4v")  # H.264 browser-friendly
# out = cv2.VideoWriter(New_OUTPUT, fourcc, fps, (width, height))

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         break
#     out.write(frame)

cap.release()
out.release()
cv2.destroyAllWindows()
print("Running analysis complete")
print(f"Output saved at: {VIDEO_OUTPUT}")
