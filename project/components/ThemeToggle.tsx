import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemedColors, Typography, BorderRadius, Spacing, getShadows } from '@/constants/theme';

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();
  const colors = getThemedColors(isDark);
  const shadows = getShadows(isDark);

  const togglePosition = useSharedValue(isDark ? 0 : 1);
  const scale = useSharedValue(1);

  const handleToggle = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    togglePosition.value = withSpring(isDark ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });

    scale.value = withTiming(0.9, { duration: 100 }, () => {
      scale.value = withSpring(1, { damping: 10 });
    });

    toggleTheme();
  };

  const thumbStyle = useAnimatedStyle(() => {
    const translateX = togglePosition.value * 28;
    return {
      transform: [{ translateX }, { scale: scale.value }],
    };
  });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>Theme</Text>
      <Animated.View style={containerStyle}>
        <TouchableOpacity
          onPress={handleToggle}
          activeOpacity={0.8}
          style={[
            styles.container,
            {
              backgroundColor: isDark ? colors.background.card : colors.background.tertiary,
              borderColor: isDark ? `${colors.gradient.blue}30` : `${colors.gradient.violet}30`,
            },
            shadows.small,
          ]}
        >
          <View style={styles.iconContainer}>
            <Moon
              size={16}
              color={isDark ? colors.gradient.cyan : colors.text.muted}
              fill={isDark ? colors.gradient.cyan : 'transparent'}
            />
          </View>
          <View style={styles.iconContainer}>
            <Sun
              size={16}
              color={!isDark ? colors.gradient.violet : colors.text.muted}
              fill={!isDark ? colors.gradient.violet : 'transparent'}
            />
          </View>
          <Animated.View
            style={[
              styles.thumb,
              thumbStyle,
              {
                backgroundColor: isDark ? colors.gradient.blue : colors.gradient.violet,
                ...shadows.glow,
              },
            ]}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
  },
  container: {
    width: 64,
    height: 32,
    borderRadius: BorderRadius.round,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
    borderWidth: 1,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: BorderRadius.round,
    left: 4,
  },
});
