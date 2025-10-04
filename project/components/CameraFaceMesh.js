import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFakeFaceMesh } from "../hooks/useFakeFaceMesh";


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: "#fff", fontSize: 16, textAlign: "center" },
  overlay: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default function CameraFaceMesh({ onMetrics }) {
  const [facing] = React.useState("front");
  const [permission, requestPermission] = useCameraPermissions();
  const { landmarks, metrics } = useFakeFaceMesh(150); // actualiza cada 150ms (~6.6fps)

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  useEffect(() => {
    onMetrics?.(metrics, landmarks);
  }, [metrics, landmarks]);

  if (!permission?.granted)
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Solicitando permiso de cámara...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <CameraView style={StyleSheet.absoluteFill} facing={facing} />
      <View style={styles.overlay}>
        <Text style={styles.text}>
          👁 {metrics.gazeDirection.toUpperCase()} | 👀{" "}
          {metrics.blinkLeft || metrics.blinkRight ? "BLINK" : "OPEN"}
        </Text>
        <Text style={styles.text}>
          ⚡ Atención: {(metrics.attentionScore * 100).toFixed(0)}%
        </Text>
        <Text style={styles.text}>
          😴 Fatiga: {(metrics.fatigueScore * 100).toFixed(0)}%
        </Text>
      </View>
    </View>
  );
}
