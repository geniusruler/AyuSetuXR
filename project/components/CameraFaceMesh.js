
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'expo-camera';
import { FaceMesh } from '@mediapipe/face_mesh';
import { useCameraPermissions } from '../hooks/useCameraPermissions';


export default function CameraFaceMesh({ onLandmarksDetected, width, height }) {
  // const devices = useCameraDevices();
  // const device = devices.front;
  const [type, setType] = React.useState(Camera.Constants.Type.front);
  const { permission, requestPermission } = useCameraPermissions();
  const faceMeshRef = useRef(null);

  useEffect(() => {
    if (permission?.status !== 'authorized') {
      requestPermission();
      return;
    }
    if (!faceMeshRef.current) {
      const faceMesh = new FaceMesh({
        locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
      });
      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      faceMesh.onResults((results) => {
        if (results.multiFaceLandmarks) {
          const landmarks = results.multiFaceLandmarks[0];
          onLandmarksDetected?.(landmarks);
        }
      });
      faceMeshRef.current = faceMesh;
    }
  }, [permission, requestPermission, onLandmarksDetected]);

  if (permission?.status === 'not-determined' || permission?.status === 'pending') {
    return (
      <View style={[styles.container, width && height ? { width, height } : null]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Solicitando permiso de cámara...</Text>
      </View>
    );
  }

  if (permission?.status !== 'authorized') {
    return (
      <View style={[styles.container, width && height ? { width, height } : null]}>
        <Text style={styles.text}>Permiso de cámara denegado. Actívalo en la configuración.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, width && height ? { width, height } : null]}>
      <Camera
        style={[StyleSheet.absoluteFill, width && height ? { width, height } : null]}
        type={type}
        ratio="16:9"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', textAlign: 'center', marginTop: 16 },
});
