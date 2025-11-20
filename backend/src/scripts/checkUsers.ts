import prisma from '../lib/prisma';

async function checkUsers() {
  try {
    console.log('Checking all users in the database...\n');

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        phone: true,
        address: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (users.length === 0) {
      console.log('No users found in the database.');
    } else {
      console.log(`Found ${users.length} user(s):\n`);

      users.forEach((user, index) => {
        console.log(`${index + 1}. User Details:`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Phone: ${user.phone || 'Not set'}`);
        console.log(`   Address: ${user.address || 'Not set'}`);
        console.log(`   Created: ${user.createdAt.toISOString()}`);
        console.log('');
      });
    }

    // Check customers specifically
    const customers = await prisma.user.findMany({
      where: {
        role: 'CUSTOMER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
      },
    });

    console.log(`\nCustomer users: ${customers.length}`);
    if (customers.length > 0) {
      customers.forEach((customer, index) => {
        console.log(`${index + 1}. ${customer.name} (${customer.email})`);
      });
    }
  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
