/*
  Warnings:

  - You are about to drop the column `coordinatorId` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `picture` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Picture_coordinatorId_key` ON `picture`;

-- DropIndex
DROP INDEX `Picture_studentId_key` ON `picture`;

-- AlterTable
ALTER TABLE `picture` DROP COLUMN `coordinatorId`,
    DROP COLUMN `studentId`;
