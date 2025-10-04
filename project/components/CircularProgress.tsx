import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { Colors, Typography } from '@/constants/theme';

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  percentage: number;
  label?: string;
  gradientColors?: string[];
  delay?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(Text);

export default function CircularProgress({
  size,
  strokeWidth,
  percentage,
  label,
  gradientColors = [Colors.gradient.blue, Colors.gradient.green, Colors.gradient.orange],
  delay = 0,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const animatedPercentage = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    animatedPercentage.value = withDelay(
      delay,
      withTiming(percentage, {
        duration: 1500,
        easing: Easing.out(Easing.cubic),
      })
    );

    scale.value = withDelay(
      delay,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.5)),
      })
    );

    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 400,
      })
    );

    glowOpacity.value = withDelay(
      delay + 200,
      withTiming(0.8, {
        duration: 800,
      })
    );
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (animatedPercentage.value / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  const displayValue = useDerivedValue(() => {
    return Math.round(animatedPercentage.value);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, { width: size, height: size }, animatedStyle]}>
      <Animated.View
        style={[
          styles.glowContainer,
          { width: size, height: size, borderRadius: size / 2 },
          glowStyle
        ]}
      />
      <Svg width={size} height={size}>
        <Defs>
          <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            {gradientColors.map((color, index) => (
              <Stop
                key={index}
                offset={`${(index / (gradientColors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </SvgLinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.background.secondary}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          animatedProps={animatedProps}
        />
      </Svg>
      <Animated.View style={[styles.textContainer, textStyle]}>
        <Text style={styles.percentage}>
          {Math.round(percentage)}
        </Text>
        {label && <Text style={styles.label}>{label}</Text>}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  glowContainer: {
    position: 'absolute',
    shadowColor: Colors.gradient.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  percentage: {
    fontSize: Typography.fontSize.display,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    textShadowColor: Colors.gradient.cyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
    marginTop: 4,
  },
});
