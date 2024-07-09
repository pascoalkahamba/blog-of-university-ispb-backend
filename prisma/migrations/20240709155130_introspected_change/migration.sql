/*
  Warnings:

  - You are about to drop the column `admId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `admId` on the `photo` table. All the data in the column will be lost.
  - You are about to drop the column `admId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `admId` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `admId` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the `adm` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[adminId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_admId_fkey`;

-- DropForeignKey
ALTER TABLE `photo` DROP FOREIGN KEY `Photo_admId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_admId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_admId_fkey`;

-- DropForeignKey
ALTER TABLE `reply` DROP FOREIGN KEY `Reply_admId_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `admId`,
    ADD COLUMN `adminId` INTEGER NULL;

-- AlterTable
ALTER TABLE `photo` DROP COLUMN `admId`,
    ADD COLUMN `adminId` INTEGER NULL;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `admId`,
    ADD COLUMN `adminId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `admId`,
    ADD COLUMN `adminId` INTEGER NULL;

-- AlterTable
ALTER TABLE `reply` DROP COLUMN `admId`,
    ADD COLUMN `adminId` INTEGER NULL;

-- DropTable
DROP TABLE `adm`;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN', 'COORDINATOR') NOT NULL DEFAULT 'ADMIN',
    `contact` INTEGER NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    UNIQUE INDEX `Admin_contact_key`(`contact`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Photo_adminId_key` ON `Photo`(`adminId`);

-- CreateIndex
CREATE UNIQUE INDEX `Profile_adminId_key` ON `Profile`(`adminId`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
