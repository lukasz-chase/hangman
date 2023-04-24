"use client";
//libraries
import { signIn, useSession } from "next-auth/react";
import { ReactNode, useContext } from "react";
//context
import { UserContext } from "../context/UserContext";
import type { userContextTypes } from "@/types/context";
//assets
import logo from "@/assets/logo.png";
import Image from "next/image";
//utils
import { generateGuestUser } from "@/utils/login";
//components
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
    return (
      <div className="h-[100dvh]">
        <Loading />
      </div>
    );
  }

  const guestLogIn = () => {
    setUser(generateGuestUser());
    localStorage.setItem("guestUser", JSON.stringify(generateGuestUser()));
    setIsLogged(true);
  };

  return (
    <div className="">
      {session || isLogged ? (
        <>{children}</>
      ) : (
        <div className="h-[100dvh] flexCenter flex-col gap-5 text-center text-primary-content text-xl lg:text-lg ">
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
    </div>
  );
};

export default Login;
