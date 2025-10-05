import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Camera, CameraType, useCameraPermissions } from "expo-camera";
import { computeMetrics } from "@/utils/computeMetrics";

// Load MediaPipe safely
let FaceMeshModule;
try {
  FaceMeshModule = require("@mediapipe/face_mesh");
} catch (err) {
  console.warn("⚠️ Mediapipe not found:", err);
}

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

  // 1️⃣ Handle camera permissions
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

  // 2️⃣ FaceMesh setup
  useEffect(() => {
    if (!FaceMeshModule) {
      setStatusText("⚠️ Mediapipe not found. Reinstall dependencies.");
      return;
    }

    const { FaceMesh } = FaceMeshModule;
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks?.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        const metrics = computeMetrics(landmarks);

        onMetrics?.(metrics, landmarks);
        setStatusText(
          `👁 Focus ${(metrics?.attentionScore * 100 || 0).toFixed(0)}%`
        );
      } else {
        setStatusText("😶 No face detected — adjust lighting or distance.");
      }
    });

    const processFrames = async () => {
      if (!cameraRef.current) {
        requestAnimationFrame(processFrames);
        return;
      }

      try {
        const photo = await cameraRef.current.takePictureAsync({
          skipProcessing: true,
        });
        if (photo?.uri) {
          const response = await fetch(photo.uri);
          const blob = await response.blob();
          const imageBitmap = await createImageBitmap(blob);
          await faceMesh.send({ image: imageBitmap });
        }
      } catch (err) {
        console.warn("Frame processing error:", err);
      }

      requestAnimationFrame(processFrames);
    };

    processFrames();

    return () => {
      faceMesh.close();
    };
  }, [onMetrics]);

  // 3️⃣ Handle permission UI states
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

  // 4️⃣ Render the camera and overlay
  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        type={CameraType.front}
        ratio="16:9"
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{statusText}</Text>
      </View>
    </View>
  );
}
