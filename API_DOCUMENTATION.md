# API Documentation

This document provides comprehensive API documentation for AyuSetuXR services and utilities.

## Table of Contents

- [Authentication Service](#authentication-service)
- [Metrics Service](#metrics-service)
- [Sessions Service](#sessions-service)
- [Summaries Service](#summaries-service)
- [Cognitive Metrics Computation](#cognitive-metrics-computation)
- [Database Schema](#database-schema)

## Authentication Service

### Overview

The authentication service handles user registration, login, logout, and session management using Supabase Auth.

### Methods

#### `signUp(email: string, password: string, fullName: string)`

Creates a new user account.

**Parameters:**

- `email` (string): User's email address
- `password` (string): User's password (min 8 characters)
- `fullName` (string): User's display name

**Returns:**

```typescript
Promise<{
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}>;
```

**Example:**

```typescript
const { user, session, error } = await authService.signUp(
  "user@example.com",
  "securepassword",
  "John Doe"
);
```

#### `signIn(email: string, password: string)`

Authenticates a user with email and password.

**Parameters:**

- `email` (string): User's email address
- `password` (string): User's password

**Returns:**

```typescript
Promise<{
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}>;
```

#### `signOut()`

Signs out the current user.

**Returns:**

```typescript
Promise<{ error: AuthError | null }>;
```

#### `getCurrentUser()`

Gets the current authenticated user.

**Returns:**

```typescript
Promise<User | null>;
```

#### `resetPassword(email: string)`

Sends a password reset email.

**Parameters:**

- `email` (string): User's email address

**Returns:**

```typescript
Promise<{ error: AuthError | null }>;
```

## Metrics Service

### Overview

The metrics service handles real-time cognitive metric logging and retrieval.

### Types

```typescript
interface MetricData {
  sessionId: string;
  reactionTimeMean?: number;
  accuracyRate?: number;
  attentionScore?: number;
  blinkRate?: number;
  stressProxy?: number;
  fatigueProxy?: number;
  engagementIndex?: number;
}

interface Metric {
  id: string;
  session_id: string;
  timestamp: string;
  reaction_time_mean?: number;
  accuracy_rate?: number;
  attention_score?: number;
  blink_rate?: number;
  stress_proxy?: number;
  fatigue_proxy?: number;
  engagement_index?: number;
  created_at: string;
}
```

### Methods

#### `logMetric(data: MetricData)`

Logs a cognitive metric to the database.

**Parameters:**

- `data` (MetricData): Metric data to log

**Returns:**

```typescript
Promise<Metric>;
```

**Example:**

```typescript
const metric = await metricsService.logMetric({
  sessionId: "session-123",
  attentionScore: 85.5,
  reactionTimeMean: 245.2,
  blinkRate: 15.8,
});
```

#### `getSessionMetrics(sessionId: string)`

Retrieves all metrics for a specific session.

**Parameters:**

- `sessionId` (string): Session identifier

**Returns:**

```typescript
Promise<Metric[]>;
```

#### `deleteSessionMetrics(sessionId: string)`

Deletes all metrics for a session.

**Parameters:**

- `sessionId` (string): Session identifier

**Returns:**

```typescript
Promise<void>;
```

#### `calculateSessionAverages(sessionId: string)`

Calculates average values for all metrics in a session.

**Returns:**

```typescript
Promise<{
  avgReactionTime: number;
  avgAccuracy: number;
  avgAttention: number;
  avgBlinkRate: number;
  avgStress: number;
  avgFatigue: number;
  avgEngagement: number;
} | null>;
```

## Sessions Service

### Overview

Manages assessment session lifecycle and metadata.

### Types

```typescript
interface SessionData {
  userId: string;
  deviceInfo?: Record<string, any>;
  status?: "in_progress" | "completed" | "cancelled";
}

interface Session {
  id: string;
  user_id: string;
  start_time: string;
  end_time?: string;
  device_info?: Record<string, any>;
  status: string;
  created_at: string;
  updated_at: string;
}
```

### Methods

#### `createSession(data: SessionData)`

Creates a new assessment session.

**Parameters:**

- `data` (SessionData): Session configuration

**Returns:**

```typescript
Promise<Session>;
```

#### `endSession(sessionId: string, status?: string)`

Ends an active session.

**Parameters:**

- `sessionId` (string): Session identifier
- `status` (string, optional): Final session status

**Returns:**

```typescript
Promise<Session>;
```

#### `getUserSessions(userId: string)`

Gets all sessions for a user.

**Parameters:**

- `userId` (string): User identifier

**Returns:**

```typescript
Promise<Session[]>;
```

## Summaries Service

### Overview

Handles session summary generation and retrieval.

### Types

```typescript
interface SummaryData {
  sessionId: string;
  meanReactionTime?: number;
  accuracyOverall?: number;
  attentionPeak?: number;
  fatigueTrend?: string;
  stressTrend?: string;
  engagementTotal?: number;
}

interface Summary {
  id: string;
  session_id: string;
  mean_reaction_time?: number;
  accuracy_overall?: number;
  attention_peak?: number;
  fatigue_trend?: string;
  stress_trend?: string;
  engagement_total?: number;
  created_at: string;
  updated_at: string;
}
```

### Methods

#### `generateSummary(data: SummaryData)`

Creates a session summary.

**Parameters:**

- `data` (SummaryData): Summary data

**Returns:**

```typescript
Promise<Summary>;
```

#### `getSessionSummary(sessionId: string)`

Retrieves summary for a session.

**Parameters:**

- `sessionId` (string): Session identifier

**Returns:**

```typescript
Promise<Summary | null>;
```

## Cognitive Metrics Computation

### Overview

The `computeMetrics` utility analyzes facial landmarks to derive cognitive metrics.

### Input

```typescript
interface Landmark {
  x: number;
  y: number;
  z?: number;
}

type Landmarks = Landmark[]; // Array of 468 facial landmarks
```

### Output

```typescript
interface CognitiveMetrics {
  attentionScore: number; // 0-100, higher = better attention
  blinkRate: number; // blinks per minute
  gazeStability: number; // 0-100, higher = more stable
  fatigueIndicator: number; // 0-100, higher = more fatigued
  stressLevel: number; // 0-100, higher = more stressed
  engagementLevel: number; // 0-100, higher = more engaged
}
```

### Function

#### `computeMetrics(landmarks: Landmarks)`

Computes cognitive metrics from facial landmarks.

**Parameters:**

- `landmarks` (Landmarks): Array of 468 MediaPipe facial landmarks

**Returns:**

```typescript
CognitiveMetrics | null;
```

**Example:**

```typescript
// From camera frame analysis
const landmarks = await faceMeshModel.estimateFaces(imageData);
const metrics = computeMetrics(landmarks[0].scaledMesh);

if (metrics) {
  console.log(`Attention Score: ${metrics.attentionScore}`);
  console.log(`Blink Rate: ${metrics.blinkRate} bpm`);
}
```

### Algorithm Details

#### Attention Score Calculation

- Analyzes gaze direction stability
- Measures pupil dilation patterns
- Considers head pose variations
- Range: 0-100 (higher = better attention)

#### Blink Rate Analysis

- Tracks eyelid distance over time
- Detects blink events with temporal filtering
- Calculates rate per minute
- Typical range: 10-25 blinks per minute

#### Stress Level Detection

- Monitors micro-facial expressions
- Analyzes jaw tension patterns
- Considers breathing rhythm indicators
- Range: 0-100 (higher = more stress)

#### Fatigue Assessment

- Measures eyelid droop patterns
- Analyzes blink duration changes
- Considers overall facial muscle tension
- Range: 0-100 (higher = more fatigued)

## Database Schema

### Tables Overview

#### profiles

User account information and preferences.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### sessions

Assessment session records.

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  device_info JSONB,
  status TEXT NOT NULL DEFAULT 'in_progress',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### metrics

Real-time cognitive measurements.

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
```

#### summaries

Session summary statistics.

```sql
CREATE TABLE summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(id) UNIQUE,
  mean_reaction_time FLOAT,
  accuracy_overall FLOAT,
  attention_peak FLOAT,
  fatigue_trend TEXT,
  stress_trend TEXT,
  engagement_total FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)

All tables implement RLS policies to ensure users can only access their own data:

```sql
-- Example policy for sessions table
CREATE POLICY "Users can view own sessions" ON sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Error Handling

### Common Error Types

#### Authentication Errors

```typescript
// Invalid credentials
{ code: 'invalid_credentials', message: 'Invalid login credentials' }

// User already exists
{ code: 'user_already_registered', message: 'User already registered' }

// Weak password
{ code: 'weak_password', message: 'Password should be at least 8 characters' }
```

#### Database Errors

```typescript
// Connection error
{ code: 'connection_error', message: 'Unable to connect to database' }

// Constraint violation
{ code: 'constraint_violation', message: 'Data constraint violated' }

// Permission denied
{ code: 'permission_denied', message: 'Insufficient permissions' }
```

### Error Handling Best Practices

```typescript
try {
  const result = await metricsService.logMetric(data);
  return result;
} catch (error) {
  console.error("Failed to log metric:", error);

  // Handle specific error types
  if (error.code === "permission_denied") {
    // Redirect to login
  } else if (error.code === "connection_error") {
    // Show offline message
  }

  throw error;
}
```

## Rate Limits

### API Endpoints

- **Authentication**: 5 requests per minute per IP
- **Metrics Logging**: 60 requests per minute per user
- **Data Retrieval**: 100 requests per minute per user

### Client-Side Throttling

```typescript
// Throttle metric logging to avoid rate limits
const throttledLogMetric = throttle(metricsService.logMetric, 1000);
```

## Monitoring and Analytics

### Performance Metrics

The application tracks:

- API response times
- Database query performance
- ML model inference speed
- Memory usage patterns

### User Analytics

Privacy-compliant analytics include:

- Feature usage patterns
- Performance bottlenecks
- Error rates and types
- Session duration statistics

---

For more detailed information or questions, please refer to the [contributing guidelines](CONTRIBUTING.md) or open an issue on GitHub.
