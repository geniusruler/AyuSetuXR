# AyuSetuXR Architecture Guide

This document provides a comprehensive overview of AyuSetuXR's system architecture, design patterns, and implementation details.

## 🏗️ System Overview

AyuSetuXR is built as a modern, cross-platform mobile application that leverages computer vision and machine learning for cognitive health assessment. The architecture follows a modular, scalable design with clear separation of concerns.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Application                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │     UI      │  │   Camera    │  │    Auth     │  │  State  │ │
│  │ Components  │  │   System    │  │   System    │  │  Mgmt   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                ML Processing Layer                          │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │ │
│  │  │ TensorFlow  │  │  MediaPipe  │  │   Cognitive Metrics │ │ │
│  │  │     .js     │  │  Face Mesh  │  │    Computation      │ │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                   Service Layer                             │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │ │
│  │  │  Metrics    │  │  Sessions   │  │     Summaries       │ │ │
│  │  │  Service    │  │   Service   │  │      Service        │ │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend Infrastructure                     │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                      Supabase                               │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │ │
│  │  │ PostgreSQL  │  │    Auth     │  │    Real-time        │ │ │
│  │  │  Database   │  │   Server    │  │   Subscriptions     │ │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 📱 Client Architecture

### Technology Stack

**Core Framework**

- **React Native 0.81.4**: Cross-platform mobile development
- **Expo SDK 54**: Development platform and build tools
- **TypeScript**: Type-safe development environment

**Navigation & Routing**

- **Expo Router**: File-based routing system
- **React Navigation**: Native navigation components

**State Management**

- **React Context**: Global state management
- **React Hooks**: Component-level state
- **AsyncStorage**: Persistent local storage

**UI & Animation**

- **React Native Reanimated**: Smooth animations
- **Linear Gradient**: Visual effects
- **Lucide Icons**: Consistent iconography

### Project Structure

```
project/
├── app/                          # Route components (Expo Router)
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── _layout.tsx          # Tab layout configuration
│   │   ├── index.tsx            # Dashboard/home screen
│   │   ├── start.tsx            # Start session screen
│   │   ├── history.tsx          # Session history
│   │   ├── insights.tsx         # Analytics dashboard
│   │   └── profile.tsx          # User profile
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Login screen
│   ├── register.tsx             # Registration screen
│   ├── calibration.tsx          # Device calibration
│   ├── session.tsx              # Active session
│   ├── results.tsx              # Session results
│   └── xr/                      # XR/AR features
│       └── index.tsx
├── components/                   # Reusable UI components
│   ├── BrainIllustration.tsx    # SVG brain visualization
│   ├── CameraFaceMesh.js        # Camera + ML integration
│   ├── CustomButton.tsx         # Themed button component
│   ├── CustomTextInput.tsx      # Themed input component
│   ├── MetricCard.tsx           # Metric display component
│   └── ...
├── services/                     # Business logic layer
│   ├── auth.ts                  # Authentication service
│   ├── metrics.ts               # Metrics management
│   ├── sessions.ts              # Session management
│   └── summaries.ts             # Summary generation
├── utils/                        # Helper functions
│   ├── computeMetrics.js        # ML computation algorithms
│   ├── validation.ts            # Form validation
│   └── responsive.ts            # Responsive design utilities
├── hooks/                        # Custom React hooks
│   ├── useCameraPermissions.js  # Camera permission handling
│   ├── useUserProfile.ts        # User data management
│   └── useFrameworkReady.ts     # App initialization
├── contexts/                     # React contexts
│   └── ThemeContext.tsx         # Theme management
├── constants/                    # App constants
│   ├── theme.ts                 # Design system
│   └── dimensions.ts            # Responsive breakpoints
└── lib/                         # External integrations
    ├── supabase.ts              # Supabase client
    └── database.types.ts        # Generated database types
```

## 🧠 Machine Learning Pipeline

### Face Detection & Analysis

The ML pipeline processes camera frames in real-time to extract cognitive metrics:

```javascript
// High-level ML processing flow
Camera Frame → MediaPipe Face Mesh → Landmark Extraction → Cognitive Analysis → Metrics
```

#### MediaPipe Integration

