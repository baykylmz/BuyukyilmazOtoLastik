# Security Guidelines for Büyükyılmaz Oto Lastik

## 🔒 Security Checklist

### Before First Deployment
- [ ] Change default admin credentials (`admin@gmail.com` / `123456`)
- [ ] Set a strong, randomly generated JWT_SECRET
- [ ] Configure HTTPS with valid SSL certificates
- [ ] Set up proper database access controls
- [ ] Review and update all environment variables
- [ ] Ensure `.env` files are not committed to version control

### Production Security
- [ ] Use strong database passwords
- [ ] Implement rate limiting for API endpoints
- [ ] Configure CORS properly for production domains
- [ ] Set up monitoring and logging
- [ ] Regular security updates for dependencies
- [ ] Backup strategy for database
- [ ] Implement proper error handling (no sensitive data in error messages)

### Ongoing Security
- [ ] Regular dependency updates
- [ ] Monitor for security vulnerabilities
- [ ] Review access logs
- [ ] Update SSL certificates before expiration
- [ ] Regular security audits

## 🚨 Critical Security Notes

### JWT Secret
- Must be at least 32 characters long
- Should be randomly generated
- Never share or commit to version control
- Example generation: `openssl rand -base64 32`

### Database Security
- Use strong, unique passwords
- Restrict database access to application servers only
- Regular backups with encryption
- Monitor for unusual access patterns

### API Security
- All endpoints are protected with JWT authentication
- Input validation using Zod schemas
- CORS protection enabled
- Rate limiting recommended for production

## 🔐 Access Control & Route Protection

### Role-Based Access Control (RBAC)
- **Admin Role**: Full access to all system features
  - Tire management (CRUD operations)
  - Customer management
  - QR scanner functionality
  - User management
  - Stock management
- **Customer Role**: Limited access to personal features only
  - Personal vehicle management
  - Appointment booking and management
  - No access to admin features

### Route Protection Implementation
```typescript
// Admin-only routes (AdminRoute)
- /tires - Tire inventory management
- /qr-scanner - QR code scanning
- /users - User management

// Customer routes (PrivateRoute)
- /vehicles - Personal vehicle management
- /appointments - Personal appointment management

// Public routes
- / - Public homepage
- /login - Authentication
```

### Security Features
- **AdminRoute**: Protects admin-only functionality
- **PrivateRoute**: Protects authenticated user functionality
- **Role Validation**: Server-side role verification on all protected endpoints
- **Unauthorized Handling**: Proper error messages and redirects for unauthorized access

## 🔧 Security Configuration

### Environment Variables
```bash
# Generate a secure JWT secret
JWT_SECRET=$(openssl rand -base64 32)

# Set secure database credentials
POSTGRES_PASSWORD=$(openssl rand -base64 16)
```

### CORS Configuration
```typescript
// Only allow specific origins in production
CORS_ORIGIN=https://your-domain.com
```

### Rate Limiting (Recommended)
```typescript
// Implement rate limiting for production
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## 📞 Security Contact

For security issues or questions:
- Create a private issue in the repository
- Contact the development team directly
- Do not post security issues publicly 