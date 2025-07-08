#!/bin/bash

# Docker Volume Management Script for Büyükyılmaz Oto Lastik
# This script helps manage Docker volumes for this specific project

set -e

PROJECT_NAME="buyukyilmaz"
VOLUME_NAME="${PROJECT_NAME}_postgres_data"

echo "🐳 Docker Volume Management for $PROJECT_NAME"
echo "=============================================="

case "${1:-help}" in
    "list")
        echo "📋 Project volumes:"
        docker volume ls --filter "name=$PROJECT_NAME"
        echo ""
        echo "📋 All volumes:"
        docker volume ls
        ;;
    "clean")
        echo "🧹 Cleaning up unused volumes..."
        docker volume prune -f
        echo "✅ Cleanup complete"
        ;;
    "remove")
        echo "🗑️  Removing project volume: $VOLUME_NAME"
        docker-compose down
        docker volume rm $VOLUME_NAME 2>/dev/null || echo "Volume $VOLUME_NAME not found or already removed"
        echo "✅ Project volume removed"
        ;;
    "backup")
        echo "💾 Creating backup of project volume..."
        BACKUP_FILE="${PROJECT_NAME}_backup_$(date +%Y%m%d_%H%M%S).tar"
        docker run --rm -v $VOLUME_NAME:/data -v $(pwd):/backup alpine tar czf /backup/$BACKUP_FILE -C /data .
        echo "✅ Backup created: $BACKUP_FILE"
        ;;
    "restore")
        if [ -z "$2" ]; then
            echo "❌ Please provide backup file name"
            echo "Usage: $0 restore <backup_file.tar>"
            exit 1
        fi
        echo "📥 Restoring from backup: $2"
        docker-compose down
        docker volume rm $VOLUME_NAME 2>/dev/null || true
        docker run --rm -v $VOLUME_NAME:/data -v $(pwd):/backup alpine tar xzf /backup/$2 -C /data
        echo "✅ Restore complete"
        ;;
    "info")
        echo "ℹ️  Project volume information:"
        docker volume inspect $VOLUME_NAME 2>/dev/null || echo "Volume $VOLUME_NAME not found"
        echo ""
        echo "📊 Volume usage:"
        docker system df -v | grep -A 10 "VOLUME"
        ;;
    "help"|*)
        echo "Usage: $0 <command>"
        echo ""
        echo "Commands:"
        echo "  list     - List project volumes and all volumes"
        echo "  clean    - Remove all unused volumes"
        echo "  remove   - Remove project volume (WARNING: This will delete all data!)"
        echo "  backup   - Create backup of project volume"
        echo "  restore  - Restore from backup file"
        echo "  info     - Show volume information and usage"
        echo "  help     - Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 list"
        echo "  $0 backup"
        echo "  $0 restore buyukyilmaz_backup_20250101_120000.tar"
        ;;
esac 