/*
  Warnings:

  - You are about to drop the column `activeDays` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `isRecomended` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_subscriptionId_fkey";

-- DropIndex
DROP INDEX "subscriptions_slug_key";

-- AlterTable
ALTER TABLE "all_roles" ADD COLUMN     "branchId" TEXT;

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "activeDays",
DROP COLUMN "description",
DROP COLUMN "discount",
DROP COLUMN "duration",
DROP COLUMN "featured",
DROP COLUMN "isRecomended",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "slug",
DROP COLUMN "status",
ADD COLUMN     "branchId" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "planId" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "subscriptionId",
ADD COLUMN     "designationId" TEXT,
ADD COLUMN     "forceReload" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Designation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT,
    "branchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Designation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "description" TEXT,
    "price" TEXT,
    "currency" TEXT DEFAULT 'BDT',
    "billingCycle" TEXT,
    "durationMonths" INTEGER,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isRecomended" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Designation_slug_key" ON "Designation"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_plans_slug_key" ON "subscription_plans"("slug");

-- AddForeignKey
ALTER TABLE "all_roles" ADD CONSTRAINT "all_roles_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "subscription_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
