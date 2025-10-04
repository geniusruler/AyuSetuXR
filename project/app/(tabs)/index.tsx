import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Activity, Clock, Zap } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientCard from '@/components/GradientCard';
import CustomButton from '@/components/CustomButton';
import MetricCard from '@/components/MetricCard';
import PlaceholderChart from '@/components/PlaceholderChart';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemedColors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { getResponsivePadding, SCREEN_WIDTH } from '@/constants/dimensions';
import { getResponsiveSpacing } from '@/utils/responsive';

export default function DashboardScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);
  const responsivePadding = getResponsivePadding();
  const responsiveSpacing = getResponsiveSpacing(Spacing.lg);

  const handleStartSession = () => {
    router.push('/calibration');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: responsivePadding }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text.secondary }]}>Welcome back,</Text>
            <Text style={[styles.username, { color: colors.text.primary, textShadowColor: colors.gradient.cyan }]}>Priya</Text>
          </View>
          <View style={[styles.streakBadge, { backgroundColor: colors.background.card, borderColor: `${colors.gradient.orange}40` }]}>
            <View style={[styles.streakGlow, { backgroundColor: `${colors.gradient.orange}20` }]} />
            <Zap size={20} color={colors.gradient.orange} fill={colors.gradient.orange} />
            <Text style={[styles.streakText, { color: colors.text.primary }]}>7 day streak</Text>
          </View>
        </View>

        <GradientCard style={styles.summaryCard} delay={100} glowColor={colors.gradient.cyan}>
          <Text style={[styles.cardTitle, { color: colors.text.secondary }]}>Last Session Summary</Text>
          <View style={styles.summaryMetrics}>
            <View style={styles.summaryMetric}>
              <Text style={[styles.summaryValue, { color: colors.gradient.cyan, textShadowColor: colors.gradient.cyan }]}>82</Text>
              <Text style={[styles.summaryLabel, { color: colors.text.secondary }]}>Attention Score</Text>
            </View>
            <View style={[styles.summaryDivider, { backgroundColor: colors.border.light }]} />
            <View style={styles.summaryMetric}>
              <Text style={[styles.summaryValue, { color: colors.gradient.cyan, textShadowColor: colors.gradient.cyan }]}>285ms</Text>
              <Text style={[styles.summaryLabel, { color: colors.text.secondary }]}>Reaction Time</Text>
            </View>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.background.secondary }]}>
            <View style={[styles.progressFill, { width: '82%', backgroundColor: colors.gradient.blue }]} />
          </View>
        </GradientCard>

        <CustomButton
          title="Start XR Session"
          onPress={handleStartSession}
          style={styles.startButton}
        />

        <View style={styles.statsGrid}>
          <MetricCard
            title="Total Sessions"
            value="24"
            icon={<Activity size={18} color={colors.gradient.blue} />}
            style={styles.statCard}
            delay={200}
          />
          <MetricCard
            title="Total Time"
            value="6.2"
            unit="hrs"
            icon={<Clock size={18} color={colors.gradient.green} />}
            style={styles.statCard}
            delay={250}
          />
        </View>

        <View style={styles.progressSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Progress History</Text>
          <PlaceholderChart
            width={SCREEN_WIDTH - (responsivePadding * 2)}
            height={180}
            style={styles.chart}
          />
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.gradient.blue }]} />
              <Text style={[styles.legendText, { color: colors.text.secondary }]}>Attention Score</Text>
            </View>
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Recent Achievements</Text>
          <GradientCard style={styles.achievementCard} delay={300}>
            <Text style={[styles.achievementTitle, { color: colors.text.primary }]}>Week Warrior</Text>
            <Text style={[styles.achievementDesc, { color: colors.text.secondary }]}>Complete 7 consecutive days</Text>
          </GradientCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.lg,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
  },
  username: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: Typography.fontFamily.bold,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
  },
  streakGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: BorderRadius.xl,
  },
  streakText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semiBold,
    marginLeft: Spacing.xs,
  },
  summaryCard: {
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
  },
  summaryMetric: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: Typography.fontFamily.bold,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  summaryLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    marginTop: Spacing.xs,
  },
  summaryDivider: {
    width: 1,
  },
  progressBar: {
    height: 6,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  startButton: {
    marginBottom: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
  progressSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    marginBottom: Spacing.md,
  },
  chart: {
    marginBottom: Spacing.sm,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  legendText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
  achievementsSection: {
    marginBottom: Spacing.lg,
  },
  achievementCard: {
  },
  achievementTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    marginBottom: Spacing.xs,
  },
  achievementDesc: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
});
