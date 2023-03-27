"use client";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import { GuestUser } from "../types/authTypes";
import { Room } from "../types/socket";
import { hasGameEnded } from "../utils/game";

const PlayersDisplay = () => {
  const { data: session } = useSession();
  const { isLogged, user }: { isLogged: boolean; user: GuestUser } =
    useContext(UserContext);
  const { socket, room }: { socket: any; room: Room } =
    useContext(SocketContext);
  const playerId = isLogged ? user.id : session?.user.id;
  const countdownRef = useRef<HTMLElement | null>(null);
  const gameHasEnded = hasGameEnded({
    roundTime: room.roundTime,
    players: room.players,
    wordToGuess: room.wordToGuess.word,
  });

  let countdownInterval: any;
  useEffect(() => {
    if (!gameHasEnded) {
      countdownInterval = setInterval(() => {
        if (room.roundTime === 0) {
          socket.emit("room:update", room);
          clearInterval(countdownInterval);
          return;
        }
        room.roundTime--;
        countdownRef.current!.style.setProperty("--value", `${room.roundTime}`);
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [gameHasEnded]);

  useEffect(() => {
    if (gameHasEnded) {
      clearInterval(countdownInterval);
    }
  }, [gameHasEnded]);
  console.log(room.roundTime);
  return (
    <div className="h-screen flexCenter flex-col flex-2">
      <div
        className={`flex-col justify-center items-center ${
          room.roundTime <= 90 && room.roundTime > 0 ? "flex" : "hidden"
        }`}
      >
        <span>Time left</span>
        <span className="countdown font-mono text-6xl">
          <span ref={countdownRef}></span>
        </span>
      </div>
      <div className="bg-white min-w-56 flex flex-col rounded-md">
        <h1 className="text-black p-5 self-center">Players</h1>
        {room.players.map((player: any) => (
          <div
            key={player.id}
            className="text-black p-5 flex justify-between gap-5"
          >
            <span>{player.id === playerId ? "you" : player.name}</span>
            <span>{player.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersDisplay;
