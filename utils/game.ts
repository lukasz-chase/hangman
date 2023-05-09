//types
import type { Player } from "@/types/socket";

export const checkIsWinner = (letters: string[], wordToGuess: string) => {
  const wordToGuessWithoutSpace = wordToGuess.replace(/\s+/g, "");
  return wordToGuessWithoutSpace
    .split("")
    .every((letter: string) => letters.includes(letter));
};

export const checkIncorrectLetters = (letters: string[], wordToGuess: string) =>
  letters!.filter((letter: string) => !wordToGuess.includes(letter));

export const hasGameEnded = ({
  roundTime,
  players,
  wordToGuess,
  authorId,
  customWord,
  difficulty,
}: {
  roundTime: number;
  players: Player[];
  wordToGuess: string;
  authorId: string;
  customWord: boolean;
  difficulty: number;
}) => {
  const gameHasEnded = roundTime === 0;
  const playersMod = customWord
    ? players.filter((player) => player.id !== authorId)
    : players;

  const didPlayersEnd = playersMod.every(
    (player) =>
      checkIsWinner(player.guessedLetters, wordToGuess) ||
      checkIncorrectLetters(player.guessedLetters, wordToGuess).length >=
        difficulty
  );
  return gameHasEnded || didPlayersEnd;
};

export const hasPlayerFinished = ({
  player,
  wordToGuess,
  wordToGuessChooser,
  customWord,
  difficulty,
}: {
  player: Player;
  wordToGuess: string;
  wordToGuessChooser: string;
  customWord: boolean;
  difficulty: number;
}) => {
  const playerHasFinished =
    checkIsWinner(player!.guessedLetters, wordToGuess) ||
    checkIncorrectLetters(player!.guessedLetters, wordToGuess).length >=
      difficulty ||
    (customWord && wordToGuessChooser === player.id);
  return playerHasFinished;
};
