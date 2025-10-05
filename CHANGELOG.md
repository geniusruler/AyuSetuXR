# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Enhanced ML model accuracy improvements
- Additional cognitive metrics
- Export functionality for session data

### Changed

- Improved performance on lower-end devices
- Updated dependencies to latest versions

### Security

- Enhanced data encryption protocols
- Improved authentication flow

## [1.0.0] - 2025-01-04

### Added

- Initial release of AyuSetuXR
- Real-time cognitive assessment using computer vision
- Cross-platform support (iOS, Android, Web)
- User authentication and profile management
- Session tracking and management
- Comprehensive metrics dashboard
- Historical data analysis
- Dark/Light theme support
- Privacy-focused architecture with local ML processing
- Supabase integration for secure data storage
- TensorFlow.js integration for machine learning
- MediaPipe Face Mesh for facial landmark detection

### Features

- **Cognitive Metrics**

  - Attention score monitoring
  - Reaction time analysis
  - Stress level detection
  - Fatigue assessment
  - Engagement tracking
  - Blink rate analysis

- **User Experience**

  - Intuitive onboarding flow
  - Real-time visual feedback
  - Smooth animations with React Native Reanimated
  - Responsive design for all screen sizes
  - Accessibility compliance (WCAG 2.1 AA)

- **Data & Analytics**

  - Session summaries and insights
  - Historical trend analysis
  - Performance metrics visualization
  - Privacy-compliant data handling
  - Offline capability with sync

- **Technical Features**
  - TypeScript for type safety
  - Expo development platform
  - Row-level security for data protection
  - Real-time data synchronization
  - Cross-platform code sharing

### Security

- End-to-end encryption for data transmission
- Local ML processing (no facial data transmission)
- JWT-based authentication
- Row Level Security (RLS) database policies
- Secure credential storage

### Performance

- Optimized for 30 FPS real-time processing
- Memory-efficient ML operations
- Smooth 60 FPS UI animations
- Fast app startup times
- Efficient battery usage

---

## Version History

### Development Milestones

**Alpha Phase (Pre-1.0)**

- Core ML pipeline development
- Basic UI implementation
- Database schema design
- Authentication system setup

**Beta Phase (Pre-1.0)**

- Performance optimization
- Cross-platform testing
- Security audit and improvements
- User experience refinements

**Release Candidate**

- Production readiness testing
- Documentation completion
- Final security review
- App store preparation

---

## Contributing to Changelog

When contributing to AyuSetuXR, please follow these guidelines for updating the changelog:

1. **Add entries to [Unreleased]** section for new changes
2. **Use the standard categories**: Added, Changed, Deprecated, Removed, Fixed, Security
3. **Write clear, user-focused descriptions**
4. **Include issue/PR references** where applicable
5. **Move entries to versioned sections** upon release

### Example Entry Format

```markdown
### Added

- New cognitive metric for measuring focus duration (#123)
- Export feature for session data to CSV format (#124)

### Changed

- Improved ML model accuracy by 15% (#125)
- Updated navigation flow for better user experience (#126)

### Fixed

- Fixed camera permission handling on Android 13+ (#127)
- Resolved memory leak in ML processing pipeline (#128)

### Security

- Enhanced encryption for sensitive user data (#129)
```
