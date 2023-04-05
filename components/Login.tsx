"use client";
import { signIn } from "next-auth/react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import logo from "@/assets/logo.png";
import type { userContextTypes } from "../types/context";
import Image from "next/image";
import { guestUser } from "../utils/login";

const Login = () => {
  const { setUser, setIsLogged }: userContextTypes = useContext(UserContext);

  const guestLogIn = () => {
    setUser(guestUser);
    localStorage.setItem("guestUser", JSON.stringify(guestUser));
    setIsLogged(true);
  };

  return (
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
      <button
        aria-label="google sign in"
        onClick={() => signIn("google")}
        className="signButton"
      >
        google
      </button>
      <button
        aria-label="google sign in"
        onClick={() => signIn("facebook")}
        className="signButton"
      >
        facebook
      </button>
      <button
        aria-label="google sign in"
        className="signButton"
        onClick={guestLogIn}
      >
        guest
      </button>
    </div>
  );
};

export default Login;
