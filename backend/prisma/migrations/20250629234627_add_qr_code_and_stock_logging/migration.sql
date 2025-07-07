/*
  Warnings:

  - A unique constraint covering the columns `[preferredDateTime,locationId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[qrCodeId]` on the table `Tire` will be added. If there are existing duplicate values, this will fail.
  - The required column `qrCodeId` was added to the `Tire` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "locationId" TEXT;

-- Add qrCodeId column as optional first
ALTER TABLE "Tire" ADD COLUMN     "qrCodeId" TEXT;

-- Update existing records with unique UUIDs
UPDATE "Tire" SET "qrCodeId" = gen_random_uuid() WHERE "qrCodeId" IS NULL;

-- Now make it required and unique
ALTER TABLE "Tire" ALTER COLUMN "qrCodeId" SET NOT NULL;

-- CreateTable
CREATE TABLE "StockChangeLog" (
    "id" TEXT NOT NULL,
    "tireId" TEXT NOT NULL,
    "change" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockChangeLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_preferredDateTime_locationId_key" ON "Appointment"("preferredDateTime", "locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Tire_qrCodeId_key" ON "Tire"("qrCodeId");

-- AddForeignKey
ALTER TABLE "StockChangeLog" ADD CONSTRAINT "StockChangeLog_tireId_fkey" FOREIGN KEY ("tireId") REFERENCES "Tire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockChangeLog" ADD CONSTRAINT "StockChangeLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
