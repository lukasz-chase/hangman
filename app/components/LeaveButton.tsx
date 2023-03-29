"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import type { socketContextTypes, userContextTypes } from "../types/context";
import { leaveHandler } from "../utils/room";

const LeaveButton = () => {
  const [rooms, setRooms] = useState([]);
  const { data: session } = useSession();

  const { isLogged, user }: userContextTypes = useContext(UserContext);
  const { socket, router }: socketContextTypes = useContext(SocketContext);

  const playerId = isLogged ? user.id : session?.user.id;
  const playerName = isLogged ? user.name : session?.user.name;

  const pathname = usePathname()!.split("/");

  useEffect(() => {
    if (socket) {
      socket.emit("getRooms");
      socket.on("getRooms", (rooms: any) => setRooms(rooms));
    }
  }, [socket]);

  return (
    <div
      className="cursor-pointer"
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
