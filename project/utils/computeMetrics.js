// computeMetrics.js
// Converts Mediapipe landmarks → cognitive, visual & neurological focus metrics

let blinkHistory = [];
let attentionHistory = [];

export function computeMetrics(landmarks) {
  if (!landmarks || landmarks.length < 478) return null;

  // ---- 1️⃣ EYE BLINK + EYELID GAP ----
  const leftEyeTop = landmarks[159].y;
  const leftEyeBottom = landmarks[145].y;
  const rightEyeTop = landmarks[386].y;
  const rightEyeBottom = landmarks[374].y;

  const leftGap = Math.abs(leftEyeTop - leftEyeBottom);
  const rightGap = Math.abs(rightEyeTop - rightEyeBottom);
  const avgGap = (leftGap + rightGap) / 2;
  const blinkDetected = avgGap < 0.0045; // tuned threshold

  // ---- 2️⃣ IRIS & PUPIL DILATION (fatigue & stress proxy) ----
  const leftIris = landmarks.slice(468, 473);
  const rightIris = landmarks.slice(473, 478);
  const irisDistance = Math.hypot(
    leftIris[0].x - leftIris[2].x,
    leftIris[0].y - leftIris[2].y
  );

  // Normalize iris size: smaller = fatigue / cognitive load
  const pupilDilation = Math.min(1, Math.max(0, (irisDistance - 0.0035) * 400));

  // ---- 3️⃣ GAZE DIRECTION + STABILITY ----
  const left = landmarks[33];
  const right = landmarks[263];
  const dx = right.x - left.x;
  const gazeDirection =
    dx > 0.025 ? "right" : dx < -0.025 ? "left" : "center";

  const gazeStability = 1 - Math.min(1, Math.abs(dx) * 5); // stable if centered

  // ---- 4️⃣ FACIAL SYMMETRY INDEX ----
  // Approx symmetry between left and right cheek / jaw landmarks
  const leftCheek = landmarks[234];
  const rightCheek = landmarks[454];
  const symmetryDiff = Math.abs(leftCheek.y - rightCheek.y);
  const symmetryIndex = Math.max(0, 1 - symmetryDiff * 20);

  // ---- 5️⃣ ATTENTION + FATIGUE MODEL ----
  const attentionScore = Math.max(
    0,
    Math.min(1, (gazeStability * 0.6 + pupilDilation * 0.4) - (blinkDetected ? 0.2 : 0))
  );

  const fatigueScore = Math.max(
    0,
    Math.min(1, (blinkDetected ? 0.5 : 0) + (1 - pupilDilation) * 0.4)
  );

  // Smooth metrics across short time windows
  blinkHistory.push(blinkDetected ? 1 : 0);
  attentionHistory.push(attentionScore);

  if (blinkHistory.length > 30) blinkHistory.shift();
  if (attentionHistory.length > 30) attentionHistory.shift();

  const avgBlinkFreq =
    blinkHistory.reduce((a, b) => a + b, 0) / blinkHistory.length;
  const focusConsistency =
    attentionHistory.reduce((a, b) => a + b, 0) / attentionHistory.length;

  
  const compositeCognitiveIndex = (attentionScore * 0.6 + stabilityIndex * 0.3 + (1 - fatigueScore) * 0.1);

  return {
    gazeDirection,
    blinkDetected,
    pupilDilation,
    gazeStability,
    symmetryIndex,
    attentionScore,
    fatigueScore,
    focusConsistency,
    compositeCognitiveIndex,
  };
}
