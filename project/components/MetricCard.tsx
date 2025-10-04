import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Typography, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { METRIC_CARD_HEIGHT } from '@/constants/dimensions';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  gradientColors?: string[];
  style?: ViewStyle;
  showGradientBar?: boolean;
  percentage?: number;
  delay?: number;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function MetricCard({
  title,
  value,
  unit,
  icon,
  gradientColors = [Colors.gradient.blue, Colors.gradient.cyan],
  style,
  showGradientBar = false,
  percentage,
  delay = 0,
}: MetricCardProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const barWidth = useSharedValue(0);
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSpring(1, {
        damping: 20,
        stiffness: 90,
      })
    );
    scale.value = withDelay(
      delay,
      withSpring(1, {
        damping: 15,
        stiffness: 100,
      })
    );
    if (showGradientBar && percentage !== undefined) {
      barWidth.value = withDelay(
        delay + 200,
        withTiming(percentage, {
          duration: 1200,
        })
      );
    }

    glowOpacity.value = withDelay(
      delay,
      withTiming(0.6, { duration: 1000 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const barStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value}%`,
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
            shadowColor: gradientColors[0],
            borderColor: `${gradientColors[0]}30`,
          }
        ]}
      />
      <View style={styles.card}>
        <LinearGradient
          colors={[`${gradientColors[0]}10`, 'transparent']}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={[styles.value, { color: gradientColors[0] }]}>{value}</Text>
            {unit && <Text style={styles.unit}>{unit}</Text>}
          </View>
          {showGradientBar && gradientColors && gradientColors.length >= 2 && percentage !== undefined && (
            <View style={styles.barContainer}>
              <View style={styles.barBackground}>
                <AnimatedLinearGradient
                  colors={gradientColors as [string, string, ...string[]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.barFill, barStyle]}
                />
              </View>
            </View>
          )}
        </View>
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
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 6,
  },
  card: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.xl,
    minHeight: METRIC_CARD_HEIGHT,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    marginRight: Spacing.xs,
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: Typography.fontFamily.bold,
    textShadowColor: 'rgba(0, 180, 216, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  unit: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  barContainer: {
    marginTop: Spacing.md,
  },
  barBackground: {
    height: 8,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
  },
});
