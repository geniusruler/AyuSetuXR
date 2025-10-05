# Contributing to AyuSetuXR

We're excited that you're interested in contributing to AyuSetuXR! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Development Setup

1. **Fork and Clone**

   ```bash
   git clone https://github.com/your-username/AyuSetuXR.git
   cd AyuSetuXR/project
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment**

   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Start Development Server**
   ```bash
   npx expo start
   ```

### Development Workflow

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**

   - Follow our coding standards
   - Write tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**

   ```bash
   npm run test
   npm run lint
   npm run typecheck
   ```

4. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Coding Standards

### TypeScript Guidelines

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use meaningful variable and function names
- Add proper JSDoc comments for public APIs

```typescript
/**
 * Calculates cognitive metrics from facial landmarks
 * @param landmarks - Array of facial landmark points
 * @returns Computed cognitive metrics or null if invalid input
 */
export function computeMetrics(landmarks: Landmark[]): CognitiveMetrics | null {
  // Implementation
}
```

### React Native Best Practices

- Use functional components with hooks
- Implement proper error boundaries
- Follow React Native performance guidelines
- Use platform-specific code when necessary

```tsx
// Good: Platform-specific styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 44 : 24,
  },
});
```

### File Structure

```
src/
├── components/          # Reusable UI components
├── services/           # API and business logic
├── utils/              # Helper functions
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── constants/          # App constants
└── types/              # TypeScript type definitions
```

## 🧪 Testing

### Writing Tests

- Write unit tests for utilities and services
- Use integration tests for components
- Include E2E tests for critical user flows

```typescript
// Example test
import { computeMetrics } from "../utils/computeMetrics";

describe("computeMetrics", () => {
  it("should return null for invalid landmarks", () => {
    expect(computeMetrics([])).toBeNull();
  });

  it("should compute valid metrics for proper input", () => {
    const landmarks = createMockLandmarks();
    const result = computeMetrics(landmarks);
    expect(result).toBeDefined();
    expect(result.attentionScore).toBeGreaterThan(0);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 🎨 UI/UX Guidelines

### Design System

- Follow the established color palette and typography
- Use consistent spacing and layout patterns
- Ensure accessibility compliance (WCAG 2.1 AA)
- Support both light and dark themes

### Component Development

```tsx
// Example component structure
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export function CustomButton({
  title,
  onPress,
  variant = "primary",
  disabled,
}: CustomButtonProps) {
  const { isDark } = useTheme();
  const colors = getThemedColors(isDark);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
```

## 🔬 Machine Learning Contributions

### Model Improvements

- Ensure compatibility with TensorFlow.js
- Test performance on mobile devices
- Document accuracy improvements
- Include proper error handling

### Algorithm Development

```javascript
// Example metric computation
export function computeAttentionScore(landmarks) {
  // Validate input
  if (!landmarks || landmarks.length < 468) {
    return null;
  }

  // Extract relevant landmarks
  const gazeDirection = extractGazeDirection(landmarks);
  const blinkRate = calculateBlinkRate(landmarks);

  // Compute attention score
  return normalizeScore(gazeDirection, blinkRate);
}
```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for all public APIs
- Include usage examples
- Document complex algorithms
- Maintain type definitions

### User Documentation

- Update README for new features
- Create tutorials for complex workflows
- Maintain API documentation
- Include troubleshooting guides

## 🐛 Bug Reports

### Creating Issues

When reporting bugs, include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Device, OS version, app version
- **Screenshots/Logs**: Visual evidence or error logs

### Bug Report Template

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**

- Device: [e.g. iPhone 12]
- OS: [e.g. iOS 15.0]
- App Version: [e.g. 1.0.0]
```

## 🔐 Security

### Reporting Security Issues

For security vulnerabilities:

1. **Do not** create public issues
2. Email security@ayusetuxr.com
3. Include detailed description
4. Allow reasonable time for response

### Security Guidelines

- Never commit secrets or API keys
- Use environment variables for configuration
- Follow OWASP mobile security guidelines
- Implement proper input validation

## 🌟 Feature Requests

### Proposing Features

Before creating feature requests:

1. Check existing issues and discussions
2. Consider if it aligns with project goals
3. Think about implementation complexity
4. Provide detailed use cases

### Feature Request Template

```markdown
**Feature Description**
Clear description of the proposed feature.

**Use Case**
Why is this feature needed? What problem does it solve?

**Proposed Solution**
How would you like to see this implemented?

**Alternatives**
Alternative solutions you've considered.

**Additional Context**
Any other context or screenshots about the feature request.
```

## 🎯 Contribution Areas

### High Priority

- 🔍 **Accessibility**: Screen reader support, keyboard navigation
- 🚀 **Performance**: Optimization for lower-end devices
- 🧪 **Testing**: Increased test coverage
- 📱 **Cross-platform**: Platform-specific improvements

### Medium Priority

- 🎨 **UI/UX**: Design improvements and animations
- 📊 **Analytics**: Enhanced data visualization
- 🔧 **Developer Experience**: Tooling and workflow improvements
- 🌐 **Internationalization**: Multi-language support

### Research Areas

- 🧠 **ML Algorithms**: Advanced cognitive assessment techniques
- 🔬 **Validation Studies**: Clinical validation of metrics
- 📈 **Data Science**: Pattern recognition and insights
- 🏥 **Healthcare Integration**: Medical system compatibility

## 📞 Communication

### Getting Help

- **GitHub Discussions**: For questions and general discussion
- **Discord**: Real-time chat with maintainers and community
- **Email**: Direct contact for complex issues

### Code Review Process

1. All contributions require review
2. Maintainers will provide feedback
3. Address review comments promptly
4. Be open to suggestions and changes

## 🏆 Recognition

Contributors will be recognized in:

- Contributors section of README
- Release notes for significant contributions
- Project website (coming soon)

## 📜 Code of Conduct

Please note that this project is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.

---

Thank you for contributing to AyuSetuXR! Together, we're building the future of cognitive health monitoring.
