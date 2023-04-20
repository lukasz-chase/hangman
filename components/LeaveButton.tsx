"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import type { socketContextTypes, userContextTypes } from "../types/context";
import { leaveHandler } from "../utils/room";

const LeaveButton = () => {
  const { data: session } = useSession();

  const { user }: userContextTypes = useContext(UserContext);
  const { socket, router, room }: socketContextTypes =
    useContext(SocketContext);

  const playerId = session?.user.id ?? user.id;
  const playerName = session?.user.name ?? user.name;

  return (
    <div
      className="cursor-pointer"
      aria-label="go home"
      onClick={() =>
        leaveHandler({
          room,
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
