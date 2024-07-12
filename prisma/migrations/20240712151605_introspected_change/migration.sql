/*
  Warnings:

  - Made the column `departmentId` on table `coordinator` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `coordinator` DROP FOREIGN KEY `Coordinator_departmentId_fkey`;

-- AlterTable
ALTER TABLE `coordinator` MODIFY `departmentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Coordinator` ADD CONSTRAINT `Coordinator_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
