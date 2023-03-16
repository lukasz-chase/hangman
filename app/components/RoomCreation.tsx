"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import { GuestUser } from "../types/authTypes";
import { roomPayload } from "../types/socket";
import { createRoom } from "../utils/room";

const RoomCreation = () => {
  const { data: session } = useSession();
  const { isLogged, user }: { isLogged: boolean; user: GuestUser } =
    useContext(UserContext);
  const { socket, router }: { socket: any; router: any } =
    useContext(SocketContext);

  const [room, setRoom] = useState<roomPayload>({
    privateRoom: false,
    playersLimit: 1,
    wordToGuess: "",
    randomWord: false,
    roundTime: 1,
    author: {
      name: isLogged ? user.name : session?.user?.name,
      id: isLogged ? user.id : session?.user?.id,
    },
  });

  const handleChange = (e: any) =>
    setRoom({ ...room, [e.target.name]: e.target.value });

  return (
    <div>
      <div className="form-control flex flex-col gap-5">
        <label className="label cursor-pointer">
          <span className="label-text">Private</span>
          <input
            type="checkbox"
            checked={room.privateRoom}
            name="privateRoom"
            className="checkbox"
            onChange={(e) =>
              setRoom({ ...room, privateRoom: e.target.checked })
            }
          />
        </label>
        <div>
          <h2>Number of players</h2>
          <input
            type="range"
            min="1"
            max="5"
            name="playersLimit"
            value={room.playersLimit}
            className="range"
            step="1"
            onChange={(e) => handleChange(e)}
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
        <div>
          <h2>Round time (in minutes)</h2>
          <input
            type="range"
            min="1"
            max="3"
            name="roundTime"
            value={room.roundTime}
            className="range"
            step="1"
            onChange={(e) => handleChange(e)}
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
        </div>
        <div>
          <input
            disabled={room.randomWord}
            type="text"
            placeholder="Word to guess"
            name="wordToGuess"
            maxLength={20}
            value={room.wordToGuess}
            onChange={(e) => handleChange(e)}
            className="input input-bordered w-full max-w-xs"
          />
          <span
            className={`${
              room.wordToGuess.length >= 20 ? "text-red-700" : "text-white"
            }}`}
          >
            {room.wordToGuess.length}/20
          </span>
        </div>
        <div>
          <label className="label cursor-pointer">
            <span className="label-text">Random word</span>
            <input
              type="checkbox"
              name="randomWord"
              checked={room.randomWord}
              className="checkbox"
              onChange={(e) =>
                setRoom({
                  ...room,
                  randomWord: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <button
          onClick={() => createRoom(room, socket, router)}
          className="btn"
          disabled={!room.wordToGuess && !room.randomWord}
        >
          Create a Lobby
        </button>
      </div>
    </div>
  );
};

export default RoomCreation;