```javascript
// Face mesh model initialization
const model = await FaceMesh.load({
  maxFaces: 1, // Single face optimization
  refineLandmarks: true, // High-precision landmarks
  scoreThreshold: 0.5, // Detection confidence
});

// Real-time frame processing
const predictions = await model.estimateFaces(imageData);
const landmarks = predictions[0]?.scaledMesh;
```

#### Cognitive Metrics Computation

The `computeMetrics` algorithm analyzes 468 facial landmarks to derive cognitive indicators:

```javascript
export function computeMetrics(landmarks) {
  // 1. Eye Analysis
  const blinkRate = calculateBlinkRate(landmarks);
  const gazeDirection = extractGazeDirection(landmarks);

  // 2. Attention Assessment
  const attentionScore = computeAttentionLevel(gazeDirection, blinkRate);

  // 3. Stress Indicators
  const stressLevel = analyzeStressMarkers(landmarks);

  // 4. Fatigue Detection
  const fatigueLevel = assessFatigueIndicators(landmarks);

  return {
    attentionScore,
    blinkRate,
    stressLevel,
    fatigueLevel,
    engagementIndex: calculateEngagement(attentionScore, stressLevel),
  };
}
```

#### Performance Optimization

- **Frame Rate**: Optimized for 30 FPS processing
- **Memory Management**: Efficient tensor disposal
- **Threading**: Non-blocking UI during ML operations
- **Platform Adaptation**: iOS Metal / Android GPU acceleration

### Data Flow

```
Camera → Frame Buffer → TensorFlow.js → MediaPipe → Landmarks → Cognitive Metrics → Database
```

## 🔐 Authentication & Security

### Authentication Flow

AyuSetuXR uses Supabase Auth for secure user management:

```typescript
// Authentication service architecture
interface AuthService {
  signUp(
    email: string,
    password: string,
    fullName: string
  ): Promise<AuthResult>;
  signIn(email: string, password: string): Promise<AuthResult>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  resetPassword(email: string): Promise<void>;
}
```

### Security Measures

**Data Privacy**

- Face analysis performed locally on device
- No facial images stored or transmitted
- Only anonymized metrics saved to database
- GDPR-compliant data handling

**Database Security**

- Row Level Security (RLS) policies
- JWT token-based authentication
- Encrypted data transmission (HTTPS/WSS)
- Audit logging for sensitive operations

**Client Security**

- Secure credential storage (Keychain/Keystore)
- Certificate pinning for API calls
- Input validation and sanitization
- Protection against common attack vectors

## 🗄️ Data Architecture

### Database Design

The database schema is designed for optimal performance and scalability:

```sql
-- Core entity relationships
profiles (1) ──── (many) sessions (1) ──── (many) metrics
                                   └──── (1) summaries
```

#### Profiles Table

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Sessions Table

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  device_info JSONB,
  status session_status NOT NULL DEFAULT 'in_progress',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Metrics Table (Time Series)

```sql
CREATE TABLE metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(id),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reaction_time_mean FLOAT,
  accuracy_rate FLOAT,
  attention_score FLOAT,
  blink_rate FLOAT,
  stress_proxy FLOAT,
  fatigue_proxy FLOAT,
  engagement_index FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optimized for time-series queries
CREATE INDEX idx_metrics_session_time ON metrics(session_id, timestamp);
```

### Data Processing Pipeline

```
Real-time Metrics → Batch Processing → Session Summaries → Analytics Dashboard
```

**Real-time Processing**

- Continuous metric logging during sessions
- Live visualization updates
- Anomaly detection and alerts

**Batch Processing**

- End-of-session summary generation
- Trend analysis computation
- Performance insights derivation

## 🎨 UI/UX Architecture

### Design System

AyuSetuXR implements a comprehensive design system for consistency:

```typescript
// Theme configuration
interface Theme {
  colors: ColorPalette;
  typography: TypographyScale;
  spacing: SpacingScale;
  borderRadius: BorderRadiusScale;
  shadows: ShadowSystem;
}

// Responsive design system
interface ResponsiveSystem {
  breakpoints: DeviceBreakpoints;
  scaling: ScalingFactors;
  layout: LayoutConstants;
}
```

