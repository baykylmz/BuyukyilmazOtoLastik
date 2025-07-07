# Büyükyılmaz Oto Lastik Management System

A full-stack web application for managing a tire shop's inventory, customers, and services with modern features including QR code scanning, stock logging, and internationalization.

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication system
- Protected routes and middleware
- Secure password hashing
- Role-based access control
- Environment-based configuration for secrets
- CORS protection
- Input validation and sanitization

### 🛞 Tire Management
- Complete CRUD operations for tire inventory
- QR code generation and scanning for tires
- Stock quantity tracking with change logging
- Season-based categorization (Summer, Winter, All-Season)
- Image URL support for tire photos
- Advanced filtering and sorting

### 👥 Customer Management
- Customer profile management
- Vehicle association system
- Contact information tracking
- Address management

### 📱 Modern UI/UX
- **Dark/Light Mode** - Complete theme switching
- **Internationalization** - Turkish and English support
- **Responsive Design** - Works on all devices
- **Form Validation** - Visual indicators for required fields
- **Loading States** - User-friendly loading indicators
- **Error Handling** - Comprehensive error messages

### 🔍 QR Code System
- Generate QR codes for each tire
- Mobile-friendly QR scanner
- Real-time tire information lookup
- Stock change history tracking

### 📊 Stock Management
- Real-time stock quantity tracking
- Stock change logging with reasons
- User attribution for changes
- Low stock indicators

### 🐳 Containerization
- Docker Compose setup for easy deployment
- PostgreSQL database containerization
- Development and production configurations
- Volume persistence for data

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling with dark mode support
- **Axios** for API requests
- **React i18next** for internationalization
- **@yudiel/react-qr-scanner** for QR code scanning
- **Vite** for fast development and building

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Prisma** as ORM with PostgreSQL
- **JWT** for authentication
- **Zod** for validation
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

### Database
- **PostgreSQL** with Prisma migrations
- **Docker** containerization
- **Data seeding** for initial setup

### DevOps
- **Docker Compose** for orchestration
- **Environment-based configuration**
- **Volume persistence** for data

## 📁 Project Structure

```
BuyukyilmazOtoLastik/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Header.tsx      # Navigation header
│   │   │   ├── Navigation.tsx  # Main navigation
│   │   │   ├── QRCodeDisplay.tsx # QR code component
│   │   │   ├── StockUpdateModal.tsx # Stock update modal
│   │   │   └── ThemeToggle.tsx # Dark/light mode toggle
│   │   ├── contexts/           # React contexts
│   │   │   ├── AuthContext.tsx # Authentication context
│   │   │   └── ThemeContext.tsx # Theme management
│   │   ├── pages/              # Page components
│   │   │   ├── AuthPage.tsx    # Login/signup page
│   │   │   ├── TireListPage.tsx # Tire management
│   │   │   ├── CustomerListPage.tsx # Customer management
│   │   │   └── QRScannerPage.tsx # QR scanner page
│   │   ├── services/           # API service functions
│   │   ├── types/              # TypeScript type definitions
│   │   ├── locales/            # Translation files
│   │   │   ├── en.json         # English translations
│   │   │   └── tr.json         # Turkish translations
│   │   └── i18n.ts             # Internationalization setup
│   ├── Dockerfile.dev          # Development Dockerfile
│   └── package.json
│
├── backend/                     # Express backend application
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── tire.controller.ts
│   │   │   └── customer.controller.ts
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── validateRequest.ts
│   │   ├── routes/             # API routes
│   │   ├── validations/        # Zod validation schemas
│   │   └── lib/               # Shared utilities
│   ├── prisma/                # Prisma schema and migrations
│   │   ├── schema.prisma      # Database schema
│   │   ├── migrations/        # Database migrations
│   │   └── seed.ts            # Database seeding
│   ├── Dockerfile.dev         # Development Dockerfile
│   └── package.json
│
├── docker-compose.yml          # Docker Compose configuration
├── docker-compose.prod.yml     # Production configuration
└── README.md
```

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BuyukyilmazOtoLastik
   ```

2. **Configure environment variables**
   ```bash
   # Option 1: Use the automated setup script (recommended)
   ./setup.sh
   
   # Option 2: Manual setup
   # Copy the environment example file
   cp env.example .env
   
   # Edit .env and update the JWT_SECRET with a secure value
   # IMPORTANT: Change the default JWT_SECRET in production!
   ```

3. **Start the application**
   ```bash
   docker-compose up
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - Database: localhost:5432

