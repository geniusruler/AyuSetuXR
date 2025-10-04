import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface Particle {
  id: number;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  moveX: number;
  moveY: number;
  color: string;
  opacity: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const PARTICLE_COLORS = ['#4A90E2', '#50E3C2', '#9013FE'];

const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    initialX: Math.random() * SCREEN_WIDTH,
    initialY: Math.random() * SCREEN_HEIGHT,
    duration: Math.random() * 10000 + 15000,
    delay: Math.random() * 5000,
    moveX: (Math.random() - 0.5) * 100,
    moveY: (Math.random() - 0.5) * 120,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    opacity: Math.random() * 0.3 + 0.15,
  }));
};

interface AnimatedParticleProps {
  particle: Particle;
}

const AnimatedParticle: React.FC<AnimatedParticleProps> = ({ particle }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(
      particle.delay,
      withRepeat(
        withTiming(particle.opacity, {
          duration: particle.duration * 0.3,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );

    scale.value = withDelay(
      particle.delay,
      withRepeat(
        withTiming(1.2, {
          duration: particle.duration * 0.5,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );

    translateX.value = withDelay(
      particle.delay,
      withRepeat(
        withTiming(particle.moveX, {
          duration: particle.duration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );

    translateY.value = withDelay(
      particle.delay,
      withRepeat(
        withTiming(particle.moveY, {
          duration: particle.duration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: particle.initialX,
          top: particle.initialY,
          width: particle.size,
          height: particle.size,
        },
        animatedStyle,
      ]}
    >
      <LinearGradient
        colors={[`${particle.color}40`, `${particle.color}00`]}
        style={styles.particleGradient}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      >
        <View
          style={[
            styles.particleCore,
            {
              backgroundColor: `${particle.color}80`,
              shadowColor: particle.color,
            },
          ]}
        />
      </LinearGradient>
    </Animated.View>
  );
};

interface ParticleBackgroundProps {
  particleCount?: number;
}

export default function ParticleBackground({ particleCount = 20 }: ParticleBackgroundProps) {
  const { isDark } = useTheme();
  const particles = useMemo(() => generateParticles(particleCount), [particleCount]);

  if (!isDark) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle) => (
        <AnimatedParticle key={particle.id} particle={particle} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    borderRadius: 1000,
  },
  particleGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  particleCore: {
    width: '40%',
    height: '40%',
    borderRadius: 1000,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 5,
  },
});
