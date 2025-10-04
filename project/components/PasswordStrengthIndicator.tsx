import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';

interface PasswordStrengthIndicatorProps {
  strength: 'weak' | 'medium' | 'strong';
  score: number;
  visible?: boolean;
}

export default function PasswordStrengthIndicator({
  strength,
  score,
  visible = true,
}: PasswordStrengthIndicatorProps) {
  const opacity = useSharedValue(0);
  const barWidth = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      barWidth.value = withSpring(score * 100, {
        damping: 15,
        stiffness: 100,
      });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      barWidth.value = withTiming(0, { duration: 150 });
    }
  }, [visible, score]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const barAnimatedStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value}%`,
  }));

  const getColor = () => {
    switch (strength) {
      case 'weak':
        return Colors.gradient.red;
      case 'medium':
        return Colors.gradient.orange;
      case 'strong':
        return Colors.gradient.green;
      default:
        return Colors.gradient.red;
    }
  };

  const getLabel = () => {
    switch (strength) {
      case 'weak':
        return 'Weak password';
      case 'medium':
        return 'Medium strength';
      case 'strong':
        return 'Strong password';
      default:
        return '';
    }
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <View style={styles.barBackground}>
        <Animated.View
          style={[
            styles.barFill,
            barAnimatedStyle,
            { backgroundColor: getColor() },
          ]}
        />
      </View>
      <Text style={[styles.label, { color: getColor() }]}>{getLabel()}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.xs,
  },
  barBackground: {
    height: 4,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: BorderRadius.sm,
  },
  label: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.medium,
    marginTop: Spacing.xs,
  },
});
