"use client";
import { useCallback, useContext, useEffect } from "react";
import { GameContext } from "../context/GameContext";
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
  const { isChatFocused }: { isChatFocused: boolean } = useContext(GameContext);
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
      if (isChatFocused) {
        return;
      }
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters, isChatFocused]);
  return (
    <div className="grid grid-cols-fluid gap-1 w-[95vw] md:max-w-3xl p-4">
      {keys.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            className={`kbd lg:kbd-md uppercase text-bold xl:kbd-lg w-full border-2 ratio-square p-2 cursor-pointer text-black 
            ${
              !isInactive &&
              !isActive &&
              !disabled &&
              "bg-white hover:bg-slate-400"
            }
            ${
              disabled &&
              !isActive &&
              !isInactive &&
              "bg-slate-600 hover:cursor-not-allowed"
            }
            ${isActive && "bg-lime-500  text-white hover:cursor-not-allowed"}
            ${isInactive && "bg-red-400 text-white hover:cursor-not-allowed"}
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
