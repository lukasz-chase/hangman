"use client";
import { useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
//context
import { UserContext } from "@/context/UserContext";
import { SocketContext } from "@/context/SocketContext";
//components
import { HangmanDrawing } from "./HangmanDrawings";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import Loading from "./Loading";
import Scoreboard from "./Scoreboard";
import TipsAndStrategies from "./TipsAndStrategies";
//utils
import {
  checkIncorrectLetters,
  checkIsWinner,
  hasGameEnded,
} from "@/utils/game";
import { createNewRound } from "@/utils/round";
import { playerDisconnectedHandler, roomClosed } from "@/utils/lobby";
//types
import type { socketContextTypes, userContextTypes } from "@/types/context";
//api
import { saveGame } from "@/api";
import { Detail } from "./DetailsDisplay";
import { AxiosError } from "axios";

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
        toast.error("Gra trwa, nie możesz teraz dołączyć");
        return router.replace("/");
      }
      if (playerInGame) {
        toast.error("Już jesteś w tej grze");
        return router.replace("/");
      }
    }
  }, [roomIsFetched]);

  const { wordToGuess, players, difficulty } = currentRound;
  const playerId = session?.user.id ?? user.id;
  const player = players.find((player) => player.id === playerId);

  const guessedLetters = player?.guessedLetters || [];

  const incorrectLetters = checkIncorrectLetters(
    guessedLetters!,
    wordToGuess.word
  );

  const isLoser = incorrectLetters.length >= difficulty;

  const isWinner = checkIsWinner(guessedLetters!, wordToGuess.word);
  const isWordAuthor =
    currentRound.customWord && player!.id === currentRound.wordToGuessChooser;

  const gameHasEnded = hasGameEnded({
    roundTime: currentRound.roundTime,
    players,
    wordToGuess: wordToGuess.word,
    authorId: currentRound.wordToGuessChooser,
    customWord: currentRound.customWord,
    difficulty,
  });

  const highestScore = Math.max(...players.map((player) => player.score));

  const winners = () => {
    if (currentRound.roundTime === 0 && highestScore === 0) {
      return [{ name: "Czas się skończył", id: "1" }];
    }
    return players.filter((player) => player.score === highestScore);
  };

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
          winners: winners(),
        });
      } else {
        room.rounds[room.currentRound].roundWinners = winners().map(
          (winner) => ({
            name: winner.name,
            id: winner.id,
          })
        );
        socket?.emit("room:update", room);
        saveGame(room)
          .then(({ data }) => router.replace(`/results/${data.id}`))
          .catch((err: any) => {
            console.log(err);
            toast.error(
              err.response?.data?.err || "Błąd w trakcie zapisywania gry"
            );
            router.replace(`/`);
          });
      }
    }
  }, [gameHasEnded]);

  if (loadingNewRound || !roomIsFetched)
    return (
      <div className="h-[95dvh]">
        <Loading />
      </div>
    );
  return (
    <div>
      <div className="flexCenter flex-col gap-5 xl:flex-row">
        <div className="flexCenter flex-col mt-10 flex-1">
          <div>
            <Detail
              label="Język hasła do odgadnięcia:"
              value={`${currentRound.language}`}
            />
            <Detail label="Kategoria:" value={`${wordToGuess.category}`} />
          </div>
          <HangmanDrawing
            numberOfGuesses={incorrectLetters.length}
            difficulty={difficulty}
          />
          <HangmanWord
            reveal={isLoser}
            guessedLetters={guessedLetters!}
            wordToGuess={wordToGuess.word}
          />
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
      <TipsAndStrategies />
    </div>
  );
};

export default Hangman;