5. **Login with default credentials**
   - Email: `admin@gmail.com`
   - Password: `123`
   
   **⚠️ SECURITY WARNING**: Change these default credentials immediately after first login!

### Development Setup (Without Docker)

1. **Prerequisites**
   - Node.js 18+ and npm
   - PostgreSQL database
   - Git

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Update .env with your database credentials and JWT_SECRET
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create .env file with VITE_API_URL=http://localhost:4000
   npm run dev
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb buyukyilmazotolastik
   
   # Or use the provided Docker database
   docker run --name postgres-dev -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=buyukyilmazotolastik -p 5432:5432 -d postgres:14-alpine
   ```

## 🔧 Environment Variables

### Root (.env) - For Docker Compose
```env
# PostgreSQL Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=buyukyilmaz

# JWT Configuration (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Frontend Configuration
VITE_API_URL=http://localhost:4000
```

**Note**: The `.env` file is already included in `.gitignore` to prevent accidentally committing sensitive information.

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/buyukyilmazotolastik"
JWT_SECRET="your-super-secure-jwt-secret-key-here"
PORT=4000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Tires
- `GET /api/tires` - Get all tires with filtering
- `POST /api/tires` - Create new tire
- `PUT /api/tires/:id` - Update tire
- `DELETE /api/tires/:id` - Delete tire
- `GET /api/tires/qr/:qrCodeId` - Get tire by QR code
- `POST /api/tires/:id/stock` - Update stock quantity

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Vehicles
- `POST /api/customers/:customerId/vehicles` - Add vehicle to customer
- `PUT /api/customers/:customerId/vehicles/:vehicleId` - Update vehicle
- `DELETE /api/customers/:customerId/vehicles/:vehicleId` - Delete vehicle

### Services (Schema exists, endpoints may not be implemented)
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Appointments (Schema exists, endpoints may not be implemented)
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Contact Messages (Schema exists, endpoints may not be implemented)
- `GET /api/contact-messages` - Get all contact messages
- `POST /api/contact-messages` - Create new contact message
- `DELETE /api/contact-messages/:id` - Delete contact message

## 🗄️ Data Models

### User
```typescript
{
  id: string
  email: string
  password: string (hashed)
  name: string
  role: 'ADMIN' | 'STAFF'
  createdAt: Date
  updatedAt: Date
}
```

### Tire
```typescript
{
  id: string
  name: string
  brand: string
  size: string
  season: 'SUMMER' | 'WINTER' | 'ALL_SEASON'
  price: number
  description?: string
  stockQuantity: number
  imageURL?: string
  qrCodeId: string
  stockChangeLogs: StockChangeLog[]
  createdAt: Date
  updatedAt: Date
}
```

### StockChangeLog
```typescript
{
  id: string
  tireId: string
  change: number
  reason: string
  userId: string
  user: User
  createdAt: Date
}
```

### Customer
```typescript
{
  id: string
  name: string
  email: string
  phone: string
  address?: string
  vehicles: Vehicle[]
  createdAt: Date
  updatedAt: Date
}
```

### Vehicle
```typescript
{
  id: string
  make: string
  model: string
  year: number
  licensePlate: string
  customerId: string
  customer: Customer
  createdAt: Date
  updatedAt: Date
}
```

### Service
```typescript
{
  id: string
  name: string
  description: string
  price: number
  durationMinutes: number
  createdAt: Date
  updatedAt: Date
}
```

### Appointment
```typescript
{
  id: string
  serviceId: string
  userId: string
  customerName: string
  customerPhone: string
  vehicleModel: string
  preferredDateTime: Date
  locationId?: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  notes?: string
  createdAt: Date
  updatedAt: Date
}
```

### ContactMessage
```typescript
{
  id: string
  name: string
  email: string
  subject: string
  message: string
  receivedAt: Date
}
```

## 🌍 Internationalization

The application supports multiple languages:
- **Turkish (tr)** - Default language
- **English (en)** - Secondary language

### Adding New Languages
1. Create new translation file in `frontend/src/locales/`
2. Add language to i18n configuration
3. Update language switcher component

## 🌙 Dark Mode

Complete dark/light mode support across all components:
- **Automatic theme detection** based on system preferences
- **Manual theme toggle** in navigation
- **Persistent theme selection** across sessions
- **Consistent styling** for all UI elements

## 📱 QR Code System

### Features
- **Automatic QR generation** for each tire
- **Mobile-friendly scanner** using device camera
- **Real-time data lookup** from QR codes
- **Stock information display** after scanning
- **Change history** for scanned tires

### Usage
1. Navigate to QR Scanner page
2. Point camera at tire QR code
3. View real-time tire information
4. Check stock change history

## 📊 Stock Management

### Features
- **Real-time stock tracking**
- **Change logging** with reasons and user attribution
- **Visual indicators** for stock levels
- **Stock update modal** with validation
- **Historical tracking** of all changes

### Stock Levels
- **High Stock**: > 10 units (Green)
- **Medium Stock**: 1-10 units (Yellow)
- **Out of Stock**: 0 units (Red)

## ✅ Validation Rules

### Tire Creation/Update
- `name`: Required, non-empty string
- `brand`: Required, non-empty string
- `size`: Required, non-empty string
- `season`: Required, must be one of: SUMMER, WINTER, ALL_SEASON
- `price`: Required, positive number
- `stockQuantity`: Required, non-negative integer
- `description`: Optional string
- `imageURL`: Optional string

### Customer Creation/Update
- `name`: Required, non-empty string
- `email`: Required, valid email format
- `phone`: Required, non-empty string
- `address`: Optional string

### Stock Update
- `change`: Required, integer (positive or negative)
- `reason`: Required, non-empty string

## 🐳 Docker Commands

### Development
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild images
docker-compose up --build

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Production
```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up -d

