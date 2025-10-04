import { Dimensions, Platform, StatusBar } from 'react-native';

export const getDeviceType = () => {
  const { width } = Dimensions.get('window');

  if (width < 375) return 'small';
  if (width >= 375 && width < 414) return 'medium';
  if (width >= 414 && width < 768) return 'large';
  return 'tablet';
};

export const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width > height ? 'landscape' : 'portrait';
};

export const isPortrait = () => {
  const { width, height } = Dimensions.get('window');
  return height >= width;
};

export const isLandscape = () => {
  const { width, height } = Dimensions.get('window');
  return width > height;
};

export const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    const { height, width } = Dimensions.get('window');
    if (height === 812 || width === 812 || height === 896 || width === 896) {
      return 44;
    }
    return 20;
  }
  return StatusBar.currentHeight || 0;
};

export const hasNotch = () => {
  const { height, width } = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    (height === 812 || width === 812 || height === 896 || width === 896 || height >= 844)
  );
};

export const getBottomSpace = () => {
  return hasNotch() ? 34 : 0;
};

export const getResponsiveSpacing = (baseSpacing: number) => {
  const deviceType = getDeviceType();

  switch (deviceType) {
    case 'small':
      return baseSpacing * 0.85;
    case 'medium':
      return baseSpacing;
    case 'large':
      return baseSpacing * 1.1;
    case 'tablet':
      return baseSpacing * 1.3;
    default:
      return baseSpacing;
  }
};

export const getResponsiveColumns = () => {
  const { width } = Dimensions.get('window');
  const orientation = getOrientation();

  if (width >= 768) {
    return orientation === 'portrait' ? 2 : 3;
  }

  if (width >= 414) {
    return orientation === 'portrait' ? 1 : 2;
  }

  return 1;
};

export const getResponsiveCardWidth = (columns: number = 1, spacing: number = 16) => {
  const { width } = Dimensions.get('window');
  const totalSpacing = spacing * (columns + 1);
  return (width - totalSpacing) / columns;
};
