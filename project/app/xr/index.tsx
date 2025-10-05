import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import CameraFaceMesh from "@/components/CameraFaceMesh";
import MetricsOverlay from "@/components/MetricsOverlay";
import { Audio } from "expo-av";
import Constants from "expo-constants";

export default function XRScreen() {
  const [metrics, setMetrics] = useState<any>(null);
  const [aiMessage, setAiMessage] = useState<string>("");

  // 🔹 Receive metrics from the camera and update state
  const handleCameraMetrics = useCallback((metrics: any, landmarks: any) => {
    if (!metrics) return;
    setMetrics(metrics);
  }, []);

  // 🔹 Send metrics to Cloudflare Worker for Gemini + ElevenLabs
  const sendMetricsToAI = useCallback(async (metrics: any) => {
    if (!metrics) return;
    try {
      const workerUrl = Constants.expoConfig?.extra?.CLOUDFLARE_WORKER_URL;
      if (!workerUrl) {
        console.warn("⚠️ CLOUDFLARE_WORKER_URL not found in app config");
        return;
      }

      const res = await fetch(workerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics }),
      });

      if (!res.ok) {
        console.error("❌ Worker error:", await res.text());
        return;
      }

      // 🔹 Convert audio response to Base64 playable stream
      const arrayBuffer = await res.arrayBuffer();
      const base64String = Buffer.from(arrayBuffer).toString("base64");

      const { sound } = await Audio.Sound.createAsync(
        { uri: `data:audio/mp3;base64,${base64String}` },
        { shouldPlay: true }
      );

      await sound.playAsync();
    } catch (error) {
      console.error("AI feedback error:", error);
    }
  }, []);

  // 🔹 Send metrics every 10 seconds to AI
  useEffect(() => {
    if (!metrics) return;
    const interval = setInterval(() => {
      sendMetricsToAI(metrics);
    }, 10000);
    return () => clearInterval(interval);
  }, [metrics, sendMetricsToAI]);

  return (
    <View style={styles.container}>
      <CameraFaceMesh onMetrics={handleCameraMetrics} />
      <MetricsOverlay metrics={metrics} />
      {aiMessage ? (
        <Text style={styles.aiMessage}>🧠 {aiMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  aiMessage: {
    color: "#0ff",
    position: "absolute",
    bottom: 40,
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});
