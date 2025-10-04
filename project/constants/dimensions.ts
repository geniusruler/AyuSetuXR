import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export { SCREEN_WIDTH, SCREEN_HEIGHT };

export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = SCREEN_WIDTH >= 414;

export const isTablet = SCREEN_WIDTH >= 768;

export const scale = (size: number): number => {
  const guidelineBaseWidth = 375;
  return (SCREEN_WIDTH / guidelineBaseWidth) * size;
};

export const verticalScale = (size: number): number => {
  const guidelineBaseHeight = 812;
  return (SCREEN_HEIGHT / guidelineBaseHeight) * size;
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

export const normalize = (size: number): number => {
  const newSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const CARD_PADDING = moderateScale(16);
export const SCREEN_PADDING = moderateScale(20);
export const TAB_BAR_HEIGHT = Platform.select({ ios: 80, android: 70, default: 70 });
export const HEADER_HEIGHT = moderateScale(60);

export const INPUT_HEIGHT = moderateScale(56);
export const BUTTON_HEIGHT = moderateScale(56);
export const METRIC_CARD_HEIGHT = moderateScale(100);

export const BRAIN_ILLUSTRATION_SIZE = SCREEN_WIDTH * (isSmallDevice ? 0.65 : 0.7);
export const HUD_HEIGHT = moderateScale(140);
export const GAUGE_SIZE = moderateScale(200);

export const getResponsivePadding = () => {
  if (isSmallDevice) return 16;
  if (isMediumDevice) return 20;
  return 24;
};

export const getResponsiveFontSize = (baseSize: number) => {
  return normalize(baseSize);
};
