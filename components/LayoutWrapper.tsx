"use client";
import { ReactNode, useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Login from "./Login";
import { useSession } from "next-auth/react";
import { UserContext } from "../context/UserContext";
import Loading from "./Loading";

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div>
      <Toaster position="top-right" />
      {children}
    </div>
  );
};

export default LayoutWrapper;
