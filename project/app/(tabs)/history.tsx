import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, TrendingUp } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientCard from '@/components/GradientCard';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemedColors, Typography, Spacing } from '@/constants/theme';
import { getResponsivePadding } from '@/constants/dimensions';

export default function HistoryScreen() {
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);
  const responsivePadding = getResponsivePadding();

  const sessions = [
    { date: 'Oct 3, 2025', score: 82, time: '25 min' },
    { date: 'Oct 2, 2025', score: 78, time: '20 min' },
    { date: 'Oct 1, 2025', score: 85, time: '30 min' },
    { date: 'Sep 30, 2025', score: 73, time: '18 min' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]} edges={['top']}>
      <View style={[styles.header, { paddingHorizontal: responsivePadding }]}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Session History</Text>
        <Calendar size={24} color={colors.gradient.blue} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: responsivePadding }]}
        showsVerticalScrollIndicator={false}
      >
        {sessions.map((session, index) => (
          <GradientCard key={index} style={styles.sessionCard} delay={index * 100} glowColor={colors.gradient.blue}>
            <View style={styles.sessionHeader}>
              <Text style={[styles.sessionDate, { color: colors.text.primary }]}>{session.date}</Text>
              <View style={styles.scoreContainer}>
                <TrendingUp size={16} color={colors.gradient.green} />
                <Text style={[styles.sessionScore, { color: colors.gradient.green }]}>{session.score}</Text>
              </View>
            </View>
            <Text style={[styles.sessionTime, { color: colors.text.secondary }]}>Duration: {session.time}</Text>
          </GradientCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: Typography.fontFamily.bold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sessionCard: {
    marginBottom: Spacing.md,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  sessionDate: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionScore: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
    marginLeft: Spacing.xs,
  },
  sessionTime: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
});
