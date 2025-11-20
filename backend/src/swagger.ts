import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Büyükyılmaz Oto Lastik API',
      version: '1.0.0',
      description: 'API for tire shop management system',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'STAFF'],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Tire: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
              example: 'Michelin Pilot Sport 4',
            },
            brand: {
              type: 'string',
              example: 'Michelin',
            },
            size: {
              type: 'string',
              example: '205/55R16',
            },
            season: {
              type: 'string',
              enum: ['SUMMER', 'WINTER', 'ALL_SEASON'],
            },
            price: {
              type: 'number',
              example: 2500.0,
            },
            imageURL: {
              type: 'string',
              nullable: true,
            },
            description: {
              type: 'string',
              nullable: true,
            },
            stockQuantity: {
              type: 'integer',
              example: 20,
            },
            qrCodeId: {
              type: 'string',
              format: 'uuid',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Customer: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            phone: {
              type: 'string',
              example: '+90 212 555 0123',
            },
            address: {
              type: 'string',
              nullable: true,
              example: '123 Main Street, Istanbul',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
            vehicles: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Vehicle',
              },
            },
          },
        },
        Vehicle: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            make: {
              type: 'string',
              example: 'Toyota',
            },
            model: {
              type: 'string',
              example: 'Corolla',
            },
            year: {
              type: 'integer',
              example: 2020,
            },
            licensePlate: {
              type: 'string',
              example: '34 ABC 123',
            },
            customerId: {
              type: 'string',
              format: 'uuid',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        StockChangeLog: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            tireId: {
              type: 'string',
              format: 'uuid',
            },
            change: {
              type: 'integer',
              description: 'Positive for additions, negative for reductions',
              example: 5,
            },
            reason: {
              type: 'string',
              example: 'New shipment received',
            },
            userId: {
              type: 'string',
              format: 'uuid',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        Appointment: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            serviceId: {
              type: 'string',
              format: 'uuid',
            },
            userId: {
              type: 'string',
              format: 'uuid',
            },
            customerName: {
              type: 'string',
              example: 'John Doe',
            },
            customerPhone: {
              type: 'string',
              example: '+90 212 555 0123',
            },
            vehicleModel: {
              type: 'string',
              example: 'Toyota Corolla 2020',
            },
            preferredDateTime: {
              type: 'string',
              format: 'date-time',
            },
            locationId: {
              type: 'string',
              format: 'uuid',
              nullable: true,
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
            },
            notes: {
              type: 'string',
              nullable: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
            service: {
              $ref: '#/components/schemas/Service',
            },
          },
        },
        Service: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
              example: 'Tire Rotation',
            },
            description: {
              type: 'string',
              example: 'Rotate tires for even wear',
            },
            price: {
              type: 'number',
              example: 150.0,
            },
            durationMinutes: {
              type: 'integer',
              example: 60,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints',
      },
      {
        name: 'Tires',
        description: 'Tire management endpoints',
      },
      {
        name: 'Customers',
        description: 'Customer management endpoints',
      },
      {
        name: 'Vehicles',
        description: 'Vehicle management endpoints',
      },
      {
        name: 'Customer Vehicles',
        description: 'Customer vehicle management endpoints',
      },
      {
        name: 'Customer Appointments',
        description: 'Customer appointment management endpoints',
      },
      {
        name: 'Services',
        description: 'Service management endpoints',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
