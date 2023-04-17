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
import Checkbox from "./DataInput/Checkbox";
import Select from "./DataInput/Select";
import Input from "./DataInput/Input";
import RangeInput from "./DataInput/RangeInput";

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
    creator: {
      name: session?.user?.name ?? user.name,
      id: session?.user?.id ?? user.id,
      avatar: session?.user.avatar ?? user.avatar,
    },
    customWord: false,
    word: {
      word: "",
      translation: "",
      original: "",
    },
    roundsNumber: 1,
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
    <div className="w-full lg:w-1/2 p-4">
      <div className="form-control grid grid-cols-1 md:grid-cols-2 gap-5 text-primary-content min-w-1/2">
        <div>
          {rangeInputs.map((rangeInput: rangeType) => (
            <RangeInput
              key={rangeInput.name}
              {...rangeInput}
              value={room[rangeInput.name]}
              onChange={handleChange}
            />
          ))}
        </div>
        <div>
          {selectInput.map((select: selectType) => (
            <Select
              key={select.name}
              {...select}
              onChange={(e) =>
                setRoom({ ...room, [select.name]: e.target.value })
              }
            />
          ))}
          {checkboxes.map(
            ({ label, name, disabledFn, disabledLabel }: checkboxType) => (
              <Checkbox
                key={name}
                label={label}
                checked={room[name]}
                disabled={disabledFn(room.playersLimit)}
                disabledLabel={disabledLabel ? disabledLabel : ""}
                onChange={(e) => setRoom({ ...room, [name]: e.target.checked })}
                name={name}
              />
            )
          )}
        </div>
        <div>
          {room.customWord && (
            <Input
              value={room.word.word}
              placeholder="Word to guess"
              ariaLabel="input custom word"
              onChange={(e) =>
                setRoom({
                  ...room,
                  word: { ...room.word, word: e.target.value },
                })
              }
            />
          )}
          {room.customWord && room.language !== "english" && (
            <Input
              value={room.word.translation}
              placeholder="Translation"
              ariaLabel="input custom word translation"
              toolTip="Provide translation for word to guess, it will be shown after the game is done so other players can learn what word they guessed means"
              onChange={(e) =>
                setRoom({
                  ...room,
                  word: { ...room.word, translation: e.target.value },
                })
              }
            />
          )}
        </div>
      </div>
      <button
        aria-label={`create a lobby`}
        onClick={() => createRoom(room, socket, router, setIsLoading)}
        className="btn btn-primary  text-primary-content w-full mt-4"
      >
        {isLoading ? "Loading" : "Create a Lobby"}
      </button>
    </div>
  );
};

export default RoomCreation;
