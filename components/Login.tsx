"use client";
import { signIn, useSession } from "next-auth/react";
import { ReactNode, useContext } from "react";
import { UserContext } from "../context/UserContext";
import logo from "@/assets/logo.png";
import type { userContextTypes } from "../types/context";
import Image from "next/image";
import { guestUser } from "../utils/login";
import SignButton from "./SignButton";
import Loading from "./Loading";

const Login = ({ children }: { children: ReactNode }) => {
  const {
    setUser,
    setIsLogged,
    isLogged = false,
  }: userContextTypes = useContext(UserContext);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  const guestLogIn = () => {
    setUser(guestUser);
    localStorage.setItem("guestUser", JSON.stringify(guestUser));
    setIsLogged(true);
  };

  return (
    <>
      {session || isLogged ? (
        <>{children}</>
      ) : (
        <div className="h-[100dvh] flexCenter flex-col gap-5 text-center text-white text-xl lg:text-lg">
          <Image
            height="200"
            width="200"
            src={logo}
            alt="hangman"
            className="rounded-md"
          />
          <div>
            <h1>
              Welcome to <b className="text-sky-500">Hangman</b> online
            </h1>
            <h2 className="text-lg lg:text-2xl">Learn new words by playing</h2>
            <h3>
              <b className="text-lime-500">Sign in</b> to continue
            </h3>
          </div>
          <SignButton
            ariaLabel="google sign in"
            label="google"
            onClick={() => signIn("google")}
          />
          <SignButton
            ariaLabel="guest sign in"
            label="guest"
            onClick={guestLogIn}
          />
        </div>
      )}
    </>
  );
};

export default Login;
