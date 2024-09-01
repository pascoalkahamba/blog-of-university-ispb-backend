-- DropForeignKey
ALTER TABLE `coordinator` DROP FOREIGN KEY `Coordinator_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `picture` DROP FOREIGN KEY `Picture_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_departmentId_fkey`;

-- AddForeignKey
ALTER TABLE `Coordinator` ADD CONSTRAINT `Coordinator_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
