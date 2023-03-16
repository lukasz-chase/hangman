"use client";
import React from "react";
import { SocketContext } from "@/app/context/SocketContext";
import { useContext } from "react";
import { HangmanDrawing } from "./HangmanDrawings";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import { Room } from "../types/socket";
import { toast } from "react-hot-toast";

const Hangman = () => {
  const { socket, room, router }: { socket: any; room: Room; router: any } =
    useContext(SocketContext);
  socket.on("playerDisconnected", (id: string) => {
    toast.error(`player ${id} has disconected`);
  });

  if (Object.keys(room).length === 0) router.replace("/");
  const { wordToGuess, players } = room;

  const player = players.find((player) => player.id === socket.id);

  const guessedLetters = player?.guessedLetters || [];

  const checkIncorrectLetters = (letters: string[]) =>
    letters!.filter((letter: string) => !wordToGuess.includes(letter));

  const incorrectLetters = checkIncorrectLetters(guessedLetters!);

  //6 because thats how much bodyparts we have - tries the user have
  const isLoser = incorrectLetters.length >= 6;

  const checkIsWinner = (letters: string[]) =>
    wordToGuess.split("").every((letter: string) => letters.includes(letter));

  const isWinner = checkIsWinner(guessedLetters!);

  const gameHasEnded =
    room.roundTime === 0 ||
    players.every(
      (player) =>
        checkIsWinner(player.guessedLetters) ||
        checkIncorrectLetters(player.guessedLetters).length >= 6
    );
  const winner = players.reduce((acc, player) => {
    return player.score > acc.score ? player : acc;
  }, players[0]);
  return (
    <div className="flex flex-col justify-center items-center">
      {gameHasEnded && (
        <div className="uppercase text-2xl text-center">
          <h1>Game has ended</h1>
          <h1 className="text-white">{winner.id} has won</h1>
        </div>
      )}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters!}
        wordToGuess={wordToGuess}
      />
      <div>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters!.filter((letter: string) =>
            wordToGuess.includes(letter)
          )}
          socket={socket}
          isLoser={isLoser}
          isWinner={isWinner}
          room={room}
          inactiveLetters={incorrectLetters}
          guessedLetters={guessedLetters!}
          player={player!}
        />
      </div>
    </div>
  );
};

export default Hangman;
