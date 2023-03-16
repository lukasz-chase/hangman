"use client";
import { signIn } from "next-auth/react";
import { useContext, useEffect } from "react";
import short from "short-uuid";
import { UserContext } from "../context/UserContext";
import avatar1 from "../../assets/avatar-1.png";
import avatar2 from "../../assets/avatar-2.png";
import avatar3 from "../../assets/avatar-3.png";
import avatar4 from "../../assets/avatar-4.png";

export const gameNames = ["Alfred", "Wizard", "Dragon", "Robert", "King"];

function Login() {
  const { setUser, setIsLogged }: { setUser: any; setIsLogged: any } =
    useContext(UserContext);
  const avatars = [avatar1, avatar2, avatar3, avatar4];
  const name = gameNames[Math.floor(Math.random() * gameNames.length)];
  const guestUser = {
    id: short().generate(),
    name,
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
  };
  const guestLogIn = () => {
    setUser(guestUser);
    setIsLogged(true);
  };

  return (
    <div className="h-screen flex flex-col items-center gap-5 justify-center text-center">
      <button onClick={() => signIn()} className="signButton">
        Sign in with google
      </button>
      <button className="signButton" onClick={guestLogIn}>
        Sign in as guest
      </button>
    </div>
  );
}

export default Login;
