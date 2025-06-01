# Büyükyılmaz Oto Lastik Web Application

A modern, modular web application for Büyükyılmaz Oto Lastik tire shop, built with React, Node.js, and PostgreSQL.

## Project Structure

```
.
├── frontend/           # React + TypeScript frontend
├── backend/           # Node.js + Express backend
├── docker/            # Docker configuration files
└── docs/             # Project documentation
```

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- Docker and Docker Compose (for containerized deployment)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/buyukyilmaz-oto-lastik.git
   cd buyukyilmaz-oto-lastik
   ```

2. Set up environment variables:
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Frontend
   cp frontend/.env.example frontend/.env
   ```

3. Start the development environment:
   ```bash
   # Using Docker (recommended)
   docker-compose up -d

   # Or manually:
   # Terminal 1 (Backend)
   cd backend
   npm install
   npm run dev

   # Terminal 2 (Frontend)
   cd frontend
   npm install
   npm start
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - API Documentation: http://localhost:4000/api/docs

## Development

### Frontend

The frontend is built with:
- React 18
- TypeScript
- Tailwind CSS
- React Router
- React Query

Key features:
- Modular component architecture
- Responsive design
- Type-safe API integration
- State management with React Context

### Backend

The backend is built with:
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

Key features:
- RESTful API architecture
- JWT authentication
- Role-based access control
- Modular service structure

## Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## Deployment

1. Build the application:
   ```bash
   # Frontend
   cd frontend
   npm run build

   # Backend
   cd backend
   npm run build
   ```

2. Deploy using Docker:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is proprietary and confidential.

## Support

For support, please contact the development team. 