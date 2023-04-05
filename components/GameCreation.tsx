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
      <div className="form-control flex flex-col gap-5 text-white min-w-[300px]">
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
        {checkboxes.map(
          ({ label, name, disabledFn, disabledLabel }: checkboxType) => (
            <div key={name}>
              <label className="label cursor-pointer">
                <span className="label-text text-white">{label}</span>
                <input
                  type="checkbox"
                  checked={room[name]}
                  aria-label={`checkbox ${name}`}
                  disabled={disabledFn(room.playersLimit)}
                  name={name}
                  className="checkbox checkbox-accent"
                  onChange={(e) =>
                    setRoom({ ...room, [name]: e.target.checked })
                  }
                />
              </label>
              {disabledFn(room.playersLimit) && (
                <span className="text-xs text-slate-400">{disabledLabel}</span>
              )}
            </div>
          )
        )}
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
            <div className="flexCenter">
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
              <div
                className="md:tooltip md:tooltip-bottom hover:tooltip-open cursor-pointer"
                data-tip="Provide translation for word to guess, it will be shown after the game is done so other players can learn what word they guessed means"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </div>
            </div>
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
