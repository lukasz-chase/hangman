"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import type { socketContextTypes, userContextTypes } from "../types/context";
import { hasGameEnded } from "../utils/game";
import Chat from "./Chat";

const COUNTDOWN_INTERVAL = 1000;
const LIME_TIME = 90;
const WHITE_TIME = 60;
const RED_TIME = 20;

const Scoreboard = () => {
  const { data: session } = useSession();
  const { user }: userContextTypes = useContext(UserContext);
  const { socket, room, currentRound }: socketContextTypes =
    useContext(SocketContext);

  const playerId = session?.user.id ?? user.id;
  const name = session?.user?.name ?? user.name;
  const playerAvatar = session?.user?.image ?? user.avatar;

  const countdownRef = useRef<HTMLElement | null>(null);
  const countdownWrapperRef = useRef<HTMLDivElement | null>(null);
  const { players, wordToGuess, customWord } = currentRound;
  const { roundTime } = currentRound;
  const { creator } = room;

  const gameHasEnded = hasGameEnded({
    roundTime: roundTime,
    players: players,
    wordToGuess: wordToGuess.word,
    authorId: creator,
    customWord: customWord,
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
      "text-white",
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
      <div className="flexCenter flex-col flex-2 min-w-full md:min-w-0 p-5">
        <div
          ref={countdownWrapperRef}
          className={`flex-col justify-center items-center text-white hidden`}
        >
          <span>Time left</span>
          <span className={`countdown font-mono text-6xl`}>
            <span ref={countdownRef}></span>
          </span>
        </div>
        <div className="bg-white min-w-56 flex flex-col min-w-full md:min-w-[300px]">
          <h1 className="text-white bg-black py-2 w-full text-center self-center uppercase">
            Players
          </h1>
          {players.map((player: any) => (
            <div
              key={player.id}
              className="text-black uppercase p-5 flex justify-between gap-5 border-b-4 border-black"
            >
              <span>{player.id === playerId ? "you" : player.name}</span>
              <span>
                <b className="text-cyan-500">{player.score}</b> pts
              </span>
            </div>
          ))}
        </div>
      </div>
      <Chat
        messages={room.messages}
        playerId={playerId}
        playerName={name}
        roomId={room.roomId}
        socket={socket!}
        playerAvatar={playerAvatar}
      />
    </div>
  );
};

export default Scoreboard;
