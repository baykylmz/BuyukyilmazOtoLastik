# Changelog

All notable changes to the Büyükyılmaz Oto Lastik Management System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-08-15

### 🎨 Enhanced
- **Complete Color Palette Redesign**
  - Brand primary color changed to professional automotive blue (#0056D2 light, #3B82F6 dark)
  - Accent color updated to teal (#00B894 light, #34D399 dark) for CTAs
  - Neutral text colors optimized for high readability
  - All color combinations now meet WCAG AA accessibility standards
  - Semantic color tokens implemented using CSS variables

### 🔧 Fixed
- **Route Protection & Access Control**
  - Fixed customer routing to admin-only pages
  - Changed `/tires` and `/qr-scanner` routes to use `AdminRoute` instead of `PrivateRoute`
  - Customers now properly redirected to `/vehicles` instead of `/tires`
  - Added proper role-based access control for all admin features

### 🗑️ Removed
- **CTA Banner Section**
  - Removed "Call Now for Fast Support" banner from public homepage
  - Cleaned up related i18n keys and components

### 🎯 Improved
- **Component Styling**
  - Enhanced button styles with hover states and subtle shadows
  - Improved card components with appropriate depth and borders
  - Better focus states and accessibility for form elements
  - Consistent styling across light and dark themes

### 🐛 Bug Fixes
- **Customer Authentication Flow**
  - Fixed unauthorized access errors for customer users
  - Proper role detection and navigation based on user type
  - Debug logging added to Navigation component for troubleshooting

### 📚 Documentation
- **Updated README.md**
  - Added Design System section with color palette details
  - Updated feature status to reflect recent improvements
  - Enhanced tech stack descriptions
  - Added WCAG compliance information

## [1.0.0] - 2025-08-07

### ✨ Added
- Initial release of Büyükyılmaz Oto Lastik Management System
- JWT-based authentication with dual-user roles (Admin/Customer)
- Complete tire inventory management with QR codes
- Customer and vehicle management systems
- Appointment booking system
- Service catalog management
- Stock tracking with change logging
- Internationalization (Turkish/English)
- Dark/Light theme switching
- Docker containerization
- PostgreSQL database with Prisma ORM
- Swagger API documentation

### 🔐 Security
- Role-based access control
- Protected API endpoints
- Secure password hashing
- CORS protection
- Input validation with Zod

### 🎨 UI/UX
- Responsive design for all devices
- Modern React 18 with TypeScript
- Tailwind CSS styling
- Form validation and error handling
- Loading states and user feedback

---

## Version History

- **1.0.0** - Initial release with core functionality
- **Unreleased** - Enhanced color palette, route protection fixes, and UI improvements

## Contributing

When contributing to this project, please update this changelog with your changes following the established format.
