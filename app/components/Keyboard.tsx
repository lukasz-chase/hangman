"use client";
import { useCallback, useEffect } from "react";
import { keys } from "../descriptions/Hangman";
import { Player } from "../types/socket";

type KeyboardProps = {
  disabled?: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  room: any;
  socket: any;
  isLoser: boolean;
  isWinner: boolean;
  guessedLetters: string[];
  player: Player;
};

export function Keyboard({
  activeLetters,
  inactiveLetters,
  disabled = false,
  room,
  socket,
  isLoser,
  isWinner,
  guessedLetters,
  player,
}: KeyboardProps) {
  const setGuessedLetters = (letter: string) => {
    player.guessedLetters = [...player.guessedLetters, letter];
    player.score = room.wordToGuess.word.includes(letter)
      ? player.score + 10
      : player.score;
    socket.emit("room:update", room);
  };
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters(letter);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);
  return (
    <div className="grid grid-cols-fluid gap-1 w-screen lg:max-w-3xl">
      {keys.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            className={`kbd md:kbd-md uppercase text-bold lg:kbd-lg w-full border-2 ratio-square p-2 cursor-pointer text-black 
            ${isActive && "bg-lime-500  text-white hover:cursor-not-allowed"}
            ${isInactive && "bg-red-400 text-white hover:cursor-not-allowed"}
            ${!isInactive && !isActive && "bg-white hover:bg-slate-400"}
            `}
            key={key}
            onClick={() => addGuessedLetter(key)}
            disabled={
              isInactive || isActive || disabled || room.roundTime === 0
            }
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
