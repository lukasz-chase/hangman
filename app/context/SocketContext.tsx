"use client";
import React, { useEffect, useState, ReactNode, createContext } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { Room } from "../types/socket";

const SocketContext = createContext({
  socket: {},
  room: {
    roomId: "",
    playersLimit: 0,
    wordToGuess: {
      word: "",
      translation: "",
      original: "",
    },
    vacant: false,
    private: false,
    language: "english",
    author: "asd",
    roundTime: 0,
    players: [{ id: "asd", name: "alfred", guessedLetters: ["a"], score: 0 }],
    inGame: false,
    creator: "",
  },
  setRoom: (room: any) => {},
  router: {},
});

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [room, setRoom] = useState<Room>({
    roomId: "",
    playersLimit: 0,
    wordToGuess: {
      word: "",
      translation: "",
      original: "",
    },
    vacant: false,
    private: false,
    language: "english",
    author: "asd",
    roundTime: 0,
    players: [{ id: "asd", name: "alfred", guessedLetters: ["a"], score: 0 }],
    inGame: false,
    creator: "",
  });

  const [socket, setSocket] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const socket = io("http://localhost:8080");
    setSocket(socket);
    socket.on("room:get", (payload: any) => {
      setRoom(payload);
    });
  }, []);
  return (
    <SocketContext.Provider
      value={{
        socket,
        room,
        setRoom,
        router,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
