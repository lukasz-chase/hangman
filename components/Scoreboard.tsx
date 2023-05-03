"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef } from "react";
//context
import { SocketContext } from "@/context/SocketContext";
import { UserContext } from "@/context/UserContext";
//types
import type { socketContextTypes, userContextTypes } from "@/types/context";
//utils
import { hasGameEnded, hasPlayerFinished } from "@/utils/game";
//components
import Chat from "./Chat";
import Image from "next/image";

const COUNTDOWN_INTERVAL = 1000;
const LIME_TIME = 90;
const WHITE_TIME = 60;
const RED_TIME = 20;

const Scoreboard = () => {
  const { data: session } = useSession();
  const { user }: userContextTypes = useContext(UserContext);
  const { socket, room, currentRound, setRoom }: socketContextTypes =
    useContext(SocketContext);

  const playerId = session?.user.id ?? user.id;
  const name = session?.user?.name ?? user.name;
  const playerAvatar = session?.user?.image ?? user.avatar;

  const countdownRef = useRef<HTMLElement | null>(null);
  const countdownWrapperRef = useRef<HTMLDivElement | null>(null);
  const { players, wordToGuess, customWord, wordToGuessChooser, difficulty } =
    currentRound;
  const { roundTime } = currentRound;

  const gameHasEnded = hasGameEnded({
    roundTime: roundTime,
    players: players,
    wordToGuess: wordToGuess.word,
    authorId: wordToGuessChooser,
    customWord: customWord,
    difficulty,
  });

  let countdownInterval: any;

  const timeHasRunOut = () => {
    socket!.emit("room:update", room);
    clearInterval(countdownInterval);
    return;
  };

  const setTimeoutUI = (roundTime: number) => {
    countdownRef.current!.style.setProperty("--value", `${roundTime}`);
    countdownWrapperRef.current!.classList.toggle(
      "hidden",
      roundTime > 90 || roundTime <= 0
    );
    countdownWrapperRef.current!.classList.toggle(
      "flex",
      roundTime > 0 && roundTime <= 90
    );
    countdownRef.current!.classList.toggle(
      "text-lime-500",
      roundTime <= LIME_TIME && roundTime > WHITE_TIME
    );
    countdownRef.current!.classList.toggle(
      "text-primary-content",
      roundTime < WHITE_TIME && roundTime > RED_TIME
    );
    countdownRef.current!.classList.toggle(
      "text-red-500",
      roundTime < RED_TIME && roundTime > 0
    );
  };

  useEffect(() => {
    if (!gameHasEnded) {
      countdownInterval = setInterval(() => {
        if (currentRound.roundTime === 0) timeHasRunOut();
        currentRound.roundTime--;
        socket!.emit("room:setGameTime", currentRound.roundTime, room.roomId);
        setTimeoutUI(currentRound.roundTime);
      }, COUNTDOWN_INTERVAL);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [gameHasEnded, players]);

  useEffect(() => {
    if (gameHasEnded) {
      clearInterval(countdownInterval);
    }
  }, [gameHasEnded]);

  return (
    <div className="md:mr-20">
      <div className="flexCenter flex-col flex-2 min-w-full md:min-w-full p-5">
        <div
          ref={countdownWrapperRef}
          className={`flex-col justify-center items-center text-primary-content hidden`}
        >
          <span>Pozostały czas</span>
          <span className={`countdown font-mono text-6xl`}>
            <span ref={countdownRef}></span>
          </span>
        </div>
        <div className="bg-primary-content min-w-56 flex flex-col min-w-full md:min-w-[300px]">
          <h1 className="text-primary-content bg-neutral-focus py-2 w-full text-center self-center uppercase">
            Gracze
          </h1>
          {players
            .sort((a, b) => b.score - a.score)
            .map((player) => (
              <div
                key={player.id}
                className={`text-black uppercase p-5 flex justify-between gap-5 border-b-4 border-black
                ${
                  hasPlayerFinished({
                    player,
                    wordToGuess: wordToGuess.word,
                    wordToGuessChooser,
                    customWord,
                    difficulty,
                  })
                    ? "bg-lime-500"
                    : "bg-white"
                }
                `}
              >
                <div className="flexCenter gap-2">
                  <Image
                    src={player.avatar}
                    alt={player.name}
                    height={32}
                    width={32}
                    className="rounded-full"
                  />
                  <span>{player.id === playerId ? "ty" : player.name}</span>
                </div>
                <span>
                  <b>{player.score}</b> pts
                </span>
              </div>
            ))}
        </div>
      </div>
      <Chat
        messages={room.messages}
        playerId={playerId}
        playerName={name}
        room={room}
        socket={socket!}
        playerAvatar={playerAvatar}
      />
    </div>
  );
};

export default Scoreboard;
