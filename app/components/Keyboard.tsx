"use client";
import { useCallback, useEffect } from "react";
import { Player } from "../types/socket";

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

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
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            className={`w-full border-2 bg-none ratio-square text-sm md:text-lg uppercase p-2 text-bold cursor-pointer  text-black  hover:bg-slate-400 
            ${
              isActive
                ? "bg-lime-500 hover:bg-lime-500 text-white hover:cursor-not-allowed"
                : "bg-white"
            }
            ${
              isInactive && "opacity-30 hover:bg-white hover:cursor-not-allowed"
            }
            `}
            onClick={() => addGuessedLetter(key)}
            disabled={
              isInactive || isActive || disabled || room.roundTime === 0
            }
            key={key}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
