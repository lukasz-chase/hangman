"use client";
import { useEffect, useState } from "react";
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
import { saveGame } from "@/api";
import Loading from "./Loading";
import Scoreboard from "./Scoreboard";

const Hangman = ({ roomId }: { roomId: string }) => {
  const { data: session } = useSession();
  const { user }: userContextTypes = useContext(UserContext);
  const {
    socket,
    router,
    roomIsFetched,
    room,
    currentRound,
  }: socketContextTypes = useContext(SocketContext);
  const [loadingNewRound, setLoadingNewRound] = useState(false);

  const roomHasClosed = () => {
    roomClosed(router);
  };
  const newRoundHandler = () => {
    router.replace(`/lobby/${roomId}`);
  };

  useEffect(() => {
    if (socket) {
      socket.emit("room:getById", roomId);
      socket.emit("room:playerJoinsGame", { roomId, id: playerId });

      socket.on("roomHasClosed", roomHasClosed);
      socket.on("room:newRound", newRoundHandler);
      socket.on("room:playerDisconnected", playerDisconnectedHandler);

      return () => {
        socket.off("room:newRound", newRoundHandler);
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
  const isWordAuthor =
    currentRound.customWord && player!.id === currentRound.wordToGuessChooser;

  const gameHasEnded = hasGameEnded({
    roundTime: currentRound.roundTime,
    players,
    wordToGuess: wordToGuess.word,
    authorId: currentRound.wordToGuessChooser,
    customWord: currentRound.customWord,
  });

  const highestScore = Math.max(...players.map((player) => player.score)); // find the highest score

  const winners = players.filter((player) => player.score === highestScore); // filter players with the highest score

  useEffect(() => {
    const anotherRound = room.roundsNumber > room.currentRound + 1;
    if (gameHasEnded && room.roomId) {
      setLoadingNewRound(true);
      if (anotherRound) {
        createNewRound({
          room,
          currentRound,
          socket,
          player,
          winners,
        });
      } else {
        room.rounds[room.currentRound].roundWinners = winners.map((winner) => ({
          name: winner.name,
          id: winner.id,
        }));
        socket?.emit("room:update", room);
        saveGame(room)
          .then(({ data }) => router.replace(`/results/${data.id}`))
          .catch((err) => {
            toast.error("Error while saving the game");
            router.replace(`/`);
          });
      }
    }
  }, [gameHasEnded]);

  if (loadingNewRound || !roomIsFetched) return <Loading />;
  return (
    <div className="flexCenter flex-col gap-5 xl:flex-row">
      <div className="flexCenter flex-col mt-10 flex-1">
        <h1 className="uppercase text-primary-content px-4">
          Word language: <b className="text-accent">{currentRound.language}</b>
        </h1>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters!}
          wordToGuess={wordToGuess.word}
        />
        {gameHasEnded && (
          <h1 className="uppercase p-5 text-primary-content text-xs md:text-md lg:text-xl">
            The word was{" "}
            <b className="text-cyan-500">{wordToGuess.original} </b>
            {language !== "english" && `which means ${wordToGuess.translation}`}
          </h1>
        )}
        <div>
          <Keyboard
            disabled={isWinner || isLoser || isWordAuthor || gameHasEnded}
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
      <Scoreboard />
    </div>
  );
};

export default Hangman;
