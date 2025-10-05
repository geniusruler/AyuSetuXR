import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Mail, Lock, Brain } from 'lucide-react-native';
import CustomTextInput from '@/components/CustomTextInput';
import CustomButton from '@/components/CustomButton';
import ErrorMessage from '@/components/ErrorMessage';
import ParticleBackground from '@/components/ParticleBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemedColors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { getResponsivePadding } from '@/constants/dimensions';
import { validateEmail, validatePassword, FormErrors } from '@/utils/validation';
import { authService } from '@/services/auth';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);
  const responsivePadding = getResponsivePadding();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string>('');

  const logoScale = useSharedValue(0);
  const logoRotate = useSharedValue(-180);
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);
  const formOpacity = useSharedValue(0);
  const formY = useSharedValue(30);

  useEffect(() => {
    logoScale.value = withSequence(
      withSpring(1.2, { damping: 10 }),
      withSpring(1, { damping: 15 })
    );
    logoRotate.value = withSpring(0, {
      damping: 20,
      stiffness: 80,
    });

    titleOpacity.value = withDelay(
      300,
      withTiming(1, { duration: 600 })
    );
    titleY.value = withDelay(
      300,
      withSpring(0, { damping: 15 })
    );

    formOpacity.value = withDelay(
      600,
      withTiming(1, { duration: 600 })
    );
    formY.value = withDelay(
      600,
      withSpring(0, { damping: 15 })
    );
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotate.value}deg` },
    ],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formY.value }],
  }));

  const validateField = (field: string, value: string) => {
    let result;
    if (field === 'email') {
      result = validateEmail(value);
    } else if (field === 'password') {
      result = validatePassword(value);
    } else {
      return;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: result.isValid ? '' : (result.error || ''),
    }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateForm = (): boolean => {
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    const newErrors: FormErrors = {
      email: emailValidation.isValid ? '' : emailValidation.error || '',
      password: passwordValidation.isValid ? '' : passwordValidation.error || '',
    };

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    return Object.values(newErrors).every((error) => !error);
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setAuthError('');

    try {
      await authService.signIn({
        email: formData.email,
        password: formData.password,
      });

      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error?.message || 'Failed to sign in. Please check your credentials.';
      setAuthError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace('/(tabs)');
      }
    };
    checkUser();
  }, []);

  const handleSignUp = () => {
    router.push('/register');
  };

  return (
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary, colors.background.primary]}
      style={styles.container}
    >
      <ParticleBackground particleCount={20} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Animated.View style={[styles.logoCircle, logoAnimatedStyle, { backgroundColor: `${colors.gradient.blue}20`, borderColor: colors.gradient.blue }]}>
              <Brain size={48} color={colors.gradient.blue} strokeWidth={2} />
            </Animated.View>
            <Animated.View style={titleAnimatedStyle}>
              <Text style={[styles.appName, { color: colors.text.primary }]}>AyuSetuXR</Text>
              <Text style={[styles.tagline, { color: colors.text.secondary }]}>XR Neurofeedback Wellness</Text>
            </Animated.View>
          </View>

          <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
            {authError ? (
              <ErrorMessage message={authError} visible={true} />
            ) : null}

            <View>
              <CustomTextInput
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                onBlur={() => handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                success={touched.email && !errors.email && formData.email.length > 0}
                icon={<Mail size={20} color={colors.text.secondary} />}
              />
              <ErrorMessage message={errors.email} visible={touched.email && !!errors.email} />
            </View>

            <View>
              <CustomTextInput
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                onBlur={() => handleBlur('password')}
                secureTextEntry
                autoCapitalize="none"
                error={errors.password}
                success={touched.password && !errors.password && formData.password.length > 0}
                icon={<Lock size={20} color={colors.text.secondary} />}
              />
              <ErrorMessage message={errors.password} visible={touched.password && !!errors.password} />
            </View>

            <CustomButton
              title={isSubmitting ? "Logging in..." : "Login"}
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={isSubmitting}
            />
            {isSubmitting && (
              <ActivityIndicator
                size="small"
                color={colors.gradient.blue}
                style={styles.loader}
              />
            )}

            <TouchableOpacity style={styles.signupContainer} onPress={handleSignUp}>
              <Text style={[styles.signupText, { color: colors.text.secondary }]}>
                Don't have an account?{' '}
                <Text style={[styles.signupLink, { color: colors.gradient.blue }]}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 2,
  },
  appName: {
    fontSize: Typography.fontSize.display,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: Spacing.xs,
  },
  tagline: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
  },
  formContainer: {
    width: '100%',
  },
  loginButton: {
    marginTop: Spacing.md,
  },
  signupContainer: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  signupText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
  },
  signupLink: {
    fontFamily: Typography.fontFamily.semiBold,
  },
  loader: {
    marginTop: Spacing.md,
  },
});
