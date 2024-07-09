/*
  Warnings:

  - You are about to drop the column `name` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `coordinator` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `subject` table. All the data in the column will be lost.
  - Added the required column `username` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `name`,
    ADD COLUMN `username` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `coordinator` DROP COLUMN `name`,
    ADD COLUMN `username` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `name`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `department` DROP COLUMN `name`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `name`,
    ADD COLUMN `username` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `subject` DROP COLUMN `name`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
