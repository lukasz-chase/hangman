"use client";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import type { userContextTypes } from "../types/context";
import LeaveButton from "./LeaveButton";
import Link from "next/link";

const Nav = () => {
  const { data: session } = useSession();
  const { isLogged, user, setIsLogged, setUser }: userContextTypes =
    useContext(UserContext);
  const playerId = session?.user.id ?? user.id;
  const signOutHandler = () => {
    if (isLogged) {
      localStorage.removeItem("guestUser");
      setUser({});
      setIsLogged(false);
    } else {
      signOut();
    }
  };

  return (
    <div className="absolute top-0 left-0 flex justify-between items-center w-[96%] text-primary-content">
      <h1 className="p-5 text-xl uppercase">
        <LeaveButton />
      </h1>
      {(session || isLogged) && (
        <div className="flexCenter gap-2">
          <Link href={`/history/${playerId}`}>History</Link>
          <div
            aria-label="sign out"
            onClick={() => signOutHandler()}
            className="md:tooltip md:tooltip-bottom hover:tooltip-open cursor-pointer"
            data-tip="Sign out"
          >
            <img
              className="h-5 w-5 hidden md:block lg:h-8 lg:w-8 rounded-full"
              src={session?.user?.image! ?? user.avatar}
              alt="Profile picture"
            />
            <p className="block md:hidden">Sign out</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
