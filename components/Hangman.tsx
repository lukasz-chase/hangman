"use client";
import { useEffect } from "react";
import { SocketContext } from "@/context/SocketContext";
import { useContext } from "react";
import { HangmanDrawing } from "./HangmanDrawings";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import { UserContext } from "../context/UserContext";
import { useSession } from "next-auth/react";
import {
  checkIncorrectLetters,
  checkIsWinner,
  hasGameEnded,
} from "../utils/game";
import type { socketContextTypes, userContextTypes } from "../types/context";
import { playerDisconnectedHandler, roomClosed } from "../utils/lobby";
import { toast } from "react-hot-toast";
import { createNewRound } from "@/utils/round";
import RoundWinners from "./RoundWinners";

const Hangman = ({ roomId }: { roomId: string }) => {
  const { data: session } = useSession();
  const { user }: userContextTypes = useContext(UserContext);
  const { socket, router, roomIsFetched, room }: socketContextTypes =
    useContext(SocketContext);
  const currentRound = room.rounds[room.currentRound];
  const roomHasClosed = () => {
    roomClosed(router);
  };

  useEffect(() => {
    if (socket) {
      socket.emit("room:getById", roomId);
      socket.emit("room:playerJoinsGame", { roomId, id: playerId });

      socket.on("roomHasClosed", roomHasClosed);
      socket.on("room:playerDisconnected", playerDisconnectedHandler);

      return () => {
        socket.off("roomHasClosed", roomHasClosed);
        socket.off("room:playerDisconnected", playerDisconnectedHandler);
      };
    }
  }, [socket]);
  useEffect(() => {
    if (roomIsFetched) {
      const playerInGame = currentRound.playersInGame.find(
        (id) => id === playerId
      );
      const unwantedPlayer = currentRound.players.find(
        (player) => player.id === playerId
      );
      if (!unwantedPlayer) {
        toast.error("you can't join this game");
        return router.replace("/");
      }
      if (playerInGame) {
        toast.error("you are already in this game");
        return router.replace("/");
      }
    }
  }, [roomIsFetched]);

  const { wordToGuess, players, language } = currentRound;
  const playerId = session?.user.id ?? user.id;
  const player = players.find((player) => player.id === playerId);

  const guessedLetters = player?.guessedLetters || [];

  const incorrectLetters = checkIncorrectLetters(
    guessedLetters!,
    wordToGuess.word
  );

  //6 because thats how much bodyparts we have - tries the user have
  const isLoser = incorrectLetters.length >= 6;

  const isWinner = checkIsWinner(guessedLetters!, wordToGuess.word);
  const isAuthor = playerId === room.creator;

  const gameHasEnded = hasGameEnded({
    roundTime: room.roundTime,
    players,
    wordToGuess: wordToGuess.word,
    authorId: room.creator,
    customWord: currentRound.customWord,
  });

  const highestScore = Math.max(...players.map((player) => player.score)); // find the highest score

  const winners = players.filter((player) => player.score === highestScore); // filter players with the highest score

  useEffect(() => {
    const anotherRound = room.roundsNumber > room.currentRound + 1;
    if (gameHasEnded) {
      if (anotherRound) {
        createNewRound({
          room,
          roomId,
          currentRound,
          socket,
          player,
          router,
          winners,
        });
      } else {
        room.rounds[room.currentRound].roundWinners = winners.map(
          (winner) => winner.name
        );
        socket?.emit("room:update", room);
        router.replace(`/results/${roomId}`);
      }
    }
  }, [gameHasEnded]);

  return (
    <div className="flexCenter flex-col mt-10 flex-1">
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters!}
        wordToGuess={wordToGuess.word}
      />
      {gameHasEnded && (
        <h1 className="uppercase p-5 text-white text-xs md:text-md lg:text-xl">
          The word was <b className="text-cyan-500">{wordToGuess.original} </b>
          {language !== "english" && `which means ${wordToGuess.translation}`}
        </h1>
      )}
      <div>
        <Keyboard
          disabled={
            isWinner ||
            isLoser ||
            (currentRound.customWord && isAuthor) ||
            gameHasEnded
          }
          activeLetters={guessedLetters!.filter((letter: string) =>
            wordToGuess.word.includes(letter)
          )}
          socket={socket!}
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
