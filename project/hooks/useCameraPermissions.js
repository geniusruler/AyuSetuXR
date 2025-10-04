import { useCameraPermission } from 'react-native-vision-camera';
export function useCameraPermissions() {
  const [permission, requestPermission] = useCameraPermission();
  return { permission, requestPermission };
}
