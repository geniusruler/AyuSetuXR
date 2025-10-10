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
  const videoRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [statusText, setStatusText] = useState("🧠 Initializing face tracking...");
  const [isReady, setIsReady] = useState(false);
  const [webModel, setWebModel] = useState(null);

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

  // 2️⃣ Load TensorFlow.js Model for Web (with CDN fix)
  useEffect(() => {
    if (Platform.OS === "web") {
      const loadTF = async () => {
        setStatusText("🔄 Loading TensorFlow.js model...");
        try {
          const tf = await import("@tensorflow/tfjs");
          const faceLandmarksDetection = await import("@tensorflow-models/face-landmarks-detection");
          await tf.ready();

          // ✅ Explicitly set CDN for MediaPipe files (fixes your error)
          const model = await faceLandmarksDetection.load(
            faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
            {
              runtime: "mediapipe",
              solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh", // critical line
            }
          );

          setWebModel(model);
          setStatusText("✅ TensorFlow.js model ready — starting camera...");
        } catch (err) {
          console.error("TF.js load error:", err);
          setStatusText("❌ Failed to load TensorFlow.js model");
        }
      };
      loadTF();
    }
  }, []);

  // 3️⃣ Handle Face Detection (Native)
  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      const face = faces[0];
      const metrics = computeMetrics(face);
      onMetrics?.(metrics, face);
      setStatusText(`👁 Face detected (yaw: ${face.yawAngle?.toFixed(1)}°)`);
    } else {
      setStatusText("😶 No face detected — adjust lighting or distance.");
    }
  };

  // 4️⃣ Camera Ready (Native)
  const handleCameraReady = () => setIsReady(true);

  // 5️⃣ Web Face Tracking (TensorFlow.js)
  useEffect(() => {
    if (Platform.OS !== "web" || !webModel) return;

    let animationFrame;
    const video = videoRef.current;

    const detectFace = async () => {
      if (video && video.readyState === 4 && webModel) {
        try {
          const faces = await webModel.estimateFaces({ input: video });
          if (faces.length > 0) {
            const landmarks = faces[0].keypoints;
            const metrics = computeMetrics({ landmarks });
            onMetrics?.(metrics, landmarks);
            setStatusText(`👁 Web face detected (${landmarks.length} points)`);
          } else {
            setStatusText("😶 No face detected (web)");
          }
        } catch (err) {
          console.error("Web detection error:", err);
          setStatusText("⚠️ Detection error");
        }
      }
      animationFrame = requestAnimationFrame(detectFace);
    };

    detectFace();
    return () => cancelAnimationFrame(animationFrame);
  }, [webModel]);

  // 6️⃣ Permission UI
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

  // 7️⃣ Render Camera (Native) or Video (Web)
  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width="100%"
          height="100%"
          style={{ objectFit: "cover", transform: "scaleX(-1)" }}
          onCanPlay={() => setStatusText("📷 Web camera ready")}
          onLoadedMetadata={async () => {
            if (navigator.mediaDevices && !videoRef.current.srcObject) {
              try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
              } catch (err) {
                console.error("Web camera error:", err);
                setStatusText("❌ Could not access webcam");
              }
            }
          }}
        />
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
