import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { getThemedColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

interface GradientCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  delay?: number;
  glowColor?: string;
}

export default function GradientCard(props: GradientCardProps) {
  const { children, style, delay = 0, glowColor } = props;
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);
  const effectiveGlowColor = glowColor || colors.gradient.blue;
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSpring(1, {
        damping: 20,
        stiffness: 90,
      })
    );
    translateY.value = withDelay(
      delay,
      withSpring(0, {
        damping: 20,
        stiffness: 90,
      })
    );

    glowOpacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.5, { duration: 2000 }),
          withTiming(0.3, { duration: 2000 })
        ),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <Animated.View
        style={[
          styles.glowBorder,
          glowStyle,
          {
            shadowColor: effectiveGlowColor,
            borderColor: `${effectiveGlowColor}40`,
          }
        ]}
      />
      <View style={[styles.card, { backgroundColor: colors.background.card, ...Shadows.medium }] }>
        <LinearGradient
          colors={[`${effectiveGlowColor}08`, 'transparent']}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  glowBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 8,
  },
  card: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
