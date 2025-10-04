import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Colors } from '@/constants/theme';
import { BRAIN_ILLUSTRATION_SIZE } from '@/constants/dimensions';

interface BrainIllustrationProps {
  size?: number;
  animated?: boolean;
}

export default function BrainIllustration({
  size = BRAIN_ILLUSTRATION_SIZE,
  animated = true,
}: BrainIllustrationProps) {
  const pulseScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);
  const rotation = useSharedValue(0);
  const nodeOpacity1 = useSharedValue(0.6);
  const nodeOpacity2 = useSharedValue(0.6);
  const nodeOpacity3 = useSharedValue(0.6);

  useEffect(() => {
    if (animated) {
      pulseScale.value = withRepeat(
        withTiming(1.08, {
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );

      glowOpacity.value = withRepeat(
        withTiming(0.8, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );

      rotation.value = withRepeat(
        withTiming(5, {
          duration: 6000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );

      nodeOpacity1.value = withRepeat(
        withTiming(1, {
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );

      setTimeout(() => {
        nodeOpacity2.value = withRepeat(
          withTiming(1, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true
        );
      }, 400);

      setTimeout(() => {
        nodeOpacity3.value = withRepeat(
          withTiming(1, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true
        );
      }, 800);
    }
  }, [animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: pulseScale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const node1Style = useAnimatedStyle(() => ({
    opacity: nodeOpacity1.value,
  }));

  const node2Style = useAnimatedStyle(() => ({
    opacity: nodeOpacity2.value,
  }));

  const node3Style = useAnimatedStyle(() => ({
    opacity: nodeOpacity3.value,
  }));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[styles.glowContainer, glowStyle]}>
        {[...Array(3)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.glow,
              {
                width: size * (0.8 + i * 0.15),
                height: size * (0.8 + i * 0.15),
                opacity: 0.2 - i * 0.05,
              },
            ]}
          />
        ))}
      </Animated.View>
      <Animated.View style={animatedStyle}>
        <Svg width={size} height={size} viewBox="0 0 200 200">
          <Defs>
            <RadialGradient id="brainGrad" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={Colors.gradient.cyan} stopOpacity="0.8" />
              <Stop offset="50%" stopColor={Colors.gradient.blue} stopOpacity="0.6" />
              <Stop offset="100%" stopColor={Colors.gradient.blue} stopOpacity="0.3" />
            </RadialGradient>
          </Defs>

          <Path
            d="M100 30 C110 28 120 30 130 35 C140 40 145 48 148 58 C150 63 150 68 148 73 C146 78 142 82 138 85"
            stroke={Colors.gradient.blue}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />

          <Path
            d="M100 30 C90 28 80 30 70 35 C60 40 55 48 52 58 C50 63 50 68 52 73 C54 78 58 82 62 85"
            stroke={Colors.gradient.cyan}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />

          <Path
            d="M65 90 Q60 100 60 110 Q60 130 70 145 Q80 160 95 168"
            stroke={Colors.gradient.green}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />

          <Path
            d="M135 90 Q140 100 140 110 Q140 130 130 145 Q120 160 105 168"
            stroke={Colors.gradient.teal}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />

          <Path
            d="M100 170 Q90 165 82 158 Q70 148 65 135"
            stroke={Colors.gradient.orange}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />

          <Path
            d="M100 170 Q110 165 118 158 Q130 148 135 135"
            stroke={Colors.gradient.yellow}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />

          <Circle cx="75" cy="70" r="4" fill={Colors.gradient.blue} opacity="0.9" />
          <Circle cx="125" cy="70" r="4" fill={Colors.gradient.cyan} opacity="0.9" />
          <Circle cx="100" cy="50" r="3" fill={Colors.gradient.green} opacity="0.8" />
          <Circle cx="85" cy="100" r="3" fill={Colors.gradient.teal} opacity="0.8" />
          <Circle cx="115" cy="100" r="3" fill={Colors.gradient.orange} opacity="0.8" />
          <Circle cx="100" cy="130" r="4" fill={Colors.gradient.yellow} opacity="0.9" />

          <Path
            d="M75 70 L85 100 L100 130"
            stroke={Colors.gradient.blue}
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
            strokeDasharray="3,3"
          />

          <Path
            d="M125 70 L115 100 L100 130"
            stroke={Colors.gradient.cyan}
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
            strokeDasharray="3,3"
          />

          <Path
            d="M100 50 L85 100"
            stroke={Colors.gradient.green}
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
            strokeDasharray="3,3"
          />

          <Path
            d="M100 50 L115 100"
            stroke={Colors.gradient.teal}
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
            strokeDasharray="3,3"
          />

          <Circle cx="100" cy="100" r="45" fill="url(#brainGrad)" opacity="0.15" />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: Colors.gradient.blue,
  },
});
