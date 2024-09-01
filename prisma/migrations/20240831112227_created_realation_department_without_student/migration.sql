/*
  Warnings:

  - You are about to drop the column `studentId` on the `department` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `department` DROP FOREIGN KEY `Department_studentId_fkey`;

-- AlterTable
ALTER TABLE `department` DROP COLUMN `studentId`;
