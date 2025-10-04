import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { FaceMesh } from '@mediapipe/face_mesh';

export default function CameraFaceMesh() {
  const devices = useCameraDevices();
  const device = devices.front;
  const [landmarks, setLandmarks] = useState([]);

  useEffect(() => {
    const init = async () => {
      await Camera.requestCameraPermission();
      const faceMesh = new FaceMesh({
        locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
      });
      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      faceMesh.onResults((r) => {
        if (r.multiFaceLandmarks) setLandmarks(r.multiFaceLandmarks[0]);
      });
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      {device && <Camera style={StyleSheet.absoluteFill} device={device} isActive />}
      <View style={styles.overlay}>
        <Text style={styles.text}>Landmarks: {landmarks.length}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  overlay: { position: 'absolute', top: 40, left: 20, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10, borderRadius: 8 },
  text: { color: '#fff' },
});
