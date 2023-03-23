"use client";
import React, { ReactNode, useContext } from "react";
import { Toaster } from "react-hot-toast";
import Login from "./Login";
import { useSession } from "next-auth/react";
import { UserContext, UserContextProvider } from "../context/UserContext";

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const { data: session } = useSession();
  const { isLogged = false }: { isLogged: boolean } = useContext(UserContext);
  return (
    <div>
      {session || isLogged ? (
        <div>
          <Toaster position="top-right" />
          {children}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default LayoutWrapper;
