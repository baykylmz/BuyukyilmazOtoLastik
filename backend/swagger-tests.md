# Swagger API Tests for Büyükyılmaz Oto Lastik

## Access Swagger UI
Visit: http://localhost:4000/api/docs

## Authentication

### 1. Customer Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "123456"
  }'
```

### 2. Admin Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gmail.com",
    "password": "123456"
  }'
```

## Customer Vehicle Management

### 3. Get My Vehicles
```bash
curl -X GET http://localhost:4000/api/customer/vehicles \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN"
```

### 4. Add Vehicle
```bash
curl -X POST http://localhost:4000/api/customer/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -d '{
    "make": "Honda",
    "model": "Civic",
    "year": 2021,
    "licensePlate": "34 XYZ 789"
  }'
```

### 5. Update Vehicle
```bash
curl -X PUT http://localhost:4000/api/customer/vehicles/VEHICLE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -d '{
    "make": "Honda",
    "model": "Civic Type R",
    "year": 2022,
    "licensePlate": "34 XYZ 789"
  }'
```

### 6. Delete Vehicle
```bash
curl -X DELETE http://localhost:4000/api/customer/vehicles/VEHICLE_ID \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN"
```

### 7. Test Endpoint - Create Sample Vehicle
```bash
curl -X POST http://localhost:4000/api/customer/test/vehicle \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN"
```

## Customer Appointment Management

### 8. Get My Appointments
```bash
curl -X GET http://localhost:4000/api/customer/appointments \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN"
```

### 9. Create Appointment
```bash
curl -X POST http://localhost:4000/api/customer/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -d '{
    "serviceId": "123e4567-e89b-12d3-a456-426614174000",
    "customerName": "John Doe",
    "customerPhone": "+90 212 555 0123",
    "vehicleModel": "Toyota Corolla 2020",
    "preferredDateTime": "2024-01-15T10:00:00Z",
    "notes": "Need tire rotation and alignment"
  }'
```

### 10. Update Appointment
```bash
curl -X PUT http://localhost:4000/api/customer/appointments/APPOINTMENT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -d '{
    "preferredDateTime": "2024-01-16T14:00:00Z",
    "notes": "Updated notes"
  }'
```

### 11. Cancel Appointment
```bash
curl -X DELETE http://localhost:4000/api/customer/appointments/APPOINTMENT_ID \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN"
```

### 12. Test Endpoint - Create Sample Appointment
```bash
curl -X POST http://localhost:4000/api/customer/test/appointment \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN"
```

## Admin Tire Management

### 13. Get All Tires (Admin Only)
```bash
curl -X GET http://localhost:4000/api/tires \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 14. Add Tire (Admin Only)
```bash
curl -X POST http://localhost:4000/api/tires \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Michelin Pilot Sport 4",
    "brand": "Michelin",
    "size": "205/55R16",
    "season": "SUMMER",
    "price": 2500.00,
    "stockQuantity": 20,
    "description": "High-performance summer tire"
  }'
```

## Admin Customer Management

### 15. Get All Customers (Admin Only)
```bash
curl -X GET http://localhost:4000/api/customers \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 16. Add Customer (Admin Only)
```bash
curl -X POST http://localhost:4000/api/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "+90 212 555 0124",
    "address": "456 Oak Street, Istanbul"
  }'
```

## Test Script

Create a file called `test-api.sh` with the following content:

