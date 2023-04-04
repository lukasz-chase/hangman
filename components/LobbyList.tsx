"use client";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { socketContextTypes } from "../types/context";
import { Room } from "../types/socket";
import JoinLobby from "./JoinLobby";

const RoomsDisplay = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { socket }: socketContextTypes = useContext(SocketContext);
  const [loading, setLoading] = useState(true);

  const setRoomsHandler = (socketRooms: Room[]) => {
    setRooms([]);
    const publicRooms = socketRooms.filter(
      (room) => room.roomId.startsWith("public") && !room.inGame
    );
    setRooms(publicRooms);
    setLoading(false);
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
      {loading ? (
        <progress className="progress progress-accent w-56"></progress>
      ) : (
        <>
          {rooms.length > 0 && <h1>Join a public lobby</h1>}
          <div className="flex gap-2 flex-col items-center">
            {rooms.map((room) => (
              <JoinLobby
                key={room.roomId}
                roomId={room.roomId}
                players={room.players}
                playersLimit={room.playersLimit}
                language={room.language}
                customWord={room.customWord}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RoomsDisplay;
