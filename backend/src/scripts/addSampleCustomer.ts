import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function addSampleCustomer() {
  try {
    console.log('Adding sample customer...');

    const customerData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '+90 212 555 0123',
      address: '123 Main Street, Istanbul',
      role: 'CUSTOMER' as const,
    };

    // Check if customer already exists
    const existingCustomer = await prisma.user.findUnique({
      where: { email: customerData.email },
    });

    if (existingCustomer) {
      console.log(`Customer already exists: ${customerData.email}`);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(customerData.password, 12);

    // Create customer
    const customer = await prisma.user.create({
      data: {
        name: customerData.name,
        email: customerData.email,
        password: hashedPassword,
        phone: customerData.phone,
        address: customerData.address,
        role: customerData.role,
      },
    });

    console.log(`Sample customer created successfully!`);
    console.log(`Email: ${customer.email}`);
    console.log(`Password: ${customerData.password}`);
    console.log(`Role: ${customer.role}`);
  } catch (error) {
    console.error('Error adding sample customer:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addSampleCustomer();
