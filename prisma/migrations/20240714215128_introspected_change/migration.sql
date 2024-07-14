/*
  Warnings:

  - You are about to drop the column `password` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` DROP COLUMN `password`,
    DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Post_title_key` ON `Post`(`title`);
