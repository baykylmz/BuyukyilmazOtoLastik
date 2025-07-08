const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function checkUser() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@gmail.com' }
    });

    if (user) {
      console.log('User found:');
      console.log('Email:', user.email);
      console.log('Name:', user.name);
      console.log('Role:', user.role);
      console.log('Password hash:', user.password);
      console.log('Password hash length:', user.password.length);
      
      // Test password comparison
      const testPassword = '123456';
      const isMatch = await bcrypt.compare(testPassword, user.password);
      console.log('Password "123456" matches:', isMatch);
      
      // Test with old password
      const oldPassword = '123';
      const isOldMatch = await bcrypt.compare(oldPassword, user.password);
      console.log('Password "123" matches:', isOldMatch);
    } else {
      console.log('No user found with email admin@gmail.com');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser(); 