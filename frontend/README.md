# Büyükyılmaz Oto Lastik Frontend

A modern React frontend application for the Büyükyılmaz Oto Lastik tire shop management system, featuring dual-user interfaces, internationalization, dark mode, and responsive design.

## 🚀 Features

### 🔐 Authentication & User Management
- **Dual-user system** with role-based interfaces
- **Admin Interface**: Tire management, customer management, QR scanner, services
- **Customer Interface**: Vehicle management, appointment booking
- **JWT-based authentication** with secure token storage
- **Login/Signup** with form validation

### 🛞 Tire Management (Admin Only)
- Complete CRUD operations for tire inventory
- QR code generation and display
- Stock quantity tracking with visual indicators
- Season-based filtering (Summer, Winter, All-Season)
- Advanced search and filtering capabilities
- Stock update modal with change logging

### 👥 Customer Management (Admin Only)
- Customer profile management
- Vehicle association system
- Contact information tracking
- Address management
- Customer search and filtering

### 🚗 Vehicle Management (Customer Users)
- Personal vehicle dashboard
- Add, edit, and delete vehicles
- Vehicle details (make, model, year, license plate)
- Vehicle history tracking

### 📅 Appointment System (Customer Users)
- Service booking interface
- Appointment scheduling with date/time picker
- Appointment history and status tracking
- Service selection with pricing display
- Appointment modification and cancellation

### 🛠 Service Management (Admin Only)
- Service catalog management
- Service pricing and duration display
- Integration with appointment system

### 📱 Modern UI/UX
- **Dark/Light Mode** - Complete theme switching with system preference detection
- **Internationalization** - Turkish and English support with language switcher
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Form Validation** - Real-time validation with visual feedback
- **Loading States** - User-friendly loading indicators and skeletons
- **Error Handling** - Comprehensive error messages and user feedback
- **Accessibility** - WCAG compliant with proper ARIA labels

### 🔍 QR Code System (Admin Only)
- QR code generation for tires
- Mobile-friendly QR scanner using device camera
- Real-time tire information display
- Stock information and change history

### 🌍 Internationalization
- **Turkish (tr)** - Default language
- **English (en)** - Secondary language
- **Language switcher** in navigation
- **Automatic language detection**
- **Complete translation coverage**

## 🛠 Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling with dark mode support
- **Axios** for API requests
- **React i18next** for internationalization
- **@yudiel/react-qr-scanner** for QR code scanning
- **Vite** for fast development and building
- **React Context** for state management

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Navigation.tsx     # Main navigation (role-based)
│   │   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   │   ├── LanguageSwitcher.tsx # Language switcher
│   │   └── LoginButton.tsx    # Login/logout button
│   ├── contexts/              # React contexts
│   │   ├── AuthContext.tsx    # Authentication context
│   │   └── ThemeContext.tsx   # Theme management
│   ├── pages/                 # Page components
│   │   ├── LoginPage.tsx      # Login/signup page
│   │   ├── PublicHomePage.tsx # Public landing page
│   │   ├── TireListPage.tsx   # Tire management (admin)
│   │   ├── UserListPage.tsx # User management (admin)
│   │   ├── QRScannerPage.tsx  # QR scanner (admin)
│   │   ├── CustomerVehiclePage.tsx # Vehicle management (customer)
│   │   └── CustomerAppointmentPage.tsx # Appointment management (customer)
│   ├── services/              # API service functions
│   │   ├── authService.ts     # Authentication API calls
│   │   ├── tireService.ts     # Tire management API calls
│   │   ├── userService.ts # User management API calls
│   │   └── appointmentService.ts # Appointment API calls
│   ├── types/                 # TypeScript type definitions
│   │   ├── tire.ts           # Tire-related types
│   │   ├── customer.ts       # Customer-related types
│   │   └── appointment.ts    # Appointment-related types
│   ├── locales/               # Translation files
│   │   ├── en.json           # English translations
│   │   └── tr.json           # Turkish translations
│   ├── styles/                # Global styles
│   │   └── index.css         # Tailwind CSS imports
│   ├── utils/                 # Utility functions
│   ├── i18n.ts               # Internationalization setup
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── routes.tsx            # Route definitions
├── public/                    # Static assets
├── Dockerfile.dev            # Development Dockerfile
├── package.json
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.ts            # Vite configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Backend API running (see backend README)

### Installation

1. **Clone and install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment setup**
   ```bash
   # Create .env file
   echo "VITE_API_URL=http://localhost:3001" > .env
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   ```
   http://localhost:3000
   ```

### Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up frontend

# Or run frontend only
docker build -f Dockerfile.dev -t frontend-dev .
docker run -p 3000:3000 frontend-dev
```

## 🎨 UI Components

### Navigation
- **Role-based navigation** - Different menus for admins and customers
- **Language switcher** - Easy language switching
- **Theme toggle** - Dark/light mode switching
- **Login/logout button** - Authentication status