### Component Architecture

**Atomic Design Principles**

- **Atoms**: Basic UI elements (buttons, inputs, icons)
- **Molecules**: Component combinations (form fields, cards)
- **Organisms**: Complex UI sections (headers, dashboards)
- **Templates**: Page layouts and structure
- **Pages**: Complete screen implementations

### Accessibility

- **Screen Reader Support**: Comprehensive ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG 2.1 AA compliance
- **Dynamic Text**: Support for system font scaling
- **Voice Control**: iOS/Android voice command support

## 🔄 State Management

### Context Architecture

```typescript
// Global state contexts
interface AppContexts {
  theme: ThemeContext; // Dark/light mode, colors
  auth: AuthContext; // User authentication state
  session: SessionContext; // Active session state
  metrics: MetricsContext; // Real-time metrics data
}
```

### Data Flow Patterns

**Unidirectional Data Flow**

```
User Action → Service Call → State Update → UI Re-render
```

**Real-time Updates**

```
Database Change → Supabase Subscription → Context Update → Component Re-render
```

### Local Storage Strategy

- **Secure Storage**: Authentication tokens, sensitive preferences
- **AsyncStorage**: User preferences, cached data
- **In-Memory**: Temporary session data, real-time metrics
- **Database Sync**: Offline capability with sync on reconnection

## 🚀 Performance Architecture

### Optimization Strategies

**React Native Performance**

- Hermes JavaScript engine
- Fabric renderer (New Architecture)
- Turbo Modules for native integration
- Code splitting and lazy loading

**ML Performance**

- TensorFlow.js GPU acceleration
- Model quantization for mobile
- Frame rate optimization
- Memory management for continuous processing

**Database Performance**

- Connection pooling
- Query optimization
- Indexed time-series data
- Real-time subscription management

### Monitoring & Analytics

```typescript
// Performance monitoring
interface PerformanceMetrics {
  appStartTime: number;
  frameRate: number;
  memoryUsage: number;
  apiResponseTime: number;
  mlInferenceTime: number;
}
```

## 🌐 Cross-Platform Strategy

### Platform-Specific Implementations

**iOS Optimizations**

- Metal GPU acceleration for ML
- Core ML integration potential
- iOS-specific UI patterns
- Apple Health integration readiness

**Android Optimizations**

- Vulkan/OpenGL ES optimization
- Android ML Kit compatibility
- Material Design adherence
- Google Health integration readiness

**Web Platform**

- WebGL for ML processing
- Progressive Web App (PWA) features
- WebRTC for camera access
- Responsive web design

### Shared Code Architecture

```
├── shared/                 # Cross-platform code (95%)
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── contexts/
├── platform/              # Platform-specific code (5%)
│   ├── ios/
│   ├── android/
│   └── web/
```

## 📊 Analytics & Monitoring

### Application Monitoring

**Real-time Monitoring**

- Application performance metrics
- User interaction analytics
- Error tracking and reporting
- System resource utilization

**Privacy-Compliant Analytics**

- Anonymized usage patterns
- Performance bottleneck identification
- Feature adoption rates
- User journey analysis

### Health Metrics Analytics

**Individual Analytics**

- Personal cognitive trend analysis
- Performance improvement tracking
- Personalized insights generation
- Goal setting and achievement

**Population Analytics** (Anonymized)

- Cognitive health trend analysis
- Demographic pattern recognition
- Research data contribution
- Public health insights

## 🔮 Future Architecture Considerations

### Scalability Planning

**Horizontal Scaling**

- Microservices architecture transition
- Edge computing for ML processing
- CDN for global content delivery
- Database sharding strategies

**Advanced ML Integration**

- Federated learning implementation
- Custom model training pipelines
- Real-time model updates
- Multi-modal data fusion

### Emerging Technologies

**Extended Reality (XR)**

- AR overlay integration
- VR assessment environments
- Mixed reality interactions
- Spatial computing capabilities

**IoT Integration**

- Wearable device connectivity
- Environmental sensor data
- Multi-device synchronization
- Contextual health monitoring

---

This architecture guide provides the foundation for understanding AyuSetuXR's technical implementation. For specific implementation details, refer to the codebase and API documentation.
