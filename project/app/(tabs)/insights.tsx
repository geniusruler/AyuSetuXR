import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, Target, Award } from 'lucide-react-native';
import GradientCard from '@/components/GradientCard';
import MetricCard from '@/components/MetricCard';
import PlaceholderChart from '@/components/PlaceholderChart';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { SCREEN_PADDING, SCREEN_WIDTH } from '@/constants/dimensions';

export default function InsightsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Insights</Text>
        <Text style={styles.subtitle}>Your performance analytics</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <MetricCard
            title="Avg Score"
            value="79"
            icon={<Target size={18} color={Colors.gradient.blue} />}
            style={styles.metricCard}
          />
          <MetricCard
            title="Best Score"
            value="92"
            icon={<Award size={18} color={Colors.gradient.green} />}
            style={styles.metricCard}
          />
        </View>

        <GradientCard style={styles.chartCard}>
          <Text style={styles.cardTitle}>Weekly Progress</Text>
          <PlaceholderChart
            width={SCREEN_WIDTH - (SCREEN_PADDING * 2) - 32}
            height={160}
          />
        </GradientCard>

        <GradientCard style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <TrendingUp size={20} color={Colors.gradient.green} />
            <Text style={styles.insightTitle}>Improvement Trend</Text>
          </View>
          <Text style={styles.insightText}>
            Your attention score has improved by 12% over the last week. Keep up the great work!
          </Text>
        </GradientCard>

        <GradientCard style={styles.insightCard}>
          <Text style={styles.cardTitle}>Recommendations</Text>
          <Text style={styles.recommendationText}>
            • Practice during morning hours for optimal focus
          </Text>
          <Text style={styles.recommendationText}>
            • Maintain 20-30 minute session duration
          </Text>
          <Text style={styles.recommendationText}>
            • Ensure proper lighting and minimal distractions
          </Text>
        </GradientCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 60,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  metricCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
  chartCard: {
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  insightCard: {
    marginBottom: Spacing.md,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  insightTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginLeft: Spacing.sm,
  },
  insightText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
  },
  recommendationText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
  },
});
