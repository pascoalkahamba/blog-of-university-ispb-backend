/*
  Warnings:

  - You are about to drop the column `password` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `subject` table. All the data in the column will be lost.
  - Added the required column `name` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subject` DROP COLUMN `password`,
    DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
