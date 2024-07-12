-- DropForeignKey
ALTER TABLE `coordinator` DROP FOREIGN KEY `Coordinator_departmentId_fkey`;

-- AlterTable
ALTER TABLE `coordinator` MODIFY `departmentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Coordinator` ADD CONSTRAINT `Coordinator_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
