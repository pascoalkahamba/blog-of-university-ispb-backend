-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_coordinatorId_fkey`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_coordinatorId_fkey` FOREIGN KEY (`coordinatorId`) REFERENCES `Coordinator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
