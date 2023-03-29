"use client";
import React, { useEffect, useState, ReactNode, createContext } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { Room, Socket } from "../types/socket";

const SocketContext = createContext({
  socket: null as Socket | null,
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

  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();
  const setRoomHandler = (payload: any) => {
    setRoom(payload);
  };
  const errorHandler = () => {
    router.replace("/");
  };
  useEffect(() => {
    console.log(process.env);
    const socket = io("http://localhost:8080");
    setSocket(socket);
    socket.on("room:get", setRoomHandler);
    socket.on("error", errorHandler);
    return () => {
      socket.off("room:get", setRoomHandler);
      socket.off("error", errorHandler);
    };
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
