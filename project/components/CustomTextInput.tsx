import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle } from 'react-native';
import { getThemedColors, Typography, BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { INPUT_HEIGHT } from '@/constants/dimensions';


interface CustomTextInputProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: ViewStyle;
  icon?: React.ReactNode;
  error?: string;
  success?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  style,
  icon,
  error,
  success = false,
  autoCapitalize = 'sentences',
}) => {
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  const getBorderColor = () => {
    if (error) return colors.gradient.red;
    if (success) return colors.gradient.green;
    if (isFocused) return colors.gradient.blue;
    return colors.border.light;
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>{label}</Text>
      <View style={[styles.inputContainer, { borderColor: getBorderColor(), backgroundColor: colors.background.secondary }] }>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          style={[styles.input, { color: colors.text.primary }, icon ? styles.inputWithIcon : undefined]}
        />
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    // color: Colors.text.secondary, // Se usa dinámicamente
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    height: INPUT_HEIGHT,
    // backgroundColor: Colors.background.secondary, // Se usa dinámicamente
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    // borderColor: Colors.border.light, // Se usa dinámicamente
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  // inputContainerFocused: {
  //   borderColor: Colors.gradient.blue,
  // },
  iconContainer: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    // color: Colors.text.primary, // Se usa dinámicamente
  },
  inputWithIcon: {
    marginLeft: Spacing.xs,
  },
});
