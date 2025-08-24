import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('123456', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create sample customer users
  const customerPassword = await bcrypt.hash('123456', 12);
  const customer1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      password: customerPassword,
      name: 'John Doe',
      phone: '+90 555 123 4567',
      address: '123 Main Street, Istanbul',
      role: 'CUSTOMER',
    },
  });

  const customer2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      email: 'jane.smith@example.com',
      password: customerPassword,
      name: 'Jane Smith',
      phone: '+90 555 987 6543',
      address: '456 Oak Avenue, Ankara',
      role: 'CUSTOMER',
    },
  });

  // Create sample tires
  const tires = await Promise.all([
    prisma.tire.create({
      data: {
        name: 'Michelin Pilot Sport 4',
        brand: 'Michelin',
        size: '205/55R16',
        season: 'SUMMER',
        price: 2500.00,
        description: 'High-performance summer tire for passenger cars',
        stockQuantity: 20,
        imageURL: 'https://example.com/michelin-pilot-sport-4.jpg',
      },
    }),
    prisma.tire.create({
      data: {
        name: 'Bridgestone Blizzak',
        brand: 'Bridgestone',
        size: '215/65R16',
        season: 'WINTER',
        price: 2800.00,
        description: 'Premium winter tire for all-season performance',
        stockQuantity: 15,
        imageURL: 'https://example.com/bridgestone-blizzak.jpg',
      },
    }),
    prisma.tire.create({
      data: {
        name: 'Continental AllSeasonContact',
        brand: 'Continental',
        size: '225/45R17',
        season: 'ALL_SEASON',
        price: 2200.00,
        description: 'Versatile all-season tire for year-round use',
        stockQuantity: 25,
        imageURL: 'https://example.com/continental-allseason.jpg',
      },
    }),
  ]);

  // Create sample services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Tire Mounting and Balancing',
        description: 'Professional tire mounting and balancing service',
        price: 150.00,
        durationMinutes: 60,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Wheel Alignment',
        description: 'Precise wheel alignment service',
        price: 200.00,
        durationMinutes: 90,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Tire Rotation',
        description: 'Regular tire rotation service',
        price: 100.00,
        durationMinutes: 45,
      },
    }),
  ]);

  // Create sample vehicles for customers
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        licensePlate: '34 ABC 123',
        userId: customer1.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        licensePlate: '06 XYZ 789',
        userId: customer1.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        make: 'Ford',
        model: 'Focus',
        year: 2019,
        licensePlate: '35 DEF 456',
        userId: customer2.id,
      },
    }),
  ]);

  // Create sample appointments for customers
  const appointments = await Promise.all([
    prisma.appointment.create({
      data: {
        serviceId: services[0].id, // Tire Mounting and Balancing
        userId: customer1.id,
        customerName: customer1.name,
        customerPhone: customer1.phone!,
        vehicleModel: 'Toyota Corolla 2020',
        preferredDateTime: new Date('2024-07-15T10:00:00Z'),
        notes: 'Front tires need replacement',
      },
    }),
    prisma.appointment.create({
      data: {
        serviceId: services[1].id, // Wheel Alignment
        userId: customer2.id,
        customerName: customer2.name,
        customerPhone: customer2.phone!,
        vehicleModel: 'Ford Focus 2019',
        preferredDateTime: new Date('2024-07-16T14:00:00Z'),
        notes: 'Steering feels off-center',
      },
    }),
  ]);

  console.log('Database has been seeded. 🌱');
  console.log('Admin user created:', admin.email);
  console.log('Customer users created:', customer1.email, customer2.email);
  console.log('Sample tires created:', tires.length);
  console.log('Sample services created:', services.length);
  console.log('Sample vehicles created:', vehicles.length);
  console.log('Sample appointments created:', appointments.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 