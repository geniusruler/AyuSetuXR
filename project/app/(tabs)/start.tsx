import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Play } from 'lucide-react-native';
import CustomButton from '@/components/CustomButton';
import { getThemedColors, Typography, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_PADDING } from '@/constants/dimensions';

export default function StartScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);

  const handleStartSession = () => {
    router.push('/calibration');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }] }>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.background.card }] }>
          <Play size={64} color={colors.gradient.blue} strokeWidth={2} />
        </View>
        <Text style={[styles.title, { color: colors.text.primary }]}>Ready to Begin?</Text>
        <Text style={[styles.description, { color: colors.text.secondary }] }>
          Start a new XR neurofeedback session to track your attention and improve focus.
        </Text>
        <CustomButton
          title="Start New Session"
          onPress={handleStartSession}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  button: {
    width: '100%',
  },
});
