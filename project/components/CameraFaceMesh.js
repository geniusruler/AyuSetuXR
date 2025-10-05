import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { computeMetrics } from "@/utils/computeMetrics";

// Lazy TensorFlow imports (for EAS build compatibility)
let tf, FaceMesh, cameraWithTensors, TensorCamera;

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
  const [permission, requestPermission] = useCameraPermissions();
  const [statusText, setStatusText] = useState("Initializing...");
  const [model, setModel] = useState(null);
  const [isTFReady, setIsTFReady] = useState(false);

  // Load TensorFlow and FaceMesh dynamically (safe for builds)
  useEffect(() => {
    const loadTF = async () => {
      try {
        // Prevent TensorFlow loading in web fallback
        if (Platform.OS === "web") {
          setStatusText("⚠️ TensorFlow not supported on Web — using demo mode.");
          return;
        }

        tf = await import("@tensorflow/tfjs");
        await import("@tensorflow/tfjs-react-native");
        FaceMesh = await import("@tensorflow-models/facemesh");
        cameraWithTensors = (await import("@tensorflow/tfjs-react-native")).cameraWithTensors;

        await tf.ready();
        const loadedModel = await FaceMesh.load({ maxFaces: 1, refineLandmarks: true });
        setModel(loadedModel);
        setIsTFReady(true);
        setStatusText("✅ Model loaded. Align your face.");
      } catch (err) {
        console.warn("TensorFlow load error:", err);
        setStatusText("⚠️ Error loading ML model. Running in fallback mode.");
      }
    };
    loadTF();
  }, []);

  // Request camera permissions
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  // If TensorFlow not ready, show fallback message
  if (!isTFReady || !model) {
    return (
      <View style={styles.container}>
        <CameraView style={StyleSheet.absoluteFill} facing="front" />
        <View style={styles.overlay}>
          <Text style={styles.text}>{statusText}</Text>
        </View>
      </View>
    );
  }

  // Initialize TensorCamera
  if (!TensorCamera && cameraWithTensors) {
    TensorCamera = cameraWithTensors(CameraView);
  }

  const handleCameraStream = (images) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (model && nextImageTensor) {
        try {
          const predictions = await model.estimateFaces({ input: nextImageTensor });

          if (predictions.length > 0) {
            const landmarks = predictions[0].scaledMesh;
            const metrics = computeMetrics(landmarks);

            onMetrics?.(metrics, landmarks);
            setStatusText(
              `👁 Tracking | Attention: ${(metrics?.attentionScore * 100 || 0).toFixed(0)}%`
            );
          } else {
            setStatusText("No face detected. Adjust lighting or distance.");
          }

          tf.dispose(nextImageTensor);
        } catch (err) {
          console.warn("Frame processing error:", err);
        }
      }
      requestAnimationFrame(loop);
    };
    loop();
  };

  return (
    <View style={styles.container}>
      <TensorCamera
        style={StyleSheet.absoluteFill}
        autorender={true}
        type="front"
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        onReady={handleCameraStream}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{statusText}</Text>
      </View>
    </View>
  );
}
