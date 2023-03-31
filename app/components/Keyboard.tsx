"use client";
import { memo, useCallback, useContext, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import { keys } from "../descriptions/Hangman";
import type { Player, Room, Socket } from "../types/socket";
import type { gameContextTypes } from "../types/context";

type KeyboardProps = {
  disabled?: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  room: Room;
  socket: Socket;
  isLoser: boolean;
  isWinner: boolean;
  guessedLetters: string[];
  player: Player;
};

const setPlayerGuessedLetters = (
  player: Player,
  letter: string,
  wordToGuess: any
) => {
  const guessedLetters = [...player.guessedLetters, letter];
  const score = player.score + (wordToGuess.word.includes(letter) ? 10 : 0);

  return { ...player, guessedLetters, score };
};

export const Keyboard = memo(
  ({
    activeLetters,
    inactiveLetters,
    disabled = false,
    room,
    socket,
    isLoser,
    isWinner,
    guessedLetters,
    player,
  }: KeyboardProps) => {
    const { isChatFocused }: gameContextTypes = useContext(GameContext);

    const addGuessedLetter = useCallback(
      (letter: string) => {
        if (guessedLetters.includes(letter) || isLoser || isWinner) return;

        const updatedPlayer = setPlayerGuessedLetters(
          player,
          letter,
          room.wordToGuess
        );
        socket.emit("room:update", {
          ...room,
          players: room.players.map((p) =>
            p.id === player.id ? updatedPlayer : p
          ),
        });
      },
      [guessedLetters, isWinner, isLoser, player, room, socket]
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
              aria-label={`keyboard button ${key}`}
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
);