# Stop production
docker-compose -f docker-compose.prod.yml down
```

### Maintenance
```bash
# Clean up unused resources
docker system prune -a

# Remove unused volumes
docker volume prune

# View disk usage
docker system df
```

## 🔧 Development Guidelines

1. **TypeScript First** - Always use TypeScript for type safety
2. **Follow Structure** - Maintain the existing project structure
3. **Validation** - Use Zod for all validation schemas
4. **Error Handling** - Implement comprehensive error handling
5. **Internationalization** - Add translations for new features
6. **Dark Mode** - Ensure all new components support dark mode
7. **Testing** - Test API endpoints before committing
8. **Documentation** - Update documentation for new features

## 🔒 Security Considerations

### Production Deployment Security
1. **Change Default Credentials**: Immediately change the default admin credentials after first login
2. **Secure JWT Secret**: Use a strong, randomly generated JWT secret in production
3. **Environment Variables**: Never commit `.env` files to version control
4. **Database Security**: Use strong database passwords and restrict access
5. **HTTPS**: Always use HTTPS in production with valid SSL certificates
6. **Rate Limiting**: Implement rate limiting for API endpoints
7. **Input Validation**: All user inputs are validated using Zod schemas

### Security Checklist
- [ ] Change default admin credentials (`admin@gmail.com` / `123`)
- [ ] Set a strong JWT_SECRET environment variable
- [ ] Configure HTTPS for production
- [ ] Set up proper database access controls
- [ ] Implement rate limiting
- [ ] Regular security updates for dependencies

## 🐛 Common Issues and Solutions

### Database Issues
```bash
# Reset database
docker-compose down
docker volume rm buyukyilmazotolastik_postgres_data
docker-compose up

