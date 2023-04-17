/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Round` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WordToGuess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_roundId_fkey";

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_wordToGuessId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "messages" JSONB[],
ADD COLUMN     "rounds" JSONB[];

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "Round";

-- DropTable
DROP TABLE "WordToGuess";
