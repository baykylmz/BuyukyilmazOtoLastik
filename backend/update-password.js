const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function updatePassword() {
  try {
    const newPassword = '123456';
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    const updatedUser = await prisma.user.update({
      where: { email: 'admin@gmail.com' },
      data: { password: hashedPassword }
    });

    console.log('Password updated successfully for:', updatedUser.email);
    
    // Verify the new password works
    const isMatch = await bcrypt.compare(newPassword, updatedUser.password);
    console.log('New password verification:', isMatch);
    
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePassword(); 