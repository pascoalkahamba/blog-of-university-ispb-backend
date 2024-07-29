/*
  Warnings:

  - You are about to drop the column `content` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `Picture` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coordinatorId]` on the table `Picture` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `Picture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_postId_fkey`;

-- DropForeignKey
ALTER TABLE `photo` DROP FOREIGN KEY `Photo_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `photo` DROP FOREIGN KEY `Photo_coordinatorId_fkey`;

-- DropForeignKey
ALTER TABLE `photo` DROP FOREIGN KEY `Photo_studentId_fkey`;

-- AlterTable
ALTER TABLE `file` DROP COLUMN `content`,
    DROP COLUMN `mimeType`,
    DROP COLUMN `postId`,
    DROP COLUMN `size`,
    ADD COLUMN `departmentId` INTEGER NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `picture` DROP COLUMN `content`,
    DROP COLUMN `height`,
    DROP COLUMN `mimeType`,
    DROP COLUMN `size`,
    DROP COLUMN `width`,
    ADD COLUMN `adminId` INTEGER NULL,
    ADD COLUMN `coordinatorId` INTEGER NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `studentId` INTEGER NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `photo`;

-- CreateIndex
CREATE UNIQUE INDEX `Picture_adminId_key` ON `Picture`(`adminId`);

-- CreateIndex
CREATE UNIQUE INDEX `Picture_coordinatorId_key` ON `Picture`(`coordinatorId`);

-- CreateIndex
CREATE UNIQUE INDEX `Picture_studentId_key` ON `Picture`(`studentId`);

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_coordinatorId_fkey` FOREIGN KEY (`coordinatorId`) REFERENCES `Coordinator`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
