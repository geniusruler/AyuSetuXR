# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The AyuSetuXR team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

To report a security issue, please email security@ayusetuxr.com with:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (if available)

**Please do not report security vulnerabilities through public GitHub issues.**

### Response Timeline

- **Initial Response**: Within 48 hours of your report
- **Status Update**: Within 7 days with either a resolution or status update
- **Resolution**: Security fixes are prioritized and typically resolved within 30 days

### Security Measures

AyuSetuXR implements multiple layers of security:

#### Data Privacy

- **Local Processing**: Facial analysis performed entirely on-device
- **No Image Storage**: Facial images are never stored or transmitted
- **Anonymized Metrics**: Only computed metrics are stored, never raw biometric data
- **End-to-End Encryption**: All data transmission uses TLS 1.3

#### Authentication & Authorization

- **Supabase Auth**: Industry-standard authentication with JWT tokens
- **Row Level Security**: Database-level access control
- **Password Requirements**: Strong password policies enforced
- **Session Management**: Secure token handling and expiration

#### Infrastructure Security

- **Database Security**: PostgreSQL with RLS policies
- **API Security**: Rate limiting and input validation
- **Network Security**: Certificate pinning and secure connections
- **Audit Logging**: Comprehensive security event logging

### Security Best Practices for Contributors

When contributing to AyuSetuXR, please follow these security guidelines:

#### Code Security

- Never commit secrets, API keys, or credentials
- Use environment variables for configuration
- Validate all user inputs
- Follow secure coding practices
- Use TypeScript for type safety

#### Dependency Security

- Regularly update dependencies
- Use `npm audit` to check for vulnerabilities
- Avoid packages with known security issues
- Pin dependency versions in production

#### Mobile Security

- Implement proper certificate pinning
- Use secure storage for sensitive data
- Validate all external inputs
- Follow platform security guidelines

### Vulnerability Disclosure Process

1. **Report received**: We acknowledge receipt within 48 hours
2. **Initial assessment**: We perform initial vulnerability assessment
3. **Investigation**: Detailed investigation and impact assessment
4. **Fix development**: Develop and test security patches
5. **Disclosure**: Coordinated disclosure with reporter
6. **Release**: Security update released to users

### Security Updates

Security updates are released as soon as possible after verification. Users are notified through:

- In-app notifications for critical updates
- GitHub security advisories
- Release notes highlighting security fixes
- Email notifications for registered users (opt-in)

### Bug Bounty

While we don't currently have a formal bug bounty program, we deeply appreciate security researchers who help improve AyuSetuXR's security. We recognize contributions in:

- Public acknowledgments (with permission)
- Hall of fame for security contributors
- Potential consulting opportunities

### Security Contact

For security-related questions or concerns:

- **Email**: security@ayusetuxr.com
- **PGP Key**: Available upon request
- **Response Time**: Within 48 hours

### Compliance

AyuSetuXR is designed to comply with:

- **GDPR**: European data protection regulation
- **HIPAA**: Health information privacy (where applicable)
- **SOC 2**: Security and availability standards
- **Mobile Security**: iOS and Android security guidelines

---

Thank you for helping keep AyuSetuXR and our users safe!
