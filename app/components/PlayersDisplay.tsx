"use client";
import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { Room } from "../types/socket";

const PlayersDisplay = () => {
  const { socket, room }: { socket: any; room: Room } =
    useContext(SocketContext);
  useEffect(() => {
    const countdownInterval: any = setInterval(() => {
      if (room.roundTime === 0) {
        socket.emit("room:update", room);
        return clearInterval(countdownInterval);
      }
      room.roundTime--;
    }, 1000);
  }, []);
  return (
    <div className="h-screen flex flex-col justify-center items-center flex-2">
      <div
        className={`flex-col justify-center items-center ${
          room.roundTime < 90 && room.roundTime > 0 ? "flex" : "hidden"
        }`}
      >
        <span>Time left</span>
        <span className="countdown font-mono text-6xl">
          <span style={{ "--value": room.roundTime }}></span>
        </span>
      </div>
      <div className="bg-white min-w-56 flex flex-col rounded-md">
        <h1 className="text-black p-5 self-center">Players</h1>
        {room.players.map((player: any) => (
          <div
            key={player.id}
            className="text-black p-5 flex justify-between gap-5"
          >
            <span>{player.id === socket.id ? "you" : player.id}</span>
            <span>{player.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersDisplay;
