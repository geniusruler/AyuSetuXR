export function computeMetrics(landmarks) {
  if (!landmarks || landmarks.length < 478) return null;

  const leftIris = landmarks.slice(468, 473);
  const rightIris = landmarks.slice(473, 478);

  const irisSize = Math.hypot(
    leftIris[0].x - leftIris[2].x,
    leftIris[0].y - leftIris[2].y
  );

  return {
    pupilSize: irisSize,
    blinkDetected: checkBlink(landmarks),
    gazeDirection: estimateGaze(landmarks),
  };
}

function checkBlink(landmarks) {
  // example: difference between eyelid landmarks
  const top = landmarks[159].y;
  const bottom = landmarks[145].y;
  return bottom - top < 0.005; // threshold tweakable
}

function estimateGaze(landmarks) {
  const left = landmarks[33];
  const right = landmarks[263];
  const dx = right.x - left.x;
  return dx > 0.02 ? 'right' : dx < -0.02 ? 'left' : 'center';
}
