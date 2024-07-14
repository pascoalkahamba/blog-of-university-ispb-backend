/*
  Warnings:

  - You are about to drop the column `published` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_adminId_fkey`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `published`,
    MODIFY `adminId` INTEGER NULL,
    MODIFY `favorite` BOOLEAN NULL,
    MODIFY `likes` INTEGER NULL,
    MODIFY `unlikes` INTEGER NULL,
    MODIFY `views` INTEGER NULL;

-- CreateTable
CREATE TABLE `Picture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `height` INTEGER NOT NULL DEFAULT 200,
    `width` INTEGER NOT NULL DEFAULT 300,
    `postId` INTEGER NULL,
    `url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Picture_postId_key`(`postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
