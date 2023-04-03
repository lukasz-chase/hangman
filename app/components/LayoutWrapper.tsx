"use client";
import { ReactNode, useContext } from "react";
import { Toaster } from "react-hot-toast";
import Login from "./Login";
import { useSession } from "next-auth/react";
import { UserContext } from "../context/UserContext";

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const { isLogged = false }: { isLogged: boolean } = useContext(UserContext);
  if (status === "loading") {
    return (
      <div className="h-screen w-screen flexCenter">
        <progress className="progress progress-accent w-56"></progress>
      </div>
    );
  }
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
