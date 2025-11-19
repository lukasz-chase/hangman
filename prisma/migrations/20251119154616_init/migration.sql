/*
  Warnings:

  - You are about to alter the column `expires_at` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to alter the column `playersLimit` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to alter the column `roundsNumber` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to alter the column `currentRound` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to alter the column `roundTime` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - Made the column `messages` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rounds` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "expires_at" SET DATA TYPE INT4;

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "playersLimit" SET DATA TYPE INT4;
ALTER TABLE "Game" ALTER COLUMN "roundsNumber" SET DATA TYPE INT4;
ALTER TABLE "Game" ALTER COLUMN "currentRound" SET DATA TYPE INT4;
ALTER TABLE "Game" ALTER COLUMN "roundTime" SET DATA TYPE INT4;
ALTER TABLE "Game" ALTER COLUMN "messages" SET NOT NULL;
ALTER TABLE "Game" ALTER COLUMN "rounds" SET NOT NULL;

-- DropEnum
-- DROP TYPE "crdb_internal_region";
