import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import CameraFaceMesh from "@/components/CameraFaceMesh";
import MetricsOverlay from "@/components/MetricsOverlay";
import { Audio } from "expo-av";
import Constants from "expo-constants";
import { Buffer } from "buffer";

// Polyfill Buffer for React Native (needed for base64 from ArrayBuffer)
if (!(global as any).Buffer) {
  (global as any).Buffer = Buffer;
}

export default function XRScreen() {
  const [metrics, setMetrics] = useState<any>(null);
  const [aiMessage, setAiMessage] = useState<string>("");

  // keep only one audio playing at a time
  const soundRef = useRef<Audio.Sound | null>(null);

  // Resolve worker URL from config (supports dev + prod)
  const workerUrl =
    (Constants as any)?.expoConfig?.extra?.CLOUDFLARE_WORKER_URL ??
    (Constants as any)?.manifest?.extra?.CLOUDFLARE_WORKER_URL;

  // Receive metrics from the camera and update state
  const handleCameraMetrics = useCallback((m: any /*, landmarks: any */) => {
    if (!m) return;
    setMetrics(m);
  }, []);

  // Send metrics to Cloudflare Worker (Gemini -> ElevenLabs) and play audio
  const sendMetricsToAI = useCallback(
    async (m: any) => {
      if (!m || !workerUrl) {
        if (!workerUrl) console.warn("⚠️ CLOUDFLARE_WORKER_URL missing in app config.");
        return;
      }

      try {
        const summary = `
          Attention: ${(m.attentionScore * 100).toFixed(0)}%,
          Fatigue: ${(m.fatigueScore * 100).toFixed(0)}%,
          Stability: ${(m.stabilityIndex * 100).toFixed(0)}%,
          Direction: ${String(m.gazeDirection || "").toUpperCase()},
          CCI: ${m.compositeCognitiveIndex ? (m.compositeCognitiveIndex * 100).toFixed(0) + "%" : "n/a"}
        `;

        // device locale → language (e.g., "en", "es", "hi")
        const userLang =
          (Intl?.DateTimeFormat?.().resolvedOptions().locale.split("-")[0] as string) || "en";

        const res = await fetch(workerUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            summary,          // what Gemini will reason about
            language: userLang,
            metrics: m,       // raw metrics too (optional, for richer prompts)
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("❌ Worker error:", errText);
          setAiMessage("AI service unavailable.");
          return;
        }

        // Streamed MP3 → base64 → play
        const arrayBuffer = await res.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");

        // stop/unload any previous sound
        if (soundRef.current) {
          try {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
          } catch {}
          soundRef.current = null;
        }

        const { sound } = await Audio.Sound.createAsync(
          { uri: `data:audio/mpeg;base64,${base64String}` },
          { shouldPlay: true }
        );
        soundRef.current = sound;
        setAiMessage("🔊 Live feedback playing...");
      } catch (error) {
        console.error("AI feedback error:", error);
        setAiMessage("AI feedback error.");
      }
    },
    [workerUrl]
  );

  // Send metrics every 10s
  useEffect(() => {
    if (!metrics) return;
    const id = setInterval(() => {
      sendMetricsToAI(metrics);
    }, 10000);
    return () => clearInterval(id);
  }, [metrics, sendMetricsToAI]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <CameraFaceMesh onMetrics={handleCameraMetrics} />
      <MetricsOverlay metrics={metrics} />
      {aiMessage ? <Text style={styles.aiMessage}>🧠 {aiMessage}</Text> : null}
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
