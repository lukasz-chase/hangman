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
//components
import SignButton from "./SignButton";
import Loading from "./Loading";
import GuestLogin from "./GuestLogin";

const Login = ({ children }: { children: ReactNode }) => {
  const { isLogged = false }: userContextTypes = useContext(UserContext);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-[100dvh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mt-20">
      {session || isLogged ? (
        <>{children}</>
      ) : (
        <div className="h-[100dvh] flexCenter flex-col gap-5 text-center text-primary-content text-sm lg:text-lg ">
          <Image
            height="100"
            width="100"
            src={logo}
            alt="hangman"
            className="rounded-md"
          />
          <div>
            <h1>
              Welcome to <b className="text-sky-500">Hangman</b> online
            </h1>
            <h2 className="">Learn new words by playing</h2>
            <h3>
              <b className="text-lime-500">Sign in with</b>
            </h3>
          </div>
          <SignButton
            ariaLabel="google sign in"
            label="google"
            onClick={() => signIn("google")}
          />
          <h3>or as</h3>
          <GuestLogin />
        </div>
      )}
    </div>
  );
};

export default Login;
