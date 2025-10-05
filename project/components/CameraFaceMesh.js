import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as FaceMesh from "@tensorflow-models/facemesh";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { computeMetrics } from "@/utils/computeMetrics";

const TensorCamera = cameraWithTensors(CameraView);

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

  // Load TensorFlow + FaceMesh
  useEffect(() => {
    const load = async () => {
      await tf.ready();
      const loadedModel = await FaceMesh.load({
        maxFaces: 1,
        refineLandmarks: true,
      });
      setModel(loadedModel);
      setStatusText("Model ready! Align your face.");
    };
    load();
  }, []);

  if (!permission?.granted) {
    requestPermission();
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  const handleCameraStream = (images, updateCameraPreview) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (model && nextImageTensor) {
        const predictions = await model.estimateFaces({
          input: nextImageTensor,
        });

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
