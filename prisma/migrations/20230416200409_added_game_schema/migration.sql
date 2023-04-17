-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "guessedLetters" TEXT[],
    "score" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "connectedToRoom" BOOLEAN NOT NULL,
    "hasChosenWord" BOOLEAN NOT NULL,
    "roundId" TEXT,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "playerAvatar" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "gameId" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordToGuess" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "original" TEXT NOT NULL,

    CONSTRAINT "WordToGuess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "round" INTEGER NOT NULL,
    "roundWinners" TEXT[],
    "wordToGuessChooser" TEXT NOT NULL,
    "playersInGame" TEXT[],
    "customWord" BOOLEAN NOT NULL,
    "language" TEXT NOT NULL,
    "vacant" BOOLEAN NOT NULL,
    "roundTime" INTEGER NOT NULL,
    "wordToGuessId" TEXT NOT NULL,
    "gameId" TEXT,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "playersLimit" INTEGER NOT NULL,
    "roundsNumber" INTEGER NOT NULL,
    "currentRound" INTEGER NOT NULL,
    "private" BOOLEAN NOT NULL,
    "roundTime" INTEGER NOT NULL,
    "creator" TEXT NOT NULL,
    "inGame" BOOLEAN NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_wordToGuessId_fkey" FOREIGN KEY ("wordToGuessId") REFERENCES "WordToGuess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
