"use client";
import React from "react";
import { SocketContext } from "@/app/context/SocketContext";
import { useContext } from "react";
import { HangmanDrawing } from "./HangmanDrawings";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { useSession } from "next-auth/react";
import {
  checkIncorrectLetters,
  checkIsWinner,
  hasGameEnded,
} from "../utils/game";
import type { socketContextTypes, userContextTypes } from "../types/context";

const Hangman = () => {
  const { data: session } = useSession();
  const { isLogged, user }: userContextTypes = useContext(UserContext);
  const { socket, room, router }: socketContextTypes =
    useContext(SocketContext);
  socket!.on("playerDisconnected", (id: string) => {
    toast.error(`player ${id} has disconnected`);
  });

  if (Object.keys(room).length === 0) router.replace("/");
  const { wordToGuess, players, language } = room;
  const playerId = isLogged ? user.id : session?.user.id;
  const player = players.find((player) => player.id === playerId);

  const guessedLetters = player?.guessedLetters || [];

  const incorrectLetters = checkIncorrectLetters(
    guessedLetters!,
    wordToGuess.word
  );

  //6 because thats how much bodyparts we have - tries the user have
  const isLoser = incorrectLetters.length >= 6;

  const isWinner = checkIsWinner(guessedLetters!, wordToGuess.word);
  const gameHasEnded = hasGameEnded({
    roundTime: room.roundTime,
    players,
    wordToGuess: wordToGuess.word,
  });

  const winner = players.reduce((acc, player) => {
    return player.score > acc.score ? player : acc;
  }, players[0]);
  return (
    <div className="flexCenter flex-col mt-10">
      {gameHasEnded && (
        <div className="text-white uppercase md:text-2xl text-center">
          <h1 className="md:text-xl">Game has ended</h1>
          <h1 className="text-lime-500 mb-4">{winner?.name} has won</h1>
        </div>
      )}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters!}
        wordToGuess={wordToGuess.word}
      />
      {gameHasEnded && (
        <h1 className="uppercase p-5 text-white text-xs md:text-md lg:text-xl">
          The word was <b className="text-cyan-500">{wordToGuess.original}</b>
          {language !== "english" && `which means ${wordToGuess.translation}`}
        </h1>
      )}
      <div>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters!.filter((letter: string) =>
            wordToGuess.word.includes(letter)
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
