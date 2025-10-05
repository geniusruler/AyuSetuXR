import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Camera } from "expo-camera";
import { FaceMesh } from "@mediapipe/face_mesh";
import { CameraType } from "expo-camera";
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
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [statusText, setStatusText] = useState("Initializing camera...");

  // 🔹 Request camera permission
  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        const { status } = await requestPermission();
        if (status !== "granted") {
          alert("Camera permission is required for face tracking.");
          return;
        }
      }
      setStatusText("Camera ready. Detecting face...");
    })();
  }, [permission]);

  useEffect(() => {
    let faceMesh;

    const initFaceMesh = async () => {
      faceMesh = new FaceMesh({
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
        if (
          results.multiFaceLandmarks &&
          results.multiFaceLandmarks.length > 0
        ) {
          const landmarks = results.multiFaceLandmarks[0];
          const metrics = computeMetrics(landmarks);

          if (metrics && onMetrics) {
            onMetrics(metrics, landmarks);
          }

          setStatusText(
            `🧠 Tracking...  Attention ${(metrics?.attentionScore * 100).toFixed(
              0
            )}%`
          );
        } else {
          setStatusText("No face detected. Adjust lighting or position.");
        }
      });
    };

    initFaceMesh();

    const processCameraFrame = async () => {
      if (!cameraRef.current || !faceMesh) {
        requestAnimationFrame(processCameraFrame);
        return;
      }
      try {
        const photo = await cameraRef.current.takePictureAsync({
          skipProcessing: true,
        });
        const response = await fetch(photo.uri);
        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);
        await faceMesh.send({ image: imageBitmap });
      } catch (err) {
        console.warn("Error processing frame:", err);
      }
      requestAnimationFrame(processCameraFrame);
    };

    processCameraFrame();

    return () => {
      if (faceMesh) faceMesh.close();
    };
  }, [onMetrics]);

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={StyleSheet.absoluteFill} type={CameraType.front} />
      <View style={styles.overlay}>
        <Text style={styles.text}>{statusText}</Text>
      </View>
    </View>
  );
}
