/*
  Warnings:

  - Added the required column `blocked` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockedQuantity` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blocked` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockedQuantity` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coordinator` ADD COLUMN `blocked` BOOLEAN NOT NULL,
    ADD COLUMN `blockedQuantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `blocked` BOOLEAN NOT NULL,
    ADD COLUMN `blockedQuantity` INTEGER NOT NULL;
