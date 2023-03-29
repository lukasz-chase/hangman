"use client";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { socketContextTypes } from "../types/context";
import { Room } from "../types/socket";
import JoinLobby from "./JoinLobby";

const RoomsDisplay = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { socket }: socketContextTypes = useContext(SocketContext);

  const setRoomsHandler = (socketRooms: Room[]) => {
    setRooms([]); // Clear the rooms state
    socketRooms.map((room) => {
      if (room.roomId.startsWith("public") && !room.inGame) {
        setRooms((prev: any) => [...prev, room]);
      }
    });
  };

  useEffect(() => {
    if (socket) {
      socket.emit("getRooms");
      socket.on("getRooms", setRoomsHandler);
      return () => {
        socket.off("getRooms", setRoomsHandler);
      };
    }
  }, [socket]);

  return (
    <div>
      {rooms.length > 0 && <h1>Join a public lobby</h1>}
      <div className="flex gap-2 flex-col items-center">
        {rooms.map((room) => (
          <JoinLobby
            key={room.roomId}
            roomId={room.roomId}
            players={room.players}
            playersLimit={room.playersLimit}
            language={room.language}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomsDisplay;
