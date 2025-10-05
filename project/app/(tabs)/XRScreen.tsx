import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraFaceMesh from '@/components/CameraFaceMesh';
import MetricsOverlay from '@/components/MetricsOverlay';
import { computeMetrics } from '@/utils/computeMetrics';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';

export default function XRScreen() {
  const [metrics, setMetrics] = useState<any>(null);

  // 🔹 Handle new metrics/landmarks from the camera component
  // CameraFaceMesh calls the prop as onMetrics(metrics, landmarks)
  const handleCameraMetrics = useCallback((cameraMetrics: any, landmarks: any) => {
    // computeMetrics expects landmarks; fall back to cameraMetrics if landmarks missing
    const calculated = computeMetrics(landmarks || cameraMetrics);
    setMetrics(calculated);
  }, []);

  // 🔹 Send metrics to Cloudflare Worker (Gemini + ElevenLabs)
  const sendMetricsToAI = useCallback(async (metrics: any) => {
    if (!metrics) return;
    try {
      // ✅ FIXED: properly define the worker URL
      const workerUrl = Constants.expoConfig?.extra?.CLOUDFLARE_WORKER_URL;

      const res = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics }),
      });

      if (!res.ok) {
        console.error('Worker error:', await res.text());
        return;
      }

      // 🔹 Convert the MP3 stream into playable audio
      const arrayBuffer = await res.arrayBuffer();
      const base64String = Buffer.from(arrayBuffer).toString('base64');
      const { sound } = await Audio.Sound.createAsync(
        { uri: `data:audio/mp3;base64,${base64String}` },
        { shouldPlay: true }
      );
      await sound.playAsync();
    } catch (error) {
      console.error('AI feedback error:', error);
    }
  }, []);

  // 🔹 Periodically send metrics for analysis
  useEffect(() => {
    if (!metrics) return;
    const interval = setInterval(() => {
      sendMetricsToAI(metrics);
    }, 10000); // every 10 seconds
    return () => clearInterval(interval);
  }, [metrics, sendMetricsToAI]);

  return (
    <View style={styles.container}>
  <CameraFaceMesh onMetrics={handleCameraMetrics} />
      <MetricsOverlay metrics={metrics} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
});
