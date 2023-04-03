"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useContext } from "react";
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
import type { socketContextTypes, userContextTypes } from "../types/context";
import type { roomPayload } from "../types/socket";
import { roomClosed } from "../utils/lobby";
import { createRoom } from "../utils/room";

const RoomCreation = () => {
  const { data: session } = useSession();
  const { user }: userContextTypes = useContext(UserContext);
  const { socket, router }: socketContextTypes = useContext(SocketContext);

  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState<roomPayload>({
    privateRoom: false,
    playersLimit: 1,
    language: "english",
    roundTime: 1,
    author: {
      name: session?.user?.name ?? user.name,
      id: session?.user?.id ?? user.id,
    },
    customWord: false,
    word: {
      word: "",
      translation: "",
      original: "",
    },
  });

  const roomHasClosed = () => roomClosed(router);

  useEffect(() => {
    if (socket) {
      socket.on("roomHasClosed", roomHasClosed);

      return () => {
        socket.off("roomHasClosed", roomHasClosed);
      };
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setRoom({ ...room, [e.target.name]: e.target.value });

  return (
    <div>
      <div className="form-control flex flex-col gap-5 text-white">
        {rangeInputs.map(({ label, name, max, min, options }: rangeType) => (
          <div key={name}>
            <h2>{label}</h2>
            <input
              type="range"
              aria-label={`input ${name}`}
              min={min}
              max={max}
              name={name}
              value={room[name]}
              className="range range-accent"
              step="1"
              onChange={handleChange}
            />
            <div className="w-full flex justify-between text-xs px-2">
              {options.map((number) => (
                <span key={number}>{number}</span>
              ))}
            </div>
          </div>
        ))}
        {checkboxes.map(({ label, name }: checkboxType) => (
          <label key={name} className="label cursor-pointer">
            <span className="label-text text-white">{label}</span>
            <input
              type="checkbox"
              checked={room[name]}
              aria-label={`checkbox ${name}`}
              name={name}
              className="checkbox checkbox-accent"
              onChange={(e) => setRoom({ ...room, [name]: e.target.checked })}
            />
          </label>
        ))}
        {selectInput.map(({ label, name, options }: selectType) => (
          <div key={name} className="form-control w-full max-w-xs">
            <label className="label cursor-pointer flexCenter flex-col text-white">
              <span className="label-text">{label}</span>
              <select
                name={name}
                aria-label={`select ${name}`}
                onChange={(e) => setRoom({ ...room, [name]: e.target.value })}
                className="select select-bordered w-full max-w-xs"
              >
                {options.map(({ name, value }) => (
                  <option
                    key={name}
                    aria-label={`option ${name}`}
                    className="cursor-pointer p-5"
                    value={value}
                  >
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
        {room.customWord && (
          <div className="form-control w-full max-w-xs">
            <input
              type="text"
              aria-label={`input custom word`}
              placeholder="Word to guess"
              className="input input-bordered w-full max-w-xs"
              value={room.word.word}
              onChange={(e) =>
                setRoom({
                  ...room,
                  word: { ...room.word, word: e.target.value },
                })
              }
            />
          </div>
        )}
        {room.customWord && room.language !== "english" && (
          <div className="form-control w-full max-w-xs">
            <label className="label pt-0">
              <span className="label-text">Translation to english</span>
            </label>
            <input
              type="text"
              aria-label={`input custom word translation`}
              placeholder="Translation"
              className="input input-bordered w-full max-w-xs"
              value={room.word.translation}
              onChange={(e) =>
                setRoom({
                  ...room,
                  word: { ...room.word, translation: e.target.value },
                })
              }
            />
          </div>
        )}
        <button
          aria-label={`create a lobby`}
          onClick={() => createRoom(room, socket, router, setIsLoading)}
          className="btn btn-primary  text-white"
        >
          {isLoading ? "Loading" : "Create a Lobby"}
        </button>
      </div>
    </div>
  );
};

export default RoomCreation;
