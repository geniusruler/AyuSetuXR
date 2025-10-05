# AyuSetuXR - The Bridge Between Life and Extended Reality

<div align="center">

![AyuSetuXR Logo](project/assets/images/icon.png)

**Cognitive Health Monitoring through Advanced Computer Vision**

_Today human health, tomorrow the world health._

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white)](https://www.tensorflow.org/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

</div>

## 🧠 Overview

AyuSetuXR is a revolutionary cognitive health monitoring application that leverages advanced computer vision and machine learning to assess mental wellness through non-invasive facial analysis. By analyzing eye movements, blink patterns, and facial landmarks in real-time, AyuSetu provides comprehensive insights into cognitive performance, attention levels, stress indicators, and fatigue patterns.

The application bridges the gap between traditional health monitoring and modern extended reality (XR) technologies, offering a seamless, privacy-focused solution for cognitive health assessment.

## ✨ Key Features

### 🎯 Real-Time Cognitive Assessment

- **Attention Monitoring**: Track focus levels through gaze patterns and eye movement analysis
- **Reaction Time Analysis**: Measure cognitive response speed and processing efficiency
- **Stress Detection**: Identify stress indicators through facial micro-expressions
- **Fatigue Assessment**: Monitor mental fatigue through blink rate and eye movement patterns

### 📊 Advanced Analytics

- **Comprehensive Metrics Dashboard**: View detailed cognitive performance metrics
- **Historical Tracking**: Monitor cognitive health trends over time
- **Session Summaries**: Get detailed reports after each assessment session
- **Performance Insights**: Receive personalized recommendations based on your data

### 🔐 Privacy-First Architecture

- **Local Processing**: Face analysis performed on-device for maximum privacy
- **Secure Data Storage**: Encrypted storage using Supabase with row-level security
- **No Face Storage**: Only anonymized metrics are stored, never facial images
- **User Control**: Complete control over data collection and retention

### 🎨 Modern User Experience

- **Intuitive Interface**: Clean, accessible design with dark/light theme support
- **Smooth Animations**: Fluid interactions powered by React Native Reanimated
- **Cross-Platform**: Seamless experience across iOS, Android, and web platforms
- **Offline Capability**: Core functionality available without internet connection

## 🏗️ Architecture

### Technology Stack

**Frontend & Mobile**

- **React Native 0.81.4** - Cross-platform mobile development
- **Expo SDK 54** - Development platform and toolchain
- **TypeScript** - Type-safe development
- **React Native Reanimated** - Smooth animations and gestures
- **Expo Router** - File-based navigation system

**Computer Vision & ML**

- **TensorFlow.js** - Client-side machine learning
- **MediaPipe Face Mesh** - 468-point facial landmark detection
- **Custom Algorithms** - Proprietary cognitive metric computation

**Backend & Data**

- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Row Level Security (RLS)** - Fine-grained access control
- **Real-time Subscriptions** - Live data synchronization

**Development & Deployment**

- **EAS (Expo Application Services)** - Build and deployment pipeline
- **TypeScript** - Static type checking
- **ESLint** - Code quality and consistency

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │    │   ML Pipeline   │    │    Backend      │
│                 │    │                 │    │                 │
│ • React Native  │───▶│ • TensorFlow.js │───▶│ • Supabase      │
│ • Camera Input  │    │ • MediaPipe     │    │ • PostgreSQL    │
│ • UI Components │    │ • Face Mesh     │    │ • Authentication│
│ • State Mgmt    │    │ • Metrics Calc  │    │ • Data Storage  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

Before running AyuSetuXR, ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/geniusruler/AyuSetuXR.git
   cd AyuSetuXR/project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file with the required credentials:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   CLOUDFLARE_WORKER_URL=your_cloudflare_worker_url
   ```

4. **Set up the database**

   Run the migration script to set up the database schema:

   ```bash
   # Apply the migration to your Supabase project
   npx supabase db push
   ```

### Development

**Start the development server**

```bash
npx expo start
```

**Platform-specific commands**

```bash
# iOS Simulator
npx expo run:ios

# Android Emulator
npx expo run:android

# Web browser
npx expo start --web
```

### Building for Production

**Create a production build**

```bash
# For iOS
npx eas build --platform ios

# For Android
npx eas build --platform android

# For web
npm run build:web
```

## 📱 Usage Guide

### Initial Setup

1. **Create Account**: Sign up with email and password
2. **Camera Permissions**: Grant camera access for face detection
3. **Calibration**: Complete initial calibration for personalized baselines
4. **Start Session**: Begin your first cognitive assessment session

### Running a Session

1. **Position Device**: Hold device 12-18 inches from your face
2. **Ensure Good Lighting**: Use adequate front-facing light
3. **Stay Centered**: Keep face centered in the camera frame
4. **Follow Prompts**: Complete attention and reaction time tasks
5. **Review Results**: View detailed metrics and insights

### Understanding Metrics

| Metric               | Description                     | Range     | Interpretation                           |
| -------------------- | ------------------------------- | --------- | ---------------------------------------- |
| **Attention Score**  | Focus and concentration level   | 0-100     | Higher values indicate better focus      |
| **Reaction Time**    | Average response speed          | 150-800ms | Lower values indicate faster processing  |
| **Stress Proxy**     | Physiological stress indicators | 0-100     | Lower values indicate less stress        |
| **Fatigue Level**    | Mental tiredness assessment     | 0-100     | Lower values indicate less fatigue       |
| **Engagement Index** | Overall cognitive engagement    | 0-100     | Higher values indicate better engagement |

## 🔧 Configuration

### Camera Settings

The application automatically configures optimal camera settings:

- **Resolution**: 720p for optimal performance
- **Frame Rate**: 30 FPS for smooth detection
- **Format**: YUV420 for efficient processing

### ML Model Configuration

Face mesh detection is configured for:

- **Maximum Faces**: 1 (optimized for single user)
- **Landmark Points**: 468 high-precision points
- **Refinement**: Enabled for iris and lip landmarks
- **Real-time Processing**: Optimized for mobile devices

## 🗄️ Database Schema

### Core Tables

**profiles**

- User account information and preferences
- Links to authentication system

**sessions**

- Individual assessment sessions
- Tracks start/end times and device information

**metrics**

- Real-time cognitive measurements
- Time-series data for trend analysis

**summaries**

- Aggregated session statistics
- Performance insights and trends

### Data Flow

```sql
profiles (1) ──── (many) sessions (1) ──── (many) metrics
                                   └──── (1) summaries
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Categories

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: Service and API integration testing
- **E2E Tests**: Full user workflow testing
- **Performance Tests**: ML model and camera performance testing

## 🚢 Deployment

### Expo Application Services (EAS)

AyuSetuXR uses EAS for streamlined deployment:

```bash
# Configure EAS
npx eas build:configure

# Create development build
npx eas build --profile development

# Create production build
npx eas build --profile production

# Submit to app stores
npx eas submit
```

### Environment Configuration

Different builds use different configurations:

- **Development**: Local Supabase instance, debug logging enabled
- **Preview**: Staging environment, performance monitoring
- **Production**: Production database, optimized builds

## 🤝 Contributing

We welcome contributions to AyuSetuXR! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow our coding standards
4. **Write tests**: Ensure adequate test coverage
5. **Run quality checks**: `npm run lint && npm run typecheck`
6. **Commit changes**: Use conventional commit messages
7. **Submit a pull request**: Provide detailed description

### Coding Standards

- **TypeScript**: Use strict type checking
- **ESLint**: Follow configured linting rules
- **Prettier**: Use consistent code formatting
- **Conventional Commits**: Use structured commit messages

### Areas for Contribution

- 🎨 **UI/UX Improvements**: Enhanced user experience and accessibility
- 🔬 **ML Algorithms**: Advanced cognitive assessment techniques
- 📊 **Data Visualization**: Better analytics and reporting features
- 🔐 **Security**: Privacy and security enhancements
- 📱 **Platform Support**: Additional platform integrations
- 🧪 **Testing**: Expanded test coverage and quality assurance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♀️ Support

### Documentation

- **API Documentation**: Available in the `/docs` directory
- **Component Library**: Storybook documentation for UI components
- **Architecture Guide**: Detailed system design documentation

### Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and community support
- **Email**: Contact the maintainers directly

### Frequently Asked Questions

**Q: Is my facial data stored or transmitted?**
A: No. All face analysis is performed locally on your device. Only anonymized metrics are stored in our secure database.

**Q: What devices are supported?**
A: AyuSetuXR supports iOS 12+, Android 8.0+, and modern web browsers with camera access.

**Q: How accurate are the cognitive assessments?**
A: Our algorithms are based on peer-reviewed research and provide reliable indicators. However, this is not a medical diagnostic tool.

**Q: Can I use AyuSetuXR offline?**
A: Core assessment functionality works offline. Data synchronization requires internet connectivity.

---

<div align="center">

**Built with ❤️ for cognitive wellness**

[Website](https://ayusetuxr.com) • [Documentation](https://docs.ayusetuxr.com) • [Support](https://github.com/geniusruler/AyuSetuXR/discussions)

</div>
