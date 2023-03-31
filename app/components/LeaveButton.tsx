"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import type { socketContextTypes, userContextTypes } from "../types/context";
import { leaveHandler } from "../utils/room";

const LeaveButton = () => {
  const [rooms, setRooms] = useState([]);
  const { data: session } = useSession();

  const { user }: userContextTypes = useContext(UserContext);
  const { socket, router }: socketContextTypes = useContext(SocketContext);

  const playerId = user.id ?? session?.user.id;
  const playerName = user.name ?? session?.user.name;

  const pathname = usePathname()!.split("/");
  const handleRooms = (rooms: any) => setRooms(rooms);

  useEffect(() => {
    if (socket) {
      socket.emit("getRooms");
      socket.on("getRooms", handleRooms);

      return () => {
        socket.off("getRooms", handleRooms);
      };
    }
  }, [socket]);

  return (
    <div
      className="cursor-pointer"
      aria-label="go home"
      onClick={() =>
        leaveHandler({
          roomId: pathname[2],
          rooms,
          router,
          socket,
          playerId,
          playerName,
        })
      }
    >
      Hangman
    </div>
  );
};

export default LeaveButton;
