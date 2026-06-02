/*
  Warnings:

  - You are about to drop the column `branchId` on the `Designation` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `all_roles` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `folders` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subBranchId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `workType` on the `work_infos` table. All the data in the column will be lost.
  - You are about to drop the `_WorkInfoToWorkType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `branches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_branches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscription_earns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscription_plans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `work_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Designation" DROP CONSTRAINT "Designation_branchId_fkey";

-- DropForeignKey
ALTER TABLE "_WorkInfoToWorkType" DROP CONSTRAINT "_WorkInfoToWorkType_A_fkey";

-- DropForeignKey
ALTER TABLE "_WorkInfoToWorkType" DROP CONSTRAINT "_WorkInfoToWorkType_B_fkey";

-- DropForeignKey
ALTER TABLE "all_roles" DROP CONSTRAINT "all_roles_branchId_fkey";

-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_branchId_fkey";

-- DropForeignKey
ALTER TABLE "branches" DROP CONSTRAINT "branches_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_branchId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_branchId_fkey";

-- DropForeignKey
ALTER TABLE "departments" DROP CONSTRAINT "departments_branchId_fkey";

-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_branchId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_branchId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_userId_fkey";

-- DropForeignKey
ALTER TABLE "sub_branches" DROP CONSTRAINT "sub_branches_branchId_fkey";

-- DropForeignKey
ALTER TABLE "sub_branches" DROP CONSTRAINT "sub_branches_managerId_fkey";

-- DropForeignKey
ALTER TABLE "subscription_earns" DROP CONSTRAINT "subscription_earns_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "subscription_earns" DROP CONSTRAINT "subscription_earns_userId_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_branchId_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_planId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_branchId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_subBranchId_fkey";

-- DropForeignKey
ALTER TABLE "work_types" DROP CONSTRAINT "work_types_branchId_fkey";

-- AlterTable
ALTER TABLE "Designation" DROP COLUMN "branchId";

-- AlterTable
ALTER TABLE "all_roles" DROP COLUMN "branchId";

-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "branchId";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "branchId";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "branchId";

-- AlterTable
ALTER TABLE "departments" DROP COLUMN "branchId";

-- AlterTable
ALTER TABLE "folders" DROP COLUMN "branchId";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "branchId";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "branchId",
DROP COLUMN "subBranchId";

-- AlterTable
ALTER TABLE "work_infos" DROP COLUMN "workType";

-- DropTable
DROP TABLE "_WorkInfoToWorkType";

-- DropTable
DROP TABLE "branches";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "sub_branches";

-- DropTable
DROP TABLE "subscription_earns";

-- DropTable
DROP TABLE "subscription_plans";

-- DropTable
DROP TABLE "subscriptions";

-- DropTable
DROP TABLE "work_types";
