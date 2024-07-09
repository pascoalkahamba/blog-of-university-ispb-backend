/*
  Warnings:

  - You are about to drop the column `title` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `reply` table. All the data in the column will be lost.
  - Added the required column `password` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `admin` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unlikes` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `coordinator` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favorite` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unlikes` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unlikes` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `title`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `likes` INTEGER NOT NULL,
    ADD COLUMN `unlikes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `coordinator` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `course` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `department` DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `favorite` BOOLEAN NOT NULL,
    ADD COLUMN `likes` INTEGER NOT NULL,
    ADD COLUMN `unlikes` INTEGER NOT NULL,
    ADD COLUMN `views` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reply` DROP COLUMN `title`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `likes` INTEGER NOT NULL,
    ADD COLUMN `unlikes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `password` VARCHAR(191) NULL,
    MODIFY `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `subject` ADD COLUMN `password` VARCHAR(191) NOT NULL;