### Forms
- **Validation feedback** - Real-time form validation
- **Loading states** - Visual feedback during API calls
- **Error handling** - User-friendly error messages
- **Success notifications** - Confirmation messages

### Tables
- **Sortable columns** - Click to sort data
- **Search functionality** - Filter data by text
- **Pagination** - Handle large datasets
- **Responsive design** - Works on all screen sizes

### Modals
- **Stock update modal** - Update tire stock quantities
- **Confirmation dialogs** - Delete confirmations
- **Form modals** - Create/edit forms

## 🌍 Internationalization

### Supported Languages
- **Turkish (tr)** - Default language
- **English (en)** - Secondary language

### Adding New Languages
1. Create new translation file in `src/locales/`
2. Add language to i18n configuration in `src/i18n.ts`
3. Update language switcher component

### Translation Structure
```json
{
  "common": {
    "loading": "Yükleniyor...",
    "error": "Hata",
    "success": "Başarılı",
    "save": "Kaydet",
    "cancel": "İptal",
    "delete": "Sil"
  },
  "auth": {
    "login": "Giriş Yap",
    "signup": "Kayıt Ol",
    "email": "E-posta",
    "password": "Şifre"
  }
}
```

## 🌙 Dark Mode

### Features
- **Automatic detection** - Follows system preference
- **Manual toggle** - User can override system preference
- **Persistent storage** - Remembers user choice
- **Consistent styling** - All components support both themes

### Implementation
```typescript
// Theme context provides theme state
const { theme, toggleTheme } = useTheme();

// CSS classes automatically applied
className="bg-white dark:bg-gray-900 text-black dark:text-white"
```

## 🔐 Authentication Flow

### Login Process
1. User enters credentials
2. Form validation
3. API call to backend
4. JWT token storage
5. Role-based navigation update
6. Redirect to appropriate dashboard

### Role-based Access
- **Admin users** see: Tires, Users, QR Scanner, Services
- **Customer users** see: Vehicles, Appointments

### Protected Routes
```typescript
// Route protection based on authentication and role
<PrivateRoute 
  element={<TireListPage />} 
  requiredRole="ADMIN" 
/>
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- All components designed for mobile first
- Progressive enhancement for larger screens
- Touch-friendly interactions

## 🎯 User Experience

### Loading States
- **Skeleton loaders** for content
- **Spinner indicators** for actions
- **Progress bars** for long operations

### Error Handling
- **User-friendly messages** in Turkish and English
- **Retry mechanisms** for failed requests
- **Graceful degradation** when services are unavailable

### Success Feedback
- **Toast notifications** for successful actions
- **Visual confirmation** for completed tasks
- **Automatic navigation** after successful operations

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_API_URL=http://localhost:3001

# Feature Flags
VITE_ENABLE_QR_SCANNER=true
VITE_ENABLE_DARK_MODE=true
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          // ... custom color palette
        }
      }
    }
  }
}
```

## 🧪 Testing

### Component Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### E2E Testing
```bash
# Run E2E tests
npm run test:e2e
```

## 📦 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Docker Production
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🚀 Performance Optimization

### Code Splitting
- **Route-based splitting** - Each page loads separately
- **Component lazy loading** - Heavy components loaded on demand
- **Dynamic imports** - Optimized bundle sizes

### Caching
- **Service worker** - Offline functionality
- **Browser caching** - Static assets caching
- **API response caching** - Reduce redundant requests

### Bundle Optimization
- **Tree shaking** - Remove unused code
- **Minification** - Compressed production builds
- **Gzip compression** - Smaller file sizes

## 🔒 Security

### XSS Prevention
- **Input sanitization** - All user inputs sanitized
- **Content Security Policy** - Prevent malicious scripts
- **HTTPS enforcement** - Secure communication

### Authentication Security
- **JWT token storage** - Secure localStorage usage
- **Token expiration** - Automatic logout on expiry
- **CSRF protection** - Cross-site request forgery prevention

## 📊 Analytics & Monitoring

### Error Tracking
- **Error boundaries** - Catch and handle React errors
- **Console logging** - Development debugging
- **User feedback** - Error reporting system

### Performance Monitoring
- **Core Web Vitals** - Page load performance
- **User interactions** - Click tracking
- **API response times** - Backend performance

## 🤝 Contributing

### Development Guidelines
1. **TypeScript first** - Always use TypeScript
2. **Component structure** - Follow existing patterns
3. **Internationalization** - Add translations for new text
4. **Dark mode support** - Ensure components work in both themes
5. **Responsive design** - Test on all screen sizes
6. **Accessibility** - Follow WCAG guidelines

### Code Style
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript strict mode** - Type safety

## 📞 Support

For issues and questions:
- Check the browser console for errors
- Review the network tab for API issues
- Create an issue in the repository

---

**Büyükyılmaz Oto Lastik Frontend** - Modern, responsive, and accessible frontend for tire shop management system. 