/*
  Warnings:

  - Made the column `password` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `coordinator` MODIFY `blocked` BOOLEAN NULL,
    MODIFY `blockedQuantity` INTEGER NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `blocked` BOOLEAN NULL,
    MODIFY `blockedQuantity` INTEGER NULL;
