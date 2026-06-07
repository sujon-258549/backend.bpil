/*
  Warnings:

  - You are about to drop the column `coverImage` on the `blogs` table. All the data in the column will be lost.
  - The `category` column on the `blogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "coverImage",
ADD COLUMN     "coverImageId" TEXT,
ADD COLUMN     "thumbnailId" TEXT,
DROP COLUMN "category",
ADD COLUMN     "category" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "zoomFolderId" INTEGER;

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "zoomFileId" INTEGER;

-- CreateTable
CREATE TABLE "action_logs" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "recordId" TEXT,
    "previousState" JSONB,
    "newState" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "action_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "error_logs" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "route" TEXT,
    "method" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "error_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_logs" ADD CONSTRAINT "action_logs_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
