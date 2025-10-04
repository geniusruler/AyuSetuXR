import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Play } from 'lucide-react-native';
import CustomButton from '@/components/CustomButton';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { SCREEN_PADDING } from '@/constants/dimensions';

export default function StartScreen() {
  const router = useRouter();

  const handleStartSession = () => {
    router.push('/calibration');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Play size={64} color={Colors.gradient.blue} strokeWidth={2} />
        </View>
        <Text style={styles.title}>Ready to Begin?</Text>
        <Text style={styles.description}>
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
    backgroundColor: Colors.background.primary,
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
    backgroundColor: Colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  button: {
    width: '100%',
  },
});
