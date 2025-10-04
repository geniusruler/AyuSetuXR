import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import CameraFaceMesh from './CameraFaceMesh';
import MetricsOverlay from './MetricsOverlay';
import { computeMetrics } from '../utils/computeMetrics';

export default function XRScreen() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    // Later you’ll pass real landmarks from CameraFaceMesh via props or context
    // setMetrics(computeMetrics(landmarks));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CameraFaceMesh />
      <MetricsOverlay metrics={metrics} />
    </View>
  );
}
