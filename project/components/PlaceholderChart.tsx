import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { getThemedColors, BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

interface PlaceholderChartProps {
  width: number;
  height: number;
  style?: ViewStyle;
  gradientColors?: string[];
}

const PlaceholderChart: React.FC<PlaceholderChartProps> = ({
  width,
  height,
  style,
  gradientColors,
}) => {
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);
  const usedGradientColors = gradientColors || [colors.gradient.blue, colors.gradient.green];
  const data = [30, 45, 35, 60, 55, 70, 65, 80, 75, 85];
  const max = Math.max(...data);

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - 40);
    const y = height - 40 - ((value / max) * (height - 80));
    return `${x},${y}`;
  }).join(' L');

  const pathData = `M${points}`;

  return (
    <View style={[styles.container, { width, height, backgroundColor: colors.background.secondary }, style]}>
      <Svg width={width - 40} height={height - 40} style={styles.svg}>
        <Path
          d={pathData}
          stroke={usedGradientColors[0]}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <View style={styles.grid}>
        {[...Array(5)].map((_, i) => (
          <View key={i} style={[styles.gridLine, { backgroundColor: colors.border.light }]} />
        ))}
      </View>
    </View>
  );
};

export default PlaceholderChart;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.background.secondary, // ahora dinámico
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    marginTop: 20,
    marginLeft: 20,
  },
  grid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
  },
  gridLine: {
    height: 1,
    // backgroundColor: Colors.border.light, // ahora dinámico
    opacity: 0.3,
  },
});
