// computeMetrics.js
// Converts Mediapipe landmarks → cognitive & visual focus metrics in real time

export function computeMetrics(landmarks) {
  if (!landmarks || landmarks.length < 478) return null;

  // ---- 1️⃣ IRIS & BLINK ANALYSIS ----
  const leftEyeTop = landmarks[159].y;
  const leftEyeBottom = landmarks[145].y;
  const rightEyeTop = landmarks[386].y;
  const rightEyeBottom = landmarks[374].y;

  const leftBlink = Math.abs(leftEyeTop - leftEyeBottom);
  const rightBlink = Math.abs(rightEyeTop - rightEyeBottom);

  // Blink detection threshold — lower means tighter eyelid gap (blink)
  const blinkDetected = leftBlink < 0.005 || rightBlink < 0.005;

  // ---- 2️⃣ IRIS SIZE (fatigue proxy) ----
  const leftIris = landmarks.slice(468, 473);
  const rightIris = landmarks.slice(473, 478);

  const irisSize = Math.hypot(
    leftIris[0].x - leftIris[2].x,
    leftIris[0].y - leftIris[2].y
  );

  // ---- 3️⃣ GAZE DIRECTION ----
  const left = landmarks[33];
  const right = landmarks[263];
  const dx = right.x - left.x;
  const gazeDirection =
    dx > 0.02 ? "right" : dx < -0.02 ? "left" : "center";

  // ---- 4️⃣ ATTENTION SCORE ----
  // Attention is higher if gaze is centered and no blinks are detected frequently.
  const attentionScore = Math.max(
    0,
    Math.min(1, 1 - Math.abs(dx) * 5 - (blinkDetected ? 0.3 : 0))
  );

  // ---- 5️⃣ FATIGUE SCORE ----
  // Fatigue correlates with blink frequency and small iris size.
  const fatigueScore = Math.max(
    0,
    Math.min(1, (blinkDetected ? 0.6 : 0) + (irisSize < 0.004 ? 0.4 : 0))
  );

  // ---- 6️⃣ STABILITY (focus consistency over time) ----
  // Optional: You can integrate this over time later in XRScreen
  const stabilityIndex = 1 - Math.abs(dx) * 4;

  return {
    gazeDirection,
    blinkDetected,
    irisSize,
    attentionScore,
    fatigueScore,
    stabilityIndex,
  };
}
