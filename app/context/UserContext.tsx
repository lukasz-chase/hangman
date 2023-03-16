"use client";
import React, { useState, ReactNode, createContext } from "react";
import { GuestUser } from "../types/authTypes";
import avatar1 from "../../assets/avatar-1.png";

const UserContext = createContext({
  user: {
    id: 1,
    name: "Alfred",
    avatar: avatar1,
  },
  isLogged: false,
  setUser: (user: GuestUser) => {},
  setIsLogged: (logged: boolean) => {},
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<GuestUser>({
    id: 1,
    name: "Alfred",
    avatar: avatar1,
  });
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{
        user,
        isLogged,
        setUser,
        setIsLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
