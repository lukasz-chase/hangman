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
    <div className="">
      {session || isLogged ? (
        <>{children}</>
      ) : (
        <div className="h-[100dvh] flexCenter flex-col gap-5 text-center text-primary-content text-sm lg:text-lg mt-20 md:mt-10 lg:mt-6">
          <Image
            height="100"
            width="100"
            src={logo}
            alt="wisielec"
            className="rounded-md"
          />
          <div>
            <h1>
              Witaj w <b className="text-sky-500">Wisielcu</b> online
            </h1>
            <h2 className="">Ucz się nowych słów grając</h2>
            <h3>
              <b className="text-lime-500">Zaloguj się z</b>
            </h3>
          </div>
          <SignButton
            ariaLabel="zaloguj z google"
            label="google"
            onClick={() => signIn("google")}
          />
          <div className="divider">LUB JAKO</div>
          <GuestLogin />
        </div>
      )}
    </div>
  );
};

export default Login;
