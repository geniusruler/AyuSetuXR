import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { Camera, CameraType, useCameraPermissions } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { computeMetrics } from "@/utils/computeMetrics";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  overlay: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 16, textAlign: "center" },
});

export default function CameraFaceMesh({ onMetrics }) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [statusText, setStatusText] = useState("🧠 Initializing face tracking...");
  const [isReady, setIsReady] = useState(false);

  // 1️⃣ Handle Camera Permissions
  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        const { status } = await requestPermission();
        if (status !== "granted") {
          alert("Camera permission is required for face tracking.");
        }
      }
    })();
  }, [permission]);

  // 2️⃣ On Face Detection Results
  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      const face = faces[0];

      // You can compute metrics here using landmarks (if needed)
      const metrics = computeMetrics(face); // make sure computeMetrics handles expo-face-detector format
      onMetrics?.(metrics, face);

      setStatusText(`👁 Face detected (yaw: ${face.yawAngle?.toFixed(1)}°)`);
    } else {
      setStatusText("😶 No face detected — adjust lighting or distance.");
    }
  };

  // 3️⃣ Camera Ready
  const handleCameraReady = () => {
    setIsReady(true);
  };

  // 4️⃣ Handle Permission UI States
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your camera permission</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // 5️⃣ Render Camera + Overlay
  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <Text style={styles.text}>🌐 Face detection not supported on web yet.</Text>
      ) : (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          type={CameraType.front}
          ratio="16:9"
          onCameraReady={handleCameraReady}
          onFacesDetected={isReady ? handleFacesDetected : undefined}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 100,
            tracking: true,
          }}
        />
      )}

      <View style={styles.overlay}>
        <Text style={styles.text}>{statusText}</Text>
      </View>
    </View>
  );
}