# Run migrations
docker-compose exec backend npx prisma migrate dev
```

### Authentication Issues
- Clear browser localStorage
- Check JWT token expiration
- Verify token in Authorization header
- Restart backend container

### CORS Issues
- Ensure backend CORS configuration matches frontend URL
- Check for proper headers in requests
- Verify environment variables

### Docker Issues
```bash
# Clean Docker cache
docker system prune -a

# Rebuild images
docker-compose up --build

# Check container logs
docker-compose logs [service-name]
```

## 🚀 Deployment

### Production Deployment
1. Set up production environment variables
2. Use production Docker Compose file
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Configure database backups

### Environment Variables for Production
```env
# Root .env
POSTGRES_USER=your-production-user
POSTGRES_PASSWORD=your-secure-production-password
POSTGRES_DB=buyukyilmaz_prod
JWT_SECRET=your-super-secure-production-jwt-secret
VITE_API_URL=https://your-domain.com/api

# Backend .env
NODE_ENV=production
DATABASE_URL=your-production-database-url
JWT_SECRET=your-super-secure-production-jwt-secret
PORT=4000
CORS_ORIGIN=https://your-domain.com
```

## 📈 Future Improvements

### Currently Implemented Features
- ✅ **Tire Management** - Complete CRUD with QR codes
- ✅ **Customer Management** - Customer profiles with vehicles
- ✅ **Stock Management** - Real-time tracking with logging
- ✅ **Authentication System** - JWT-based security
- ✅ **QR Code System** - Generation and scanning
- ✅ **Internationalization** - Turkish and English support
- ✅ **Dark/Light Mode** - Complete theme switching

### Schema Ready (Backend Only)
- 🔄 **Services** - Database schema exists, frontend not implemented
- 🔄 **Appointments** - Database schema exists, frontend not implemented  
- 🔄 **Contact Messages** - Database schema exists, frontend not implemented

### Planned Features
- [ ] **User Management System** - Admin panel for user management
- [ ] **Appointment Scheduling** - Customer appointment booking (schema ready)
- [ ] **Service Management** - Service catalog and pricing (schema ready)
- [ ] **Contact Form** - Customer contact message handling (schema ready)
- [ ] **Invoice Generation** - PDF invoice creation
- [ ] **Inventory Alerts** - Low stock notifications
- [ ] **Reporting & Analytics** - Sales and inventory reports
- [ ] **Customer Loyalty Program** - Points and rewards system
- [ ] **Real-time Notifications** - WebSocket notifications
- [ ] **Mobile App** - React Native mobile application
- [ ] **Barcode Support** - Barcode scanning in addition to QR
- [ ] **Advanced Search** - Full-text search capabilities
- [ ] **Data Export** - CSV/Excel export functionality
- [ ] **Backup System** - Automated database backups

### Technical Improvements
- [ ] **Unit Testing** - Jest and React Testing Library
- [ ] **E2E Testing** - Cypress or Playwright
- [ ] **CI/CD Pipeline** - GitHub Actions
- [ ] **Performance Optimization** - Code splitting and lazy loading
- [ ] **Security Enhancements** - Rate limiting, input sanitization
- [ ] **Monitoring** - Application performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow
1. Follow the existing code style
2. Add TypeScript types for new features
3. Include translations for new text
4. Test dark mode compatibility
5. Update documentation
6. Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Full-stack development and system architecture
- **Design**: UI/UX design and user experience
- **Testing**: Quality assurance and testing

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Büyükyılmaz Oto Lastik Management System** - Modern tire shop management solution with QR codes, stock tracking, and internationalization support. 