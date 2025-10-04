export const DarkColors = {
  background: {
    primary: '#0B0F19',
    secondary: '#151A2B',
    tertiary: '#1E2433',
    card: '#1A1F2E',
  },
  gradient: {
    blue: '#3B82F6',
    cyan: '#06B6D4',
    green: '#10B981',
    teal: '#14B8A6',
    yellow: '#F59E0B',
    orange: '#F97316',
    red: '#EF4444',
    darkRed: '#DC2626',
    violet: '#8B5CF6',
  },
  text: {
    primary: '#F9FAFB',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF',
    muted: '#6B7280',
  },
  accent: {
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
  border: {
    light: '#374151',
    medium: '#4B5563',
  },
};

export const LightColors = {
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    card: '#FFFFFF',
  },
  gradient: {
    blue: '#2563EB',
    cyan: '#0891B2',
    green: '#059669',
    teal: '#0D9488',
    yellow: '#D97706',
    orange: '#EA580C',
    red: '#DC2626',
    darkRed: '#B91C1C',
    violet: '#7C3AED',
  },
  text: {
    primary: '#111827',
    secondary: '#4B5563', // más suave para mejor contraste
    tertiary: '#6B7280',
    muted: '#9CA3AF',
  },
  accent: {
    primary: '#2563EB',
    success: '#059669',
    warning: '#D97706',
    danger: '#DC2626',
  },
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
  },
};

export const Colors = DarkColors;

export const Typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 9999,
};

export const getShadows = (isDark: boolean) => ({
  small: {
    shadowColor: isDark ? '#000' : '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: isDark ? 0.25 : 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: isDark ? '#000' : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isDark ? 0.3 : 0.15,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: isDark ? '#000' : '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: isDark ? 0.37 : 0.2,
    shadowRadius: 7.49,
    elevation: 8,
  },
  glow: {
    shadowColor: isDark ? DarkColors.gradient.blue : LightColors.gradient.blue,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: isDark ? 0.6 : 0.4,
    shadowRadius: isDark ? 10 : 8,
    elevation: 5,
  },
  glowCyan: {
    shadowColor: isDark ? DarkColors.gradient.cyan : LightColors.gradient.cyan,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: isDark ? 0.5 : 0.3,
    shadowRadius: isDark ? 12 : 10,
    elevation: 5,
  },
  glowPurple: {
    shadowColor: isDark ? '#9013FE' : '#7209B7',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: isDark ? 0.5 : 0.3,
    shadowRadius: isDark ? 12 : 10,
    elevation: 5,
  },
});

export const Shadows = getShadows(true);

export const getGradientPresets = (colors: typeof DarkColors | typeof LightColors) => ({
  primary: [colors.gradient.blue, colors.gradient.cyan],
  secondary: [colors.gradient.blue, colors.gradient.violet, colors.gradient.cyan],
  attention: [colors.gradient.blue, colors.gradient.green, colors.gradient.orange, colors.gradient.red],
  success: [colors.gradient.teal, colors.gradient.green],
  warning: [colors.gradient.yellow, colors.gradient.orange],
  danger: [colors.gradient.orange, colors.gradient.red],
});

export const GradientPresets = getGradientPresets(DarkColors);

export function getThemedColors(isDark: boolean) {
  return isDark ? DarkColors : LightColors;
}
