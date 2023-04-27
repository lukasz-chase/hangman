"use client";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
//utils
import {
  avatarsVersion1,
  avatarsVersion2,
  avatarsVersion3,
  generateGuestUser,
} from "@/utils/login";
//components
import ImageCarousel from "./ImageCarousel";
import Input from "./DataInput/Input";
import SignButton from "./SignButton";
//types
import type { userContextTypes } from "@/types/context";

const GuestLogin = () => {
  const { setUser, setIsLogged }: userContextTypes = useContext(UserContext);
  const avatarVersionOptions = [
    avatarsVersion1,
    avatarsVersion2,
    avatarsVersion3,
  ];
  const [avatarsVersion, setAvatarsVersion] = useState(0);
  const [guestUser, setGuestUser] = useState({
    avatar: avatarsVersion1[0],
    nickname: "",
  });

  const prevImagesVersion = () => {
    setAvatarsVersion(
      (avatarsVersion - 1 + avatarVersionOptions.length) %
        avatarVersionOptions.length
    );
  };

  const nextImagesVersion = () => {
    setAvatarsVersion((avatarsVersion + 1) % avatarVersionOptions.length);
  };

  const guestLogIn = () => {
    const generatedGuestUser = generateGuestUser(
      guestUser.nickname,
      guestUser.avatar
    );
    setUser(generatedGuestUser);
    localStorage.setItem("guestUser", JSON.stringify(generatedGuestUser));
    setIsLogged(true);
  };
  return (
    <div className="flexCenter flex-col gap-5 w-full">
      <div className="flexCenter flex-col lg:gap-5">
        <button onClick={nextImagesVersion} className="text-3xl">
          {"^"}
        </button>
        <ImageCarousel
          images={avatarVersionOptions[avatarsVersion]}
          setImage={setGuestUser}
        />
        <button onClick={prevImagesVersion} className="rotate-180 text-3xl">
          {"^"}
        </button>
      </div>
      <div className="w-[90%] lg:w-80 ">
        <Input
          ariaLabel="choose nickname"
          label="nickname"
          placeholder="nickname"
          maxLength={21}
          value={guestUser.nickname}
          onChange={(e) =>
            setGuestUser({ ...guestUser, nickname: e.target.value })
          }
        />
      </div>
      <SignButton
        ariaLabel="guest sign in"
        label="guest"
        onClick={guestLogIn}
      />
    </div>
  );
};

export default GuestLogin;
