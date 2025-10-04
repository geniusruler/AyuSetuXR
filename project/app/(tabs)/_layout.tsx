import React from 'react';
import { Tabs } from 'expo-router';
import { Hop as Home, ChartBar as BarChart3, Play, Brain, User } from 'lucide-react-native';
import { View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemedColors, Typography } from '@/constants/theme';
import { TAB_BAR_HEIGHT } from '@/constants/dimensions';
import { getBottomSpace } from '@/utils/responsive';

export default function TabLayout() {
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);
  const bottomSpace = getBottomSpace();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background.secondary,
          borderTopWidth: 1,
          borderTopColor: colors.border.light,
          height: Platform.select({
            ios: (TAB_BAR_HEIGHT as number) + bottomSpace,
            android: TAB_BAR_HEIGHT,
            default: TAB_BAR_HEIGHT,
          }),
          paddingBottom: Platform.select({
            ios: bottomSpace > 0 ? bottomSpace : 10,
            android: 10,
            default: 10,
          }),
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.gradient.blue,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: Typography.fontSize.xs,
          fontFamily: Typography.fontFamily.medium,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <BarChart3 size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="start"
        options={{
          title: 'Start',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.centerTabIcon}>
              <LinearGradient
                colors={focused ? [colors.gradient.blue, colors.gradient.cyan] : [colors.background.tertiary, colors.background.tertiary]}
                style={[styles.centerTabGradient, { shadowColor: colors.gradient.blue }]}
              >
                <Play size={28} color={colors.text.primary} strokeWidth={2} fill={colors.text.primary} />
              </LinearGradient>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <Brain size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerTabIcon: {
    marginTop: -15,
  },
  centerTabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
});
