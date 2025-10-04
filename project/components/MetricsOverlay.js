import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MetricsOverlay({ metrics }) {
  if (!metrics) return null;
  return (
    <View style={styles.overlay}>
      <Text style={styles.text}>Pupil: {metrics.pupilSize.toFixed(3)}</Text>
      <Text style={styles.text}>Blink: {metrics.blinkDetected ? 'Yes' : 'No'}</Text>
      <Text style={styles.text}>Gaze: {metrics.gazeDirection}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: { position: 'absolute', bottom: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 12, borderRadius: 10 },
  text: { color: '#fff', fontSize: 16 },
});

const colorScale = (value) => {
  if (value < 0.3) return '#00ff00'; // green = focus
  if (value < 0.6) return '#ffff00'; // yellow = mid
  return '#ff0000'; // red = stress/fatigue
};
