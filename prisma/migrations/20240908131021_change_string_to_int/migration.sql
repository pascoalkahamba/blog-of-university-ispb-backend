/*
  Warnings:

  - You are about to alter the column `registrationNumber` on the `student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `registrationNumber` INTEGER NOT NULL;
