"use client";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import Link from "next/link";
//context
import { UserContext } from "@/context/UserContext";
import { SocketContext } from "@/context/SocketContext";
//types
import type { socketContextTypes, userContextTypes } from "@/types/context";
//utils
import { leaveHandler } from "@/utils/room";

const Nav = () => {
  const { data: session } = useSession();
  const { isLogged, user, setIsLogged, setUser }: userContextTypes =
    useContext(UserContext);
  const { room, router, socket }: socketContextTypes =
    useContext(SocketContext);
  const playerId = session?.user.id ?? user.id;
  const playerName = session?.user.name ?? user.name;

  const signOutHandler = () => {
    if (isLogged) {
      localStorage.removeItem("guestUser");
      setUser({});
      setIsLogged(false);
    } else {
      signOut();
    }
    leaveHandler({
      room,
      router,
      socket,
      playerId,
      playerName,
    });
  };

  return (
    <div className="absolute top-0 left-0 flex justify-between items-center w-[100%] md:w-[95%] text-primary-content">
      <h1 className="text-xl uppercase p-5">
        <div
          className="cursor-pointer"
          aria-label="idz do strony glownej"
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
          Wisielec
        </div>
      </h1>
      {(session || isLogged) && (
        <div className="flexCenter gap-2 p-5 md:p-0">
          <Link href={`/history/${playerId}`}>Historia</Link>
          <div
            aria-label="wyloguj sie"
            onClick={() => signOutHandler()}
            className="md:tooltip md:tooltip-bottom hover:tooltip-open cursor-pointer"
            data-tip="Wyloguj się"
          >
            <img
              className="h-5 w-5 hidden md:block lg:h-8 lg:w-8 rounded-full"
              src={session?.user?.image! ?? user.avatar}
              alt="zdjecie profilowe"
            />
            <p className="block md:hidden">Wyloguj się</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
