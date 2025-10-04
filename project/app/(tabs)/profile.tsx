import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { User, Settings, Bell, Circle as HelpCircle, LogOut } from 'lucide-react-native';
import GradientCard from '@/components/GradientCard';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemedColors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { SCREEN_PADDING } from '@/constants/dimensions';

export default function ProfileScreen() {
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);

  const menuItems = [
    { icon: Settings, label: 'Settings', color: colors.gradient.blue },
    { icon: Bell, label: 'Notifications', color: colors.gradient.green },
    { icon: HelpCircle, label: 'Help & Support', color: colors.gradient.orange },
    { icon: LogOut, label: 'Logout', color: colors.gradient.red },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Profile</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GradientCard style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.background.secondary, borderColor: colors.gradient.blue }]}>
              <User size={40} color={colors.text.primary} />
            </View>
          </View>
          <Text style={[styles.name, { color: colors.text.primary }]}>Priya Sharma</Text>
          <Text style={[styles.email, { color: colors.text.secondary }]}>priya.sharma@example.com</Text>
          <View style={[styles.statsRow, { borderTopColor: colors.border.light }]}>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.text.primary }]}>24</Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Sessions</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border.light }]} />
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.text.primary }]}>7</Text>
              {/* streak eliminado */}
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border.light }]} />
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.text.primary }]}>82</Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Avg Score</Text>
            </View>
          </View>
        </GradientCard>

        <View style={[styles.themeSection, { backgroundColor: colors.background.card }]}>
          <ThemeToggle />
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.menuItem, { borderBottomColor: colors.border.light }]}>
              <View style={styles.menuItemLeft}>
                <item.icon size={22} color={item.color} strokeWidth={2} />
                <Text style={[styles.menuItemText, { color: colors.text.primary }]}>{item.label}</Text>
              </View>
              <View style={styles.menuItemArrow} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.version, { color: colors.text.muted }]}>Version 1.0.0</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  name: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: Spacing.xs,
  },
  email: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.fontSize.xxl,
    fontFamily: Typography.fontFamily.bold,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
  },
  themeSection: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
  },
  menuSection: {
    marginBottom: Spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    marginLeft: Spacing.md,
  },
  menuItemArrow: {
    width: 8,
    height: 8,
    borderRightWidth: 2,
    borderTopWidth: 2,
    transform: [{ rotate: '45deg' }],
  },
  version: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
});
