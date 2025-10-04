import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Typography, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { BUTTON_HEIGHT } from '@/constants/dimensions';

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled = false
}: CustomButtonProps) {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.6);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, {
      damping: 15,
      stiffness: 300,
    });
    glowOpacity.value = withTiming(1, { duration: 150 });
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
    glowOpacity.value = withTiming(0.6, { duration: 150 });
  };

  const handlePress = () => {
    if (onPress) {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      onPress();
    }
  };

  if (variant === 'primary') {
    return (
      <Animated.View style={[styles.glowContainer, glowStyle]}>
        <AnimatedTouchable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          activeOpacity={0.8}
          style={[styles.button, styles.primaryButton, animatedStyle, style]}
        >
          <LinearGradient
            colors={[Colors.gradient.blue, Colors.gradient.cyan]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={[styles.text, styles.primaryText, textStyle]}>{title}</Text>
          </LinearGradient>
        </AnimatedTouchable>
      </Animated.View>
    );
  }

  if (variant === 'secondary') {
    return (
      <AnimatedTouchable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.8}
        style={[styles.button, styles.secondaryButton, animatedStyle, style]}
      >
        <Text style={[styles.text, styles.secondaryText, textStyle]}>{title}</Text>
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.button, styles.outlineButton, animatedStyle, style]}
    >
      <Text style={[styles.text, styles.outlineText, textStyle]}>{title}</Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  glowContainer: {
    ...Shadows.glow,
    borderRadius: BorderRadius.lg,
  },
  button: {
    height: BUTTON_HEIGHT,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  primaryButton: {
    borderWidth: 1,
    borderColor: `${Colors.gradient.cyan}40`,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  secondaryButton: {
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: `${Colors.gradient.blue}30`,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.gradient.blue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  text: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
  },
  primaryText: {
    color: Colors.text.primary,
    textShadowColor: Colors.gradient.cyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  secondaryText: {
    color: Colors.text.primary,
  },
  outlineText: {
    color: Colors.gradient.blue,
  },
});
