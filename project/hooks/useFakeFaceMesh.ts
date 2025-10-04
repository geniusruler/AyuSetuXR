import { useEffect, useRef, useState } from "react";

export interface FaceLandmark {
  x: number;
  y: number;
  z: number;
}

export interface FaceMetrics {
  blinkLeft: boolean;
  blinkRight: boolean;
  gazeDirection: "center" | "left" | "right" | "up" | "down";
  attentionScore: number; // 0–1
  fatigueScore: number; // 0–1
}

export function useFakeFaceMesh(updateInterval = 200) {
  const [landmarks, setLandmarks] = useState<FaceLandmark[]>([]);
  const [metrics, setMetrics] = useState<FaceMetrics>({
    blinkLeft: false,
    blinkRight: false,
    gazeDirection: "center",
    attentionScore: 1,
    fatigueScore: 0,
  });

  const frameRef = useRef(0);

  useEffect(() => {
    const generateLandmarks = () => {
      const t = frameRef.current;
      const base = Array.from({ length: 468 }, (_, i) => ({
        x: 0.5 + 0.1 * Math.sin(i / 10 + t / 10),
        y: 0.5 + 0.1 * Math.cos(i / 10 + t / 15),
        z: 0.05 * Math.sin(i / 5 + t / 30),
      }));

      // Simular blink (cada 50 frames)
      const blinkLeft = t % 50 < 3;
      const blinkRight = (t + 25) % 60 < 3;

      // Simular mirada
      const dir =
        t % 200 < 50
          ? "center"
          : t % 200 < 100
          ? "left"
          : t % 200 < 150
          ? "right"
          : "center";

      // Simular atención (va decayendo y sube cuando hay blink)
      const attention = Math.max(
        0,
        1 - 0.002 * (t % 500) + (blinkLeft || blinkRight ? 0.05 : 0)
      );

      // Simular fatiga (aumenta con el tiempo)
      const fatigue = Math.min(1, 0.001 * t);

      setLandmarks(base);
      setMetrics({
        blinkLeft,
        blinkRight,
        gazeDirection: dir,
        attentionScore: Number(attention.toFixed(2)),
        fatigueScore: Number(fatigue.toFixed(2)),
      });

      frameRef.current += 1;
    };

    const interval = setInterval(generateLandmarks, updateInterval);
    return () => clearInterval(interval);
  }, [updateInterval]);

  return { landmarks, metrics };
}
