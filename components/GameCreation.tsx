"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, useContext } from "react";
//context
import { SocketContext } from "@/context/SocketContext";
import { UserContext } from "@/context/UserContext";
//descriptions
import {
  checkboxes,
  checkboxType,
  rangeInputs,
  rangeType,
  selectInput,
  selectType,
} from "@/descriptions/RoomInputs";
//types
import type { socketContextTypes, userContextTypes } from "@/types/context";
import type { roomPayload } from "@/types/socket";
//utils
import { roomClosed } from "@/utils/lobby";
import { createRoom } from "@/utils/room";
//components
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
    language: "polish",
    roundTime: 1,
    creator: {
      name: session?.user?.name ?? user.name,
      id: session?.user?.id ?? user.id,
      avatar: session?.user.image ?? user.avatar,
    },
    customWord: false,
    word: {
      word: "",
      translation: "",
      original: "",
      category: "zwierzęta",
    },
    customCategory: "",
    roundsNumber: 1,
    difficulty: 6,
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
  ) => {
    if (e.target.name === "category") {
      setRoom({
        ...room,
        word: {
          ...room.word,
          category: e.target.value,
        },
      });
    } else {
      setRoom({ ...room, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="w-full lg:w-1/2 p-4 mt-12 md:mt-0">
      <div className="form-control grid grid-cols-1 md:grid-cols-2 gap-5 text-primary-content min-w-1/2">
        <div>
          {rangeInputs.map((rangeInput: rangeType) => (
            <RangeInput
              key={rangeInput.name}
              {...rangeInput}
              value={room[rangeInput.name]}
              onChange={(e) => {
                if (
                  e.target.name === "playersLimit" &&
                  Number(e.target.value) === 1
                ) {
                  return setRoom({
                    ...room,
                    playersLimit: Number(e.target.value),
                    customWord: false,
                  });
                }
                handleChange(e);
              }}
            />
          ))}
          <div>
            {room.customWord && (
              <Input
                value={room.word.word}
                placeholder="Słowo do odgadnięcia"
                label="Słowo do odgadnięcia"
                ariaLabel="Słowo do odgadnięcia"
                onChange={(e) =>
                  setRoom({
                    ...room,
                    word: { ...room.word, word: e.target.value },
                  })
                }
              />
            )}
            {room.customWord && room.word.category === "other" && (
              <Input
                value={room.customCategory}
                placeholder="Inna kategoria"
                label="Inna kategoria"
                ariaLabel="Inna kategoria"
                maxLength={25}
                onChange={(e) =>
                  setRoom({
                    ...room,
                    customCategory: e.target.value,
                  })
                }
              />
            )}
          </div>
        </div>
        <div>
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
          {selectInput.map((select: selectType) => (
            <Select
              key={select.name}
              {...select}
              invisible={select.InvisibleFn(room.customWord)}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>
      <button
        aria-label="stworz lobby"
        onClick={() => createRoom(room, socket, router, setIsLoading)}
        className="btn btn-primary  text-primary-content w-full mt-4"
      >
        {isLoading ? "Ładowanie" : "Stwórz"}
      </button>
    </div>
  );
};

export default RoomCreation;
