import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Camera } from 'lucide-react-native';
import { Colors, Typography, BorderRadius, Spacing } from '@/constants/theme';

interface CameraPlaceholderProps {
  width: number;
  height: number;
  style?: ViewStyle;
  text?: string;
}

export default function CameraPlaceholder({
  width,
  height,
  style,
  text = 'Camera view',
}: CameraPlaceholderProps) {
  return (
    <View style={[styles.container, { width, height }, style]}>
      <Camera size={48} color={Colors.text.tertiary} strokeWidth={1.5} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderStyle: 'dashed',
  },
  text: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.tertiary,
    marginTop: Spacing.sm,
  },
});
