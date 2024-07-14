-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_postId_fkey`;

-- AlterTable
ALTER TABLE `file` MODIFY `postId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
