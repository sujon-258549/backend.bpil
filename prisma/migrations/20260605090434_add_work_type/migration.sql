/*
  Warnings:

  - You are about to drop the `_SubCategoryToWorkInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SubCategoryToWorkInfo" DROP CONSTRAINT "_SubCategoryToWorkInfo_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubCategoryToWorkInfo" DROP CONSTRAINT "_SubCategoryToWorkInfo_B_fkey";

-- AlterTable
ALTER TABLE "work_infos" ADD COLUMN     "workType" TEXT;

-- DropTable
DROP TABLE "_SubCategoryToWorkInfo";
