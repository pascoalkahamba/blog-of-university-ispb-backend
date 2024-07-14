/*
  Warnings:

  - You are about to drop the column `url` on the `photo` table. All the data in the column will be lost.
  - Added the required column `content` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `photo` DROP COLUMN `url`,
    ADD COLUMN `content` LONGBLOB NOT NULL,
    ADD COLUMN `mimeType` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `picture` ADD COLUMN `content` LONGBLOB NOT NULL,
    ADD COLUMN `mimeType` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL;
