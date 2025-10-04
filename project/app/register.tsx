import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { authService } from '@/services/auth';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react-native';
import CustomTextInput from '@/components/CustomTextInput';
import CustomButton from '@/components/CustomButton';
import ErrorMessage from '@/components/ErrorMessage';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import ParticleBackground from '@/components/ParticleBackground';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { SCREEN_PADDING } from '@/constants/dimensions';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateName,
  validatePhone,
  getPasswordStrength,
  FormErrors,
} from '@/utils/validation';

export default function RegisterScreen() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    strength: 'weak' | 'medium' | 'strong';
    score: number;
  }>({ strength: 'weak', score: 0 });

  const headerOpacity = useSharedValue(0);
  const headerY = useSharedValue(-20);
  const formOpacity = useSharedValue(0);
  const formY = useSharedValue(30);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    headerY.value = withSpring(0, { damping: 15 });

    formOpacity.value = withDelay(
      300,
      withTiming(1, { duration: 600 })
    );
    formY.value = withDelay(
      300,
      withSpring(0, { damping: 15 })
    );
  }, []);

  useEffect(() => {
    if (formData.password) {
      const strength = getPasswordStrength(formData.password);
      setPasswordStrength(strength);
    }
  }, [formData.password]);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerY.value }],
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formY.value }],
  }));

  const validateField = (field: string, value: string) => {
    let result;
    switch (field) {
      case 'name':
        result = validateName(value);
        break;
      case 'email':
        result = validateEmail(value);
        break;
      case 'phone':
        result = validatePhone(value);
        break;
      case 'password':
        result = validatePassword(value);
        break;
      case 'confirmPassword':
        result = validatePasswordMatch(formData.password, value);
        break;
      default:
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
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const phoneValidation = validatePhone(formData.phone);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = validatePasswordMatch(
      formData.password,
      formData.confirmPassword
    );

    const newErrors: FormErrors = {
      name: nameValidation.isValid ? '' : nameValidation.error || '',
      email: emailValidation.isValid ? '' : emailValidation.error || '',
      phone: phoneValidation.isValid ? '' : phoneValidation.error || '',
      password: passwordValidation.isValid ? '' : passwordValidation.error || '',
      confirmPassword: confirmPasswordValidation.isValid ? '' : confirmPasswordValidation.error || '',
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    return Object.values(newErrors).every((error) => !error);
  };

  const [authError, setAuthError] = useState('');
  
  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setAuthError('');

    try {
      await authService.signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.name
      });

      // Redirigir al usuario a la pantalla principal
      router.replace('/(tabs)');
    } catch (error: any) {
      setAuthError(error?.message || 'Failed to create account');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={[Colors.background.primary, Colors.background.secondary, Colors.background.primary]}
      style={styles.container}
    >
      <ParticleBackground particleCount={20} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
            <ArrowLeft size={24} color={Colors.text.primary} />
          </TouchableOpacity>

          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join AyuSetu to start your wellness journey</Text>
          </Animated.View>

          <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
            <View>
              <CustomTextInput
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
                onBlur={() => handleBlur('name')}
                error={errors.name}
                success={touched.name && !errors.name && formData.name.length > 0}
                icon={<User size={20} color={Colors.text.secondary} />}
              />
              <ErrorMessage message={errors.name} visible={touched.name && !!errors.name} />
            </View>

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
                icon={<Mail size={20} color={Colors.text.secondary} />}
              />
              <ErrorMessage message={errors.email} visible={touched.email && !!errors.email} />
            </View>

            <View>
              <CustomTextInput
                label="Phone Number"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChangeText={(text) => handleChange('phone', text)}
                onBlur={() => handleBlur('phone')}
                keyboardType="phone-pad"
                error={errors.phone}
                success={touched.phone && !errors.phone && formData.phone.length > 0}
                icon={<Phone size={20} color={Colors.text.secondary} />}
              />
              <ErrorMessage message={errors.phone} visible={touched.phone && !!errors.phone} />
            </View>

            <View>
              <CustomTextInput
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                onBlur={() => handleBlur('password')}
                secureTextEntry
                autoCapitalize="none"
                error={errors.password}
                success={touched.password && !errors.password && formData.password.length > 0}
                icon={<Lock size={20} color={Colors.text.secondary} />}
              />
              <ErrorMessage message={errors.password} visible={touched.password && !!errors.password} />
              {formData.password.length > 0 && (
                <PasswordStrengthIndicator
                  strength={passwordStrength.strength}
                  score={passwordStrength.score}
                  visible={!errors.password}
                />
              )}
            </View>

            <View>
              <CustomTextInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange('confirmPassword', text)}
                onBlur={() => handleBlur('confirmPassword')}
                secureTextEntry
                autoCapitalize="none"
                error={errors.confirmPassword}
                success={touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword.length > 0}
                icon={<Lock size={20} color={Colors.text.secondary} />}
              />
              <ErrorMessage message={errors.confirmPassword} visible={touched.confirmPassword && !!errors.confirmPassword} />
            </View>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By creating an account, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>

            {authError && (
              <ErrorMessage message={authError} visible={true} />
            )}
            <CustomButton
              title={isSubmitting ? "Creating Account..." : "Create Account"}
              onPress={handleRegister}
              style={styles.registerButton}
              disabled={isSubmitting}
            />
            {isSubmitting && (
              <ActivityIndicator
                size="small"
                color={Colors.gradient.blue}
                style={styles.loader}
              />
            )}

            <TouchableOpacity style={styles.loginContainer} onPress={handleBackToLogin}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.loginLink}>Login</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
  formContainer: {
    width: '100%',
  },
  termsContainer: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  termsText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.relaxed,
  },
  termsLink: {
    color: Colors.gradient.blue,
    fontFamily: Typography.fontFamily.semiBold,
  },
  registerButton: {
    marginTop: Spacing.md,
  },
  loginContainer: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  loginText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
  loginLink: {
    color: Colors.gradient.blue,
    fontFamily: Typography.fontFamily.semiBold,
  },
  loader: {
    marginTop: Spacing.md,
  },
});
