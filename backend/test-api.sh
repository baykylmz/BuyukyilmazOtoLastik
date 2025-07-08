#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚗 Büyükyılmaz Oto Lastik API Tests${NC}"
echo "=================================="

# Check if backend is running
echo -e "\n${BLUE}Checking backend status...${NC}"
if curl -s http://localhost:4000/health > /dev/null; then
    echo -e "${GREEN}✅ Backend is running${NC}"
else
    echo -e "${RED}❌ Backend is not running. Please start the backend first.${NC}"
    exit 1
fi

# Customer login
echo -e "\n${YELLOW}1. Customer Login${NC}"
CUSTOMER_RESPONSE=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john.doe@example.com", "password": "123456"}')

CUSTOMER_TOKEN=$(echo $CUSTOMER_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -n "$CUSTOMER_TOKEN" ]; then
    echo -e "${GREEN}✅ Customer login successful${NC}"
    echo "Token: ${CUSTOMER_TOKEN:0:20}..."
else
    echo -e "${RED}❌ Customer login failed${NC}"
    echo "Response: $CUSTOMER_RESPONSE"
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
    echo "Token: ${ADMIN_TOKEN:0:20}..."
else
    echo -e "${RED}❌ Admin login failed${NC}"
    echo "Response: $ADMIN_RESPONSE"
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
    VEHICLE_ID=$(echo $VEHICLE_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "Vehicle ID: $VEHICLE_ID"
else
    echo -e "${RED}❌ Test vehicle creation failed${NC}"
    echo "Response: $VEHICLE_RESPONSE"
fi

# Get vehicles
echo "Getting vehicles..."
VEHICLES_RESPONSE=$(curl -s -X GET http://localhost:4000/api/customer/vehicles \
  -H "Authorization: Bearer $CUSTOMER_TOKEN")

if echo "$VEHICLES_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Vehicles retrieved${NC}"
    VEHICLE_COUNT=$(echo $VEHICLES_RESPONSE | grep -o '"id":"[^"]*"' | wc -l)
    echo "Total vehicles: $VEHICLE_COUNT"
else
    echo -e "${RED}❌ Failed to get vehicles${NC}"
    echo "Response: $VEHICLES_RESPONSE"
fi

# Test customer appointment endpoints
echo -e "\n${YELLOW}4. Testing Customer Appointment Endpoints${NC}"

# Create test appointment
echo "Creating test appointment..."
APPOINTMENT_RESPONSE=$(curl -s -X POST http://localhost:4000/api/customer/test/appointment \
  -H "Authorization: Bearer $CUSTOMER_TOKEN")

if echo "$APPOINTMENT_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Test appointment created${NC}"
    APPOINTMENT_ID=$(echo $APPOINTMENT_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "Appointment ID: $APPOINTMENT_ID"
else
    echo -e "${RED}❌ Test appointment creation failed${NC}"
    echo "Response: $APPOINTMENT_RESPONSE"
fi

# Get appointments
echo "Getting appointments..."
APPOINTMENTS_RESPONSE=$(curl -s -X GET http://localhost:4000/api/customer/appointments \
  -H "Authorization: Bearer $CUSTOMER_TOKEN")

if echo "$APPOINTMENTS_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Appointments retrieved${NC}"
    APPOINTMENT_COUNT=$(echo $APPOINTMENTS_RESPONSE | grep -o '"id":"[^"]*"' | wc -l)
    echo "Total appointments: $APPOINTMENT_COUNT"
else
    echo -e "${RED}❌ Failed to get appointments${NC}"
    echo "Response: $APPOINTMENTS_RESPONSE"
fi

# Test admin endpoints
echo -e "\n${YELLOW}5. Testing Admin Endpoints${NC}"

# Get tires
echo "Getting tires..."
TIRES_RESPONSE=$(curl -s -X GET http://localhost:4000/api/tires \
  -H "Authorization: Bearer $ADMIN_TOKEN")

if echo "$TIRES_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Tires retrieved${NC}"
    TIRE_COUNT=$(echo $TIRES_RESPONSE | grep -o '"id":"[^"]*"' | wc -l)
    echo "Total tires: $TIRE_COUNT"
else
    echo -e "${RED}❌ Failed to get tires${NC}"
    echo "Response: $TIRES_RESPONSE"
fi

# Get customers
echo "Getting customers..."
CUSTOMERS_RESPONSE=$(curl -s -X GET http://localhost:4000/api/customers \
  -H "Authorization: Bearer $ADMIN_TOKEN")

if echo "$CUSTOMERS_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Customers retrieved${NC}"
    CUSTOMER_COUNT=$(echo $CUSTOMERS_RESPONSE | grep -o '"id":"[^"]*"' | wc -l)
    echo "Total customers: $CUSTOMER_COUNT"
else
    echo -e "${RED}❌ Failed to get customers${NC}"
    echo "Response: $CUSTOMERS_RESPONSE"
fi

# Test unauthorized access
echo -e "\n${YELLOW}6. Testing Security (Unauthorized Access)${NC}"

# Try to access admin endpoint with customer token
echo "Testing customer access to admin endpoint..."
UNAUTHORIZED_RESPONSE=$(curl -s -X GET http://localhost:4000/api/tires \
  -H "Authorization: Bearer $CUSTOMER_TOKEN")

if echo "$UNAUTHORIZED_RESPONSE" | grep -q "permission\|Forbidden\|Unauthorized\|403\|401"; then
    echo -e "${GREEN}✅ Security working - Customer cannot access admin endpoint${NC}"
else
    echo -e "${RED}❌ Security issue - Customer can access admin endpoint${NC}"
    echo "Response: $UNAUTHORIZED_RESPONSE"
fi

# Test without token
echo "Testing access without token..."
NO_TOKEN_RESPONSE=$(curl -s -X GET http://localhost:4000/api/customer/vehicles)

if echo "$NO_TOKEN_RESPONSE" | grep -q "log in\|Unauthorized\|401"; then
    echo -e "${GREEN}✅ Security working - No token required${NC}"
else
    echo -e "${RED}❌ Security issue - No token required${NC}"
    echo "Response: $NO_TOKEN_RESPONSE"
fi

echo -e "\n${GREEN}🎉 All tests completed!${NC}"
echo -e "${YELLOW}Visit http://localhost:4000/api/docs for interactive API documentation${NC}"
echo -e "${BLUE}Customer Token: ${CUSTOMER_TOKEN:0:20}...${NC}"
echo -e "${BLUE}Admin Token: ${ADMIN_TOKEN:0:20}...${NC}" 