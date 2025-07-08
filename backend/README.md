# Büyükyılmaz Oto Lastik Backend API

A robust Node.js/Express backend API for the Büyükyılmaz Oto Lastik tire shop management system, featuring dual-user authentication, comprehensive CRUD operations, and Swagger documentation.

## 🚀 Features

### 🔐 Authentication & Security
- **JWT-based authentication** with dual-user roles (ADMIN, CUSTOMER)
- **Role-based access control** with middleware protection
- **Secure password hashing** using bcrypt
- **Input validation** with Zod schemas
- **CORS protection** and security headers
- **Environment-based configuration**

### 🛞 Tire Management
- Complete CRUD operations for tire inventory
- QR code generation and management
- Stock quantity tracking with change logging
- Season-based categorization (SUMMER, WINTER, ALL_SEASON)
- Advanced filtering and search capabilities

### 👥 Customer Management
- Customer profile management
- Vehicle association system
- Contact information tracking
- Address management

### 🚗 Vehicle Management
- Customer vehicle management (for customer users)
- Admin vehicle management (for admin users)
- Vehicle details and history tracking

### 📅 Appointment System
- Appointment booking and management
- Service integration
- Conflict detection and prevention
- Status tracking (PENDING, CONFIRMED, COMPLETED, CANCELLED)

### 🛠 Service Management
- Service catalog management
- Pricing and duration tracking
- Integration with appointment system

### 📊 Stock Management
- Real-time stock tracking
- Stock change logging with user attribution
- Historical change tracking

### 📚 API Documentation
- **Swagger/OpenAPI** interactive documentation
- Comprehensive endpoint documentation
- Request/response examples
- Authentication requirements

## 🛠 Tech Stack

- **Node.js** with Express framework
- **TypeScript** for type safety
- **Prisma** ORM with PostgreSQL
- **JWT** for authentication
- **Zod** for validation
- **bcrypt** for password hashing
- **Swagger/OpenAPI** for documentation
- **Winston** for logging
- **CORS** for cross-origin requests

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/           # Route controllers
│   │   ├── auth.controller.ts
│   │   ├── tire.controller.ts
│   │   ├── customer.controller.ts
│   │   ├── customerUser.controller.ts
│   │   └── service.controller.ts
│   ├── middleware/            # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.ts
│   │   └── validateRequest.ts
│   ├── routes/               # API routes
│   │   ├── auth.routes.ts
│   │   ├── tire.routes.ts
│   │   ├── customer.routes.ts
│   │   ├── customerUser.routes.ts
│   │   └── service.routes.ts
│   ├── validations/          # Zod validation schemas
│   │   ├── tire.validation.ts
│   │   ├── customer.validation.ts
│   │   ├── customerUser.validation.ts
│   │   └── service.validation.ts
│   ├── lib/                  # Shared utilities
│   │   └── prisma.ts         # Prisma client
│   ├── utils/                # Utility functions
│   │   └── logger.ts         # Winston logger
│   ├── scripts/              # Utility scripts
│   │   ├── addSampleCustomer.ts
│   │   ├── checkUsers.ts
│   │   └── addServices.ts
│   ├── swagger.ts            # Swagger/OpenAPI configuration
│   └── index.ts              # Main application file
├── prisma/                   # Prisma schema and migrations
│   ├── schema.prisma         # Database schema
│   ├── migrations/           # Database migrations
│   └── seed.ts               # Database seeding
├── Dockerfile.dev            # Development Dockerfile
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Docker (optional)

### Installation

1. **Clone and install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment setup**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials and JWT_SECRET
   ```

3. **Database setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up backend

# Or run backend only
docker build -f Dockerfile.dev -t backend-dev .
docker run -p 3001:3001 backend-dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

### Tires (Admin Only)
- `GET /api/tires` - Get all tires with filtering
- `POST /api/tires` - Create new tire
- `PUT /api/tires/:id` - Update tire
- `DELETE /api/tires/:id` - Delete tire
- `GET /api/tires/qr/:qrCodeId` - Get tire by QR code
- `POST /api/tires/:id/stock` - Update stock quantity

### Customers (Admin Only)
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Vehicles (Admin Only)
- `POST /api/customers/:customerId/vehicles` - Add vehicle to customer
- `PUT /api/customers/:customerId/vehicles/:vehicleId` - Update vehicle
- `DELETE /api/customers/:customerId/vehicles/:vehicleId` - Delete vehicle

### Customer Vehicles (Customer Users)
- `GET /api/customer/vehicles` - Get user's vehicles
- `POST /api/customer/vehicles` - Add new vehicle
- `PUT /api/customer/vehicles/:id` - Update vehicle
- `DELETE /api/customer/vehicles/:id` - Delete vehicle

### Customer Appointments (Customer Users)
- `GET /api/customer/appointments` - Get user's appointments
- `POST /api/customer/appointments` - Create new appointment
- `PUT /api/customer/appointments/:id` - Update appointment
- `DELETE /api/customer/appointments/:id` - Cancel appointment

### Services
- `GET /api/services` - Get all services (public)
- `POST /api/services` - Create new service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Swagger Documentation
- `GET /api/docs` - Interactive API documentation

## 🔐 Authentication

### JWT Token Format
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "role": "ADMIN|CUSTOMER"
}
```

### Authorization Header
```
Authorization: Bearer <jwt-token>
```

### Role-based Access
- **ADMIN**: Full access to all endpoints
- **CUSTOMER**: Access to personal vehicles and appointments

## 🗄️ Database Schema

### User
```sql
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
  "name" TEXT NOT NULL,
  "phone" TEXT,
  "address" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
```

### Tire
```sql
CREATE TABLE "Tire" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "brand" TEXT NOT NULL,
  "size" TEXT NOT NULL,
  "season" "Season" NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "imageURL" TEXT,
  "description" TEXT,
  "stockQuantity" INTEGER NOT NULL DEFAULT 0,
  "qrCodeId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Tire_pkey" PRIMARY KEY ("id")
);
```

### Service
```sql
CREATE TABLE "Service" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "durationMinutes" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
```

### Appointment
```sql
CREATE TABLE "Appointment" (
  "id" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "customerName" TEXT NOT NULL,
  "customerPhone" TEXT NOT NULL,
  "vehicleModel" TEXT NOT NULL,
  "preferredDateTime" TIMESTAMP(3) NOT NULL,
  "locationId" TEXT,
  "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);
```

## 🔧 Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/buyukyilmazotolastik"

# Authentication
JWT_SECRET="your-super-secure-jwt-secret-key-here"

# Server
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 📊 Validation Schemas

### Tire Validation
```typescript
const createTireSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    brand: z.string().min(1, 'Brand is required'),
    size: z.string().min(1, 'Size is required'),
    season: z.enum(['SUMMER', 'WINTER', 'ALL_SEASON']),
    price: z.number().positive('Price must be positive'),
    stockQuantity: z.number().int().min(0, 'Stock must be non-negative'),
    description: z.string().optional(),
    imageURL: z.string().url().optional(),
  }),
});
```

### Appointment Validation
```typescript
const createAppointmentSchema = z.object({
  body: z.object({
    serviceId: z.string().uuid('Invalid service ID'),
    customerName: z.string().min(1, 'Customer name is required'),
    customerPhone: z.string().min(1, 'Customer phone is required'),
    vehicleModel: z.string().min(1, 'Vehicle model is required'),
    preferredDateTime: z.string().datetime('Invalid date format'),
    notes: z.string().optional(),
  }),
});
```

## 🧪 Testing

### API Testing
```bash
# Test all endpoints
npm test

# Test specific endpoint
npm test -- --grep "tires"
```

### Database Testing
```bash
# Reset test database
npx prisma migrate reset

# Run seed script
npx prisma db seed
```

## 📚 Swagger Documentation

Access the interactive API documentation at:
```
http://localhost:3001/api/docs
```

Features:
- Interactive endpoint testing
- Request/response examples
- Authentication requirements
- Schema definitions
- Error responses

## 🔒 Security Features

### Input Validation
- All inputs validated with Zod schemas
- SQL injection prevention with Prisma
- XSS protection with proper escaping

### Authentication
- JWT token validation
- Role-based access control
- Secure password hashing with bcrypt

### CORS Protection
- Configurable CORS origins
- Proper headers for cross-origin requests

## 🐳 Docker

### Development
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]
```

### Production
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## 📈 Performance

### Database Optimization
- Prisma query optimization
- Proper indexing on frequently queried fields
- Connection pooling

### Caching
- Response caching for static data
- Database query result caching

### Monitoring
- Winston logging for debugging
- Performance metrics tracking
- Error monitoring and alerting

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET
- [ ] Configure HTTPS
- [ ] Set up database backups
- [ ] Configure monitoring
- [ ] Set up rate limiting
- [ ] Enable security headers

### Environment Variables for Production
```env
NODE_ENV=production
DATABASE_URL=your-production-database-url
JWT_SECRET=your-super-secure-production-jwt-secret
PORT=3001
CORS_ORIGIN=https://your-domain.com
```

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add proper error handling
3. Include validation schemas
4. Update Swagger documentation
5. Write meaningful commit messages
6. Test all endpoints before committing

## 📞 Support

For issues and questions:
- Check the Swagger documentation
- Review the logs for error details
- Create an issue in the repository

---

**Büyükyılmaz Oto Lastik Backend API** - Robust and secure backend for tire shop management system. 