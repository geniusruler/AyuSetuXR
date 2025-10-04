import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { X, Target } from 'lucide-react-native';
import CameraPlaceholder from '@/components/CameraPlaceholder';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { SCREEN_PADDING, SCREEN_WIDTH } from '@/constants/dimensions';

export default function CalibrationScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const pulseScale = useSharedValue(1);
  const dotOpacity1 = useSharedValue(0.3);
  const dotOpacity2 = useSharedValue(0.3);
  const dotOpacity3 = useSharedValue(0.3);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1.2, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    dotOpacity1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0.3, { duration: 500 })
      ),
      -1,
      false
    );

    setTimeout(() => {
      dotOpacity2.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0.3, { duration: 500 })
        ),
        -1,
        false
      );
    }, 333);

    setTimeout(() => {
      dotOpacity3.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0.3, { duration: 500 })
        ),
        -1,
        false
      );
    }, 666);

    const timer = setTimeout(() => {
      if (step < 3) {
        setStep(step + 1);
      } else {
        router.push('/session');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [step]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dotOpacity1.value,
  }));

  const dot2Style = useAnimatedStyle(() => ({
    opacity: dotOpacity2.value,
  }));

  const dot3Style = useAnimatedStyle(() => ({
    opacity: dotOpacity3.value,
  }));

  const handleSkip = () => {
    router.push('/session');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <X size={24} color={Colors.text.primary} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Calibration</Text>
        <Text style={styles.subtitle}>Step {step} of 3</Text>
      </View>

      <View style={styles.cameraContainer}>
        <CameraPlaceholder
          width={SCREEN_WIDTH - (SCREEN_PADDING * 2)}
          height={400}
        />
        <View style={styles.targetOverlay}>
          <Animated.View style={[styles.targetRing, pulseStyle]} />
          <Target size={32} color={Colors.gradient.blue} strokeWidth={2} />
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Look at the center and blink three times
        </Text>
        <View style={styles.progressDots}>
          <Animated.View style={[styles.dot, dot1Style, step >= 1 && styles.dotActive]} />
          <Animated.View style={[styles.dot, dot2Style, step >= 2 && styles.dotActive]} />
          <Animated.View style={[styles.dot, dot3Style, step >= 3 && styles.dotActive]} />
        </View>
      </View>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip Calibration</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 60,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: SCREEN_PADDING,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  cameraContainer: {
    position: 'relative',
    marginBottom: Spacing.xl,
  },
  targetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.gradient.blue,
  },
  instructions: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  instructionText: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.background.tertiary,
    marginHorizontal: Spacing.xs,
  },
  dotActive: {
    backgroundColor: Colors.gradient.blue,
  },
  skipButton: {
    alignSelf: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  skipText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
  },
});
