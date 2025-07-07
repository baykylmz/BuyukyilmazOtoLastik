#!/bin/bash

# Büyükyılmaz Oto Lastik Setup Script
# This script helps set up the development environment

set -e

echo "🚀 Setting up Büyükyılmaz Oto Lastik..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created. Please edit it with your configuration."
    echo "⚠️  IMPORTANT: Change the JWT_SECRET in .env before starting the application!"
else
    echo "✅ .env file already exists."
fi

# Generate a secure JWT secret if not already set
if grep -q "your-super-secure-jwt-secret-key-here" .env; then
    echo "🔐 Generating secure JWT secret..."
    SECRET=$(openssl rand -base64 32)
    sed -i.bak "s/your-super-secure-jwt-secret-key-here/$SECRET/g" .env
    echo "✅ JWT secret generated and updated in .env"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Review and edit .env file if needed"
echo "2. Run 'docker-compose up' to start the application"
echo "3. Access the application at http://localhost:3000"
echo "4. Login with default credentials: admin@gmail.com / 123"
echo "5. CHANGE THE DEFAULT CREDENTIALS IMMEDIATELY!"
echo ""
echo "For more information, see README.md and SECURITY.md" 