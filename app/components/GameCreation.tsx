"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import {
  checkboxes,
  checkboxType,
  rangeInputs,
  rangeType,
  selectInput,
  selectType,
} from "../descriptions/RoomInputs";
import { GuestUser } from "../types/authTypes";
import { roomPayload } from "../types/socket";
import { createRoom } from "../utils/room";

const RoomCreation = () => {
  const { data: session } = useSession();
  const { isLogged, user }: { isLogged: boolean; user: GuestUser } =
    useContext(UserContext);
  const { socket, router }: { socket: any; router: any } =
    useContext(SocketContext);

  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState<roomPayload>({
    privateRoom: false,
    playersLimit: 1,
    language: "english",
    roundTime: 1,
    author: {
      name: isLogged ? user.name : session?.user?.name,
      id: isLogged ? user.id : session?.user?.id,
    },
  });
  const roomClosed = () => {
    toast.error("room has closed");
    router.replace("/");
  };
  useEffect(() => {
    if (Object.keys(socket).length > 0) {
      socket.on("roomHasClosed", roomClosed);

      return () => {
        socket.off("roomHasClosed", roomClosed);
      };
    }
  }, []);
  const handleChange = (e: any) =>
    setRoom({ ...room, [e.target.name]: e.target.value });

  return (
    <div>
      <div className="form-control flex flex-col gap-5">
        {checkboxes.map(({ label, name }: checkboxType) => (
          <label key={name} className="label cursor-pointer">
            <span className="label-text">{label}</span>
            <input
              type="checkbox"
              checked={room[name]}
              name={name}
              className="checkbox"
              onChange={(e) => setRoom({ ...room, [name]: e.target.checked })}
            />
          </label>
        ))}
        {rangeInputs.map(({ label, name, max, min, options }: rangeType) => (
          <div key={name}>
            <h2>{label}</h2>
            <input
              type="range"
              min={min}
              max={max}
              name={name}
              value={room[name]}
              className="range"
              step="1"
              onChange={(e) => handleChange(e)}
            />
            <div className="w-full flex justify-between text-xs px-2">
              {options.map((number) => (
                <span key={number}>{number}</span>
              ))}
            </div>
          </div>
        ))}
        {selectInput.map(({ label, name, options }: selectType) => (
          <label
            key={name}
            className="label cursor-pointer flexCenter flex-col"
          >
            <span className="label-text">{label}</span>
            <select
              name={name}
              onChange={(e) => setRoom({ ...room, [name]: e.target.value })}
              className="select select-bordered w-full max-w-xs"
            >
              {options.map(({ name, value }) => (
                <option key={name} className="cursor-pointer p-5" value={value}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        ))}
        <button
          onClick={() => createRoom(room, socket, router, setIsLoading)}
          className="btn"
        >
          {isLoading ? "Loading" : "Create a Lobby"}
        </button>
      </div>
    </div>
  );
};

export default RoomCreation;
