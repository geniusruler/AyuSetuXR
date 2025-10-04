import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { X, Eye, Zap, Timer } from 'lucide-react-native';
import CameraPlaceholder from '@/components/CameraPlaceholder';
import BrainIllustration from '@/components/BrainIllustration';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { SCREEN_WIDTH, SCREEN_HEIGHT, HUD_HEIGHT } from '@/constants/dimensions';

export default function SessionScreen() {
  const router = useRouter();
  const [sessionTime, setSessionTime] = useState(0);
  const [attentionScore, setAttentionScore] = useState(75);
  const [reactionTime, setReactionTime] = useState(285);
  const [blinkRate, setBlinkRate] = useState(18);
  const [feedback, setFeedback] = useState('Stay focused');

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
      setAttentionScore(Math.min(100, Math.max(0, attentionScore + (Math.random() - 0.5) * 3)));
      setReactionTime(Math.floor(250 + Math.random() * 100));
      setBlinkRate(Math.floor(15 + Math.random() * 8));

      const feedbackMessages = [
        'Stay focused',
        'Great concentration',
        'Keep it up',
        'Excellent focus',
        'Maintain attention',
      ];
      if (Math.random() > 0.7) {
        setFeedback(feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]);
      }
    }, 2000);

    const sessionTimer = setTimeout(() => {
      router.push('/results');
    }, 15000);

    return () => {
      clearInterval(timer);
      clearTimeout(sessionTimer);
    };
  }, []);

  const handleEndSession = () => {
    router.push('/results');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return Colors.gradient.green;
    if (score >= 60) return Colors.gradient.blue;
    if (score >= 40) return Colors.gradient.orange;
    return Colors.gradient.red;
  };

  return (
    <View style={styles.container}>
      <CameraPlaceholder
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        style={styles.cameraBackground}
        text=""
      />

      <View style={styles.overlay}>
        <TouchableOpacity style={styles.closeButton} onPress={handleEndSession}>
          <X size={24} color={Colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.timerContainer}>
          <Timer size={16} color={Colors.text.primary} />
          <Text style={styles.timerText}>{formatTime(sessionTime)}</Text>
        </View>

        <View style={styles.brainContainer}>
          <BrainIllustration size={280} animated />
        </View>

        <View style={styles.hudContainer}>
          <BlurView intensity={40} tint="dark" style={styles.hudBlur}>
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackText}>{feedback}</Text>
            </View>
            <View style={styles.metricsContainer}>
              <View style={styles.metric}>
                <Zap size={20} color={getScoreColor(attentionScore)} />
                <View style={styles.metricContent}>
                  <Text style={styles.metricLabel}>Attention</Text>
                  <Text style={[styles.metricValue, { color: getScoreColor(attentionScore) }]}>
                    {Math.round(attentionScore)}
                  </Text>
                </View>
                <View style={styles.metricBar}>
                  <View
                    style={[
                      styles.metricBarFill,
                      {
                        width: `${attentionScore}%`,
                        backgroundColor: getScoreColor(attentionScore),
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metric}>
                <Timer size={20} color={Colors.gradient.cyan} />
                <View style={styles.metricContent}>
                  <Text style={styles.metricLabel}>Reaction</Text>
                  <Text style={styles.metricValue}>{reactionTime}ms</Text>
                </View>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metric}>
                <Eye size={20} color={Colors.gradient.teal} />
                <View style={styles.metricContent}>
                  <Text style={styles.metricLabel}>Blink Rate</Text>
                  <Text style={styles.metricValue}>{blinkRate}/min</Text>
                </View>
              </View>
            </View>
          </BlurView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  cameraBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 0,
  },
  overlay: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.medium,
  },
  timerContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    ...Shadows.medium,
  },
  timerText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginLeft: Spacing.xs,
  },
  brainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60,
  },
  hudContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    height: HUD_HEIGHT,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.large,
  },
  hudBlur: {
    flex: 1,
    padding: Spacing.md,
  },
  feedbackContainer: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  feedbackText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.gradient.green,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metric: {
    flex: 1,
    alignItems: 'center',
  },
  metricContent: {
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  metricLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
  },
  metricBar: {
    width: '90%',
    height: 4,
    backgroundColor: Colors.background.secondary,
    borderRadius: 2,
    marginTop: Spacing.xs,
    overflow: 'hidden',
  },
  metricBarFill: {
    height: '100%',
  },
  metricDivider: {
    width: 1,
    height: '60%',
    backgroundColor: Colors.border.light,
    opacity: 0.5,
  },
});
