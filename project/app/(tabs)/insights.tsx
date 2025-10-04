import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, Target, Award } from 'lucide-react-native';
import GradientCard from '@/components/GradientCard';
import MetricCard from '@/components/MetricCard';
import PlaceholderChart from '@/components/PlaceholderChart';
import { getThemedColors, Typography, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_PADDING, SCREEN_WIDTH } from '@/constants/dimensions';

export default function InsightsScreen() {
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);
  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }] }>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Insights</Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Your performance analytics</Text>
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
            icon={<Target size={18} color={colors.gradient.blue} />}
            style={styles.metricCard}
          />
          <MetricCard
            title="Best Score"
            value="92"
            icon={<Award size={18} color={colors.gradient.green} />}
            style={styles.metricCard}
          />
        </View>

        <GradientCard style={styles.chartCard}>
          <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Weekly Progress</Text>
          <PlaceholderChart
            width={SCREEN_WIDTH - (SCREEN_PADDING * 2) - 32}
            height={160}
          />
        </GradientCard>

        <GradientCard style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <TrendingUp size={20} color={colors.gradient.green} />
            <Text style={[styles.insightTitle, { color: colors.text.primary }]}>Improvement Trend</Text>
          </View>
          <Text style={[styles.insightText, { color: colors.text.secondary }] }>
            Your attention score has improved by 12% over the last week. Keep up the great work!
          </Text>
        </GradientCard>

        <GradientCard style={styles.insightCard}>
          <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Recommendations</Text>
          <Text style={[styles.recommendationText, { color: colors.text.secondary }] }>
            • Practice during morning hours for optimal focus
          </Text>
          <Text style={[styles.recommendationText, { color: colors.text.secondary }] }>
            • Maintain 20-30 minute session duration
          </Text>
          <Text style={[styles.recommendationText, { color: colors.text.secondary }] }>
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
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 60,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: Typography.fontFamily.bold,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
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
    marginLeft: Spacing.sm,
  },
  insightText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
  },
  recommendationText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: Spacing.sm,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
  },
});
