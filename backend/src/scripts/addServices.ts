import prisma from '../lib/prisma';

async function addSampleServices() {
  try {
    console.log('Adding sample services...');

    const services = [
      {
        name: 'Tire Rotation',
        description: 'Rotate tires for even wear and extended tire life',
        price: 150.00,
        durationMinutes: 60,
      },
      {
        name: 'Tire Alignment',
        description: 'Align wheels for better handling and tire wear',
        price: 200.00,
        durationMinutes: 90,
      },
      {
        name: 'Tire Balancing',
        description: 'Balance tires to prevent vibration and uneven wear',
        price: 120.00,
        durationMinutes: 45,
      },
      {
        name: 'Tire Replacement',
        description: 'Replace old or damaged tires with new ones',
        price: 800.00,
        durationMinutes: 120,
      },
      {
        name: 'Brake Service',
        description: 'Inspect and service brake system',
        price: 300.00,
        durationMinutes: 90,
      },
      {
        name: 'Oil Change',
        description: 'Change engine oil and filter',
        price: 250.00,
        durationMinutes: 45,
      },
    ];

    for (const service of services) {
      const existingService = await prisma.service.findFirst({
        where: { name: service.name },
      });

      if (!existingService) {
        await prisma.service.create({
          data: service,
        });
        console.log(`Added service: ${service.name}`);
      } else {
        console.log(`Service already exists: ${service.name}`);
      }
    }

    console.log('Sample services added successfully!');
  } catch (error) {
    console.error('Error adding services:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addSampleServices(); 