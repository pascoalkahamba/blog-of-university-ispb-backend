/*
  Warnings:

  - Made the column `registrationNumber` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `registrationNumber` VARCHAR(191) NOT NULL,
    MODIFY `year` VARCHAR(191) NOT NULL;
