"use client";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
//context
import { SocketContext } from "@/context/SocketContext";
import { useContext } from "react";
import { socketContextTypes } from "@/types/context";
interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const { connected }: socketContextTypes = useContext(SocketContext);
  return (
    <>
      {connected ? (
        <div>
          <Toaster position="top-right" />
          {children}
        </div>
      ) : (
        <div className="h-screen flex flex-center flex-col gap-4  w-[99vw] flexCenter">
          <span className="uppercase">Waiting for server to start running</span>
          <span className="loading loading-infinity loading-lg text-accent"></span>
        </div>
      )}
    </>
  );
};

export default LayoutWrapper;