```bash
#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚗 Büyükyılmaz Oto Lastik API Tests${NC}"
echo "=================================="

# Customer login
echo -e "\n${YELLOW}1. Customer Login${NC}"
CUSTOMER_RESPONSE=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john.doe@example.com", "password": "123456"}')

CUSTOMER_TOKEN=$(echo $CUSTOMER_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -n "$CUSTOMER_TOKEN" ]; then
    echo -e "${GREEN}✅ Customer login successful${NC}"
else
    echo -e "${RED}❌ Customer login failed${NC}"
    exit 1
fi

# Admin login
echo -e "\n${YELLOW}2. Admin Login${NC}"
ADMIN_RESPONSE=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@gmail.com", "password": "123456"}')

ADMIN_TOKEN=$(echo $ADMIN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -n "$ADMIN_TOKEN" ]; then
    echo -e "${GREEN}✅ Admin login successful${NC}"
else
    echo -e "${RED}❌ Admin login failed${NC}"
    exit 1
fi

# Test customer vehicle endpoints
echo -e "\n${YELLOW}3. Testing Customer Vehicle Endpoints${NC}"

# Create test vehicle
echo "Creating test vehicle..."
VEHICLE_RESPONSE=$(curl -s -X POST http://localhost:4000/api/customer/test/vehicle \
  -H "Authorization: Bearer $CUSTOMER_TOKEN")

if echo "$VEHICLE_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Test vehicle created${NC}"
else
    echo -e "${RED}❌ Test vehicle creation failed${NC}"
fi

# Get vehicles
echo "Getting vehicles..."
VEHICLES_RESPONSE=$(curl -s -X GET http://localhost:4000/api/customer/vehicles \
  -H "Authorization: Bearer $CUSTOMER_TOKEN")

if echo "$VEHICLES_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Vehicles retrieved${NC}"
else
    echo -e "${RED}❌ Failed to get vehicles${NC}"
fi

# Test customer appointment endpoints
echo -e "\n${YELLOW}4. Testing Customer Appointment Endpoints${NC}"

# Create test appointment
echo "Creating test appointment..."
APPOINTMENT_RESPONSE=$(curl -s -X POST http://localhost:4000/api/customer/test/appointment \
  -H "Authorization: Bearer $CUSTOMER_TOKEN")

if echo "$APPOINTMENT_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Test appointment created${NC}"
else
    echo -e "${RED}❌ Test appointment creation failed${NC}"
fi

# Get appointments
echo "Getting appointments..."
APPOINTMENTS_RESPONSE=$(curl -s -X GET http://localhost:4000/api/customer/appointments \
  -H "Authorization: Bearer $CUSTOMER_TOKEN")

if echo "$APPOINTMENTS_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Appointments retrieved${NC}"
else
    echo -e "${RED}❌ Failed to get appointments${NC}"
fi

# Test admin endpoints
echo -e "\n${YELLOW}5. Testing Admin Endpoints${NC}"

# Get tires
echo "Getting tires..."
TIRES_RESPONSE=$(curl -s -X GET http://localhost:4000/api/tires \
  -H "Authorization: Bearer $ADMIN_TOKEN")

if echo "$TIRES_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Tires retrieved${NC}"
else
    echo -e "${RED}❌ Failed to get tires${NC}"
fi

# Get customers
echo "Getting customers..."
CUSTOMERS_RESPONSE=$(curl -s -X GET http://localhost:4000/api/customers \
  -H "Authorization: Bearer $ADMIN_TOKEN")

if echo "$CUSTOMERS_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Customers retrieved${NC}"
else
    echo -e "${RED}❌ Failed to get customers${NC}"
fi

echo -e "\n${GREEN}🎉 All tests completed!${NC}"
echo -e "${YELLOW}Visit http://localhost:4000/api/docs for interactive API documentation${NC}"
```

Make it executable and run:
```bash
chmod +x test-api.sh
./test-api.sh
```

## Swagger UI Features

1. **Interactive Documentation**: All endpoints are documented with request/response schemas
2. **Authentication**: Use the "Authorize" button to set your JWT token
3. **Try It Out**: Click "Try it out" on any endpoint to test it directly
4. **Response Examples**: See example responses for all endpoints
5. **Error Codes**: All possible error responses are documented

## Available Endpoints

### Customer Endpoints (Require CUSTOMER role)
- `GET /api/customer/vehicles` - Get my vehicles
- `POST /api/customer/vehicles` - Add vehicle
- `PUT /api/customer/vehicles/{id}` - Update vehicle
- `DELETE /api/customer/vehicles/{id}` - Delete vehicle
- `POST /api/customer/test/vehicle` - Create test vehicle
- `GET /api/customer/appointments` - Get my appointments
- `POST /api/customer/appointments` - Create appointment
- `PUT /api/customer/appointments/{id}` - Update appointment
- `DELETE /api/customer/appointments/{id}` - Cancel appointment
- `POST /api/customer/test/appointment` - Create test appointment

### Admin Endpoints (Require ADMIN role)
- `GET /api/tires` - Get all tires
- `POST /api/tires` - Add tire
- `PUT /api/tires/{id}` - Update tire
- `DELETE /api/tires/{id}` - Delete tire
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Add customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/signup` - Signup
- `POST /api/auth/logout` - Logout

## Test Credentials

### Customer
- Email: `john.doe@example.com`
- Password: `123456`

### Admin
- Email: `admin@gmail.com`
- Password: `123456` 