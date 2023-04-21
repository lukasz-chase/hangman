import { Player } from "../types/socket";

export const checkIsWinner = (letters: string[], wordToGuess: string) =>
  wordToGuess.split("").every((letter: string) => letters.includes(letter));

export const checkIncorrectLetters = (letters: string[], wordToGuess: string) =>
  letters!.filter((letter: string) => !wordToGuess.includes(letter));

export const hasGameEnded = ({
  roundTime,
  players,
  wordToGuess,
  authorId,
  customWord,
}: {
  roundTime: number;
  players: Player[];
  wordToGuess: string;
  authorId: string;
  customWord: boolean;
}) => {
  const gameHasEnded = roundTime === 0;
  const playersMod = customWord
    ? players.filter((player) => player.id !== authorId)
    : players;
  const didPlayersEnd = playersMod.every(
    (player) =>
      checkIsWinner(player.guessedLetters, wordToGuess) ||
      checkIncorrectLetters(player.guessedLetters, wordToGuess).length >= 6
  );
  return gameHasEnded || didPlayersEnd;
};
