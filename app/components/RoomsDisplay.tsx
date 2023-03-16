"use client";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { Room } from "../types/socket";
import JoinRoom from "./JoinRoom";

const RoomsDisplay = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { socket }: { socket: any } = useContext(SocketContext);

  const setRoomsHandler = (socketRooms: Room[]) => {
    setRooms([]); // Clear the rooms state
    socketRooms.map((room) => {
      if (room.roomId.startsWith("public") && !room.inGame) {
        setRooms((prev: any) => [...prev, room]);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(socket).length === 0) return;
    socket.emit("getRooms");
    socket.on("getRooms", setRoomsHandler);
    return () => {
      socket.off("getRooms", setRoomsHandler);
    };
  }, [socket]);
  return (
    <div>
      {rooms.length > 0 && <h1>Join a public lobby</h1>}
      <div className="flex gap-2 flex-col items-center">
        {rooms.map((room) => (
          <JoinRoom
            key={room.roomId}
            roomId={room.roomId}
            players={room.players}
            playersLimit={room.playersLimit}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomsDisplay;
