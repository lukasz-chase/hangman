"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { GuestUser } from "../types/authTypes";
import LeaveButton from "./LeaveButton";

const Nav = () => {
  const { data: session } = useSession();
  const {
    isLogged,
    user,
    setIsLogged,
    setUser,
  }: { isLogged: boolean; user: GuestUser; setIsLogged: any; setUser: any } =
    useContext(UserContext);
  const signOutHandler = () => {
    if (isLogged) {
      setIsLogged(false);
      setUser({});
    } else {
      signOut();
    }
  };

  return (
    <div className="absolute top-0 left-0 flex justify-evenly items-center w-full text-white">
      <h1 className="p-5 text-xl uppercase">
        <LeaveButton />
      </h1>
      {(session || isLogged) && (
        <div
          onClick={() => signOutHandler()}
          className="md:tooltip md:tooltip-bottom hover:tooltip-open cursor-pointer"
          data-tip="Sign out"
        >
          <img
            className="h-5 w-5 hidden md:block lg:h-8 lg:w-8 rounded-full"
            src={session ? session.user?.image! : user.avatar.src}
            alt="Profile picture"
          />
          <p className="block md:hidden">Sign out</p>
        </div>
      )}
    </div>
  );
};

export default Nav;
