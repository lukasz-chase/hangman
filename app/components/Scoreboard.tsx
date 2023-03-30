"use client";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useRef } from "react";
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
  const { isLogged, user }: userContextTypes = useContext(UserContext);
  const { socket, room }: socketContextTypes = useContext(SocketContext);

  const playerId = isLogged ? user.id : session?.user.id;
  const name = isLogged ? user.name : session?.user?.name;
  const playerAvatar = isLogged ? user.avatar : session?.user?.avatar;

  const countdownRef = useRef<HTMLElement | null>(null);
  const countdownWrapperRef = useRef<HTMLDivElement | null>(null);

  const { players, roundTime, wordToGuess } = room;

  const gameHasEnded = hasGameEnded({
    roundTime: roundTime,
    players: players,
    wordToGuess: wordToGuess.word,
    authorId: room.creator,
    customWord: room.customWord,
  });

  let countdownInterval: any;
  const timeHasRunOut = () => {
    socket!.emit("room:update", room);
    clearInterval(countdownInterval);
    return;
  };
  const setTimeoutUI = (roundTime: number) => {
    countdownRef.current!.style.setProperty("--value", `${roundTime}`);
    if (roundTime <= 90 && roundTime > 0) {
      countdownWrapperRef.current!.classList.remove("hidden");
      countdownWrapperRef.current!.classList.add("flex");
    } else {
      countdownWrapperRef.current!.classList.add("hidden");
    }
    if (roundTime <= LIME_TIME && roundTime > WHITE_TIME) {
      countdownRef.current!.classList.add("text-lime-500");
    } else if (roundTime < WHITE_TIME && roundTime > RED_TIME) {
      countdownRef.current!.classList.add("text-white");
    } else if (roundTime < RED_TIME && roundTime > 0) {
      countdownRef.current!.classList.add("text-red-500");
    }
  };
  useEffect(() => {
    if (!gameHasEnded) {
      countdownInterval = setInterval(() => {
        if (room.roundTime === 0) timeHasRunOut();
        room.roundTime--;
        setTimeoutUI(room.roundTime);
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
    <div className="">
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
        socket={socket}
        playerAvatar={playerAvatar}
      />
    </div>
  );
};

export default Scoreboard;
