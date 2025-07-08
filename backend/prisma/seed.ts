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

  console.log('Database has been seeded. 🌱');
  console.log('Admin user created:', admin.email);
  console.log('Sample tires created:', tires.length);
  console.log('Sample services created:', services.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 