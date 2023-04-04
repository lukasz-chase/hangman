"use client";
import { useState, ReactNode, createContext } from "react";
import { GuestUser } from "../types/authTypes";

const UserContext = createContext({
  user: {
    id: "1",
    name: "Alfred",
    avatar:
      "https://res.cloudinary.com/dmv02zyyo/image/upload/v1680191676/deb7gmlw3iyq4r41kjlx.png",
  },
  isLogged: false,
  setUser: (user: GuestUser) => {},
  setIsLogged: (logged: boolean) => {},
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<GuestUser>({
    id: "1",
    name: "Alfred",
    avatar:
      "https://res.cloudinary.com/dmv02zyyo/image/upload/v1680191676/deb7gmlw3iyq4r41kjlx.png",
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
