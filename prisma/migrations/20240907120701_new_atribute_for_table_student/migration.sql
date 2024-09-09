/*
  Warnings:

  - You are about to drop the column `blocked` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `blockedQuantity` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `student` DROP COLUMN `blocked`,
    DROP COLUMN `blockedQuantity`,
    ADD COLUMN `isStudent` BOOLEAN NULL;
