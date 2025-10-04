import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Timer, Target, Eye, TrendingUp, CircleCheck as CheckCircle } from 'lucide-react-native';
import GradientCard from '@/components/GradientCard';
import CustomButton from '@/components/CustomButton';
import CircularProgress from '@/components/CircularProgress';
import MetricCard from '@/components/MetricCard';
import PlaceholderChart from '@/components/PlaceholderChart';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { SCREEN_PADDING, SCREEN_WIDTH, GAUGE_SIZE } from '@/constants/dimensions';

export default function ResultsScreen() {
  const router = useRouter();

  const handleSaveSession = () => {
    router.push('/(tabs)');
  };

  const handleTryAgain = () => {
    router.push('/calibration');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Session Results</Text>
          <Text style={styles.date}>October 4, 2025 • 3:45 PM</Text>
        </View>

        <View style={styles.scoreSection}>
          <CircularProgress
            size={GAUGE_SIZE}
            strokeWidth={16}
            percentage={82}
            label="Score"
            gradientColors={[
              Colors.gradient.blue,
              Colors.gradient.green,
              Colors.gradient.orange,
            ]}
            delay={200}
          />
          <Text style={styles.scoreDescription}>Great Session!</Text>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard
            title="Reaction Time"
            value="285"
            unit="ms"
            icon={<Timer size={20} color={Colors.gradient.cyan} />}
            style={styles.metricCard}
            delay={400}
          />
          <MetricCard
            title="Accuracy"
            value="88"
            unit="%"
            icon={<Target size={20} color={Colors.gradient.green} />}
            style={styles.metricCard}
            delay={450}
          />
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard
            title="Blink Rate"
            value="18"
            unit="/min"
            icon={<Eye size={20} color={Colors.gradient.teal} />}
            style={styles.metricCard}
            delay={500}
          />
          <MetricCard
            title="Duration"
            value="25"
            unit="min"
            icon={<Timer size={20} color={Colors.gradient.orange} />}
            style={styles.metricCard}
            delay={550}
          />
        </View>

        <GradientCard style={styles.trendCard} delay={600}>
          <View style={styles.cardHeader}>
            <TrendingUp size={20} color={Colors.gradient.green} />
            <Text style={styles.cardTitle}>Attention Trend</Text>
          </View>
          <PlaceholderChart
            width={SCREEN_WIDTH - (SCREEN_PADDING * 2) - 32}
            height={140}
          />
          <Text style={styles.trendDescription}>
            Your attention remained consistently high throughout the session
          </Text>
        </GradientCard>

        <GradientCard style={styles.highlightsCard} delay={700}>
          <Text style={styles.cardTitle}>Session Highlights</Text>
          <View style={styles.highlight}>
            <CheckCircle size={18} color={Colors.gradient.green} />
            <Text style={styles.highlightText}>Peak attention at 12:30 - 15:45</Text>
          </View>
          <View style={styles.highlight}>
            <CheckCircle size={18} color={Colors.gradient.green} />
            <Text style={styles.highlightText}>Best reaction time: 245ms</Text>
          </View>
          <View style={styles.highlight}>
            <CheckCircle size={18} color={Colors.gradient.green} />
            <Text style={styles.highlightText}>Maintained focus for 8 min</Text>
          </View>
        </GradientCard>

        <GradientCard style={styles.recommendationsCard} delay={800}>
          <Text style={styles.cardTitle}>Recommendations</Text>
          <Text style={styles.recommendationText}>
            • Your attention score improved by 5% from last session
          </Text>
          <Text style={styles.recommendationText}>
            • Try extending sessions to 30 minutes for better results
          </Text>
          <Text style={styles.recommendationText}>
            • Continue practicing at this time of day for optimal performance
          </Text>
        </GradientCard>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Save Session"
            onPress={handleSaveSession}
            style={styles.saveButton}
          />
          <CustomButton
            title="Try Again"
            onPress={handleTryAgain}
            variant="secondary"
            style={styles.tryAgainButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
  },
  date: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  scoreDescription: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.gradient.green,
    marginTop: Spacing.md,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  metricCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
  trendCard: {
    marginBottom: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginLeft: Spacing.sm,
  },
  trendDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
  },
  highlightsCard: {
    marginBottom: Spacing.md,
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  highlightText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  recommendationsCard: {
    marginBottom: Spacing.xl,
  },
  recommendationText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
  },
  buttonContainer: {
    gap: Spacing.md,
  },
  saveButton: {
    marginBottom: 0,
  },
  tryAgainButton: {
    marginBottom: 0,
  },
});
