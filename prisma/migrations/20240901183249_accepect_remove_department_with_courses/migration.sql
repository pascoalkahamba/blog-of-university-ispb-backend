-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_departmentId_fkey`;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
