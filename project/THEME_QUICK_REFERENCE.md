# Theme System - Quick Reference

## 🎨 Quick Start

### Using Theme in a Component

```typescript
import { useTheme } from '@/contexts/ThemeContext';
import { getThemedColors } from '@/constants/theme';

export default function MyComponent() {
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);

  return (
    <View style={{ backgroundColor: colors.background.primary }}>
      <Text style={{ color: colors.text.primary }}>Hello World</Text>
    </View>
  );
}
```

## 🎯 Common Patterns

### Screen Background
```typescript
<SafeAreaView style={{ backgroundColor: colors.background.primary }}>
```

### Card/Container
```typescript
<View style={{ backgroundColor: colors.background.card }}>
```

### Primary Text
```typescript
<Text style={{ color: colors.text.primary }}>
```

### Secondary Text
```typescript
<Text style={{ color: colors.text.secondary }}>
```

### Primary Button
```typescript
<TouchableOpacity style={{ backgroundColor: colors.gradient.blue }}>
```

### Border
```typescript
<View style={{ borderColor: colors.border.light, borderWidth: 1 }}>
```

## 🌈 Color Reference

### Dark Mode
| Use Case | Color |
|----------|-------|
| Screen BG | `colors.background.primary` (#0B0F19) |
| Card BG | `colors.background.card` (#1A1F2E) |
| Primary Text | `colors.text.primary` (#F9FAFB) |
| Secondary Text | `colors.text.secondary` (#D1D5DB) |
| Blue Accent | `colors.gradient.blue` (#3B82F6) |
| Cyan Accent | `colors.gradient.cyan` (#06B6D4) |
| Violet Accent | `colors.gradient.violet` (#8B5CF6) |
| Border | `colors.border.light` (#374151) |

### Light Mode
| Use Case | Color |
|----------|-------|
| Screen BG | `colors.background.primary` (#FFFFFF) |
| Card BG | `colors.background.card` (#FFFFFF) |
| Primary Text | `colors.text.primary` (#111827) |
| Secondary Text | `colors.text.secondary` (#374151) |
| Blue Accent | `colors.gradient.blue` (#2563EB) |
| Cyan Accent | `colors.gradient.cyan` (#0891B2) |
| Violet Accent | `colors.gradient.violet` (#7C3AED) |
| Border | `colors.border.light` (#E5E7EB) |

## 🔧 Toggle Theme

### From Code
```typescript
const { toggleTheme } = useTheme();

<Button onPress={toggleTheme} title="Toggle Theme" />
```

### Using ThemeToggle Component
```typescript
import ThemeToggle from '@/components/ThemeToggle';

<ThemeToggle />
```

## 📦 Component Examples

### Custom Button
```typescript
<TouchableOpacity
  style={{
    backgroundColor: colors.gradient.blue,
    padding: 16,
    borderRadius: 12,
  }}
>
  <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>
    Click Me
  </Text>
</TouchableOpacity>
```

### Gradient Button
```typescript
import { LinearGradient } from 'expo-linear-gradient';

<LinearGradient
  colors={[colors.gradient.blue, colors.gradient.cyan]}
  style={{ padding: 16, borderRadius: 12 }}
>
  <Text style={{ color: '#FFFFFF' }}>Gradient Button</Text>
</LinearGradient>
```

### Card with Border
```typescript
<View
  style={{
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 12,
    padding: 16,
  }}
>
  <Text style={{ color: colors.text.primary }}>Card Content</Text>
</View>
```

### Input Field
```typescript
<TextInput
  style={{
    backgroundColor: colors.background.secondary,
    borderColor: colors.border.light,
    borderWidth: 1,
    color: colors.text.primary,
    padding: 12,
    borderRadius: 8,
  }}
  placeholderTextColor={colors.text.muted}
  placeholder="Enter text..."
/>
```

## 🎭 Status States

### Success
```typescript
{
  color: colors.accent.success,    // Green
  icon: <CheckCircle color={colors.accent.success} />
}
```

### Warning
```typescript
{
  color: colors.accent.warning,    // Orange/Yellow
  icon: <AlertTriangle color={colors.accent.warning} />
}
```

### Danger/Error
```typescript
{
  color: colors.accent.danger,     // Red
  icon: <XCircle color={colors.accent.danger} />
}
```

### Info
```typescript
{
  color: colors.accent.primary,    // Blue
  icon: <Info color={colors.accent.primary} />
}
```

## 🎨 Gradient Presets

```typescript
import { getGradientPresets } from '@/constants/theme';

const gradients = getGradientPresets(colors);

// Primary: Blue to Cyan
<LinearGradient colors={gradients.primary} />

// Secondary: Blue to Violet to Cyan
<LinearGradient colors={gradients.secondary} />

// Success: Teal to Green
<LinearGradient colors={gradients.success} />

// Warning: Yellow to Orange
<LinearGradient colors={gradients.warning} />

// Danger: Orange to Red
<LinearGradient colors={gradients.danger} />
```

## 🔍 Checking Current Theme

```typescript
const { isDark, theme } = useTheme();

if (isDark) {
  // Dark mode specific logic
} else {
  // Light mode specific logic
}

// Or check theme string
if (theme === 'dark') {
  // Dark mode
}
```

## 💾 Theme Persistence

Theme automatically saves to AsyncStorage:
- **Storage Key:** `@ayusetu_theme_mode`
- **Saved on:** Every toggle
- **Loaded on:** App startup
- **Fallback:** Dark mode if storage fails

No manual intervention needed! 🎉

## ⚡ Performance Tips

### ✅ Do
```typescript
// Get colors once at component level
const colors = getThemedColors(isDark);

// Use throughout component
<View style={{ backgroundColor: colors.background.primary }}>
```

### ❌ Don't
```typescript
// Don't call getThemedColors repeatedly
<View style={{ backgroundColor: getThemedColors(isDark).background.primary }}>
<Text style={{ color: getThemedColors(isDark).text.primary }}>
```

## 🐛 Troubleshooting

### Theme doesn't persist
✅ Check AsyncStorage permissions
✅ Clear app storage and try again
✅ Check console for AsyncStorage errors

### Colors not updating
✅ Ensure using `useTheme()` hook
✅ Verify `getThemedColors(isDark)` is called
✅ Check colors are applied dynamically

### Text hard to read
✅ Use `colors.text.primary` for main text
✅ Use `colors.text.secondary` for labels
✅ Don't use gradient colors for body text

## 📱 Platform Specifics

### iOS
- Uses haptic feedback on toggle
- Safe area insets for notch/Dynamic Island
- Home indicator spacing (34px)

### Android
- Material elevation shadows
- StatusBar height handling
- Standard navigation spacing

### Web
- Standard browser behaviors
- CSS fallbacks
- LocalStorage instead of AsyncStorage

## 🎯 Common Use Cases

### Header with Theme
```typescript
<View style={{
  backgroundColor: colors.background.secondary,
  paddingVertical: 16,
  paddingHorizontal: 20,
  borderBottomWidth: 1,
  borderBottomColor: colors.border.light,
}}>
  <Text style={{ color: colors.text.primary, fontSize: 20 }}>
    Header Title
  </Text>
</View>
```

### List Item
```typescript
<TouchableOpacity style={{
  backgroundColor: colors.background.card,
  padding: 16,
  marginBottom: 8,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.border.light,
}}>
  <Text style={{ color: colors.text.primary }}>Item Title</Text>
  <Text style={{ color: colors.text.secondary }}>Item subtitle</Text>
</TouchableOpacity>
```

### Badge/Chip
```typescript
<View style={{
  backgroundColor: `${colors.gradient.blue}20`, // 20% opacity
  borderColor: colors.gradient.blue,
  borderWidth: 1,
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
}}>
  <Text style={{ color: colors.gradient.blue, fontSize: 12 }}>
    Badge
  </Text>
</View>
```

## 🎨 Design Tokens

Use these consistent values across the app:

**Border Radius:**
- Small: 8px
- Medium: 12px
- Large: 16px
- XL: 20px
- Round: 9999px

**Spacing:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

**Font Sizes:**
- xs: 12px
- sm: 14px
- base: 16px
- lg: 18px
- xl: 20px
- xxl: 24px
- xxxl: 32px

## 🚀 Next Steps

1. Import theme hooks in your component
2. Get colors with `getThemedColors(isDark)`
3. Apply colors to all styled elements
4. Test in both light and dark modes
5. Verify text contrast and readability

That's it! Your component is now theme-aware! 🎉
