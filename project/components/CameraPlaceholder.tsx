import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera } from 'lucide-react-native';
import { Colors } from '@/constants/theme';

const CameraPlaceholder: React.FC = () => {
  return (
    <View style={styles.container}>
      <Camera size={48} color={Colors.text.tertiary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});

export default CameraPlaceholder;