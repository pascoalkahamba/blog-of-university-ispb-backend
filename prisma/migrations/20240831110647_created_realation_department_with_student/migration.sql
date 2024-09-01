/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `department` ADD COLUMN `studentId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Department_studentId_key` ON `Department`(`studentId`);

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
