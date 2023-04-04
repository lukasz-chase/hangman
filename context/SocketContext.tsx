"use client";
import { useEffect, useState, ReactNode, createContext } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { Room, Socket } from "../types/socket";

const roomDummy = {
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
  players: [
    {
      id: "asd",
      name: "alfred",
      guessedLetters: ["a"],
      score: 0,
      connectedToRoom: false,
    },
  ],
  inGame: false,
  creator: "",
  customWord: false,
  messages: [
    {
      playerName: "asd",
      playerId: "dfgdf",
      message: "",
      createdAt: "12:19",
      playerAvatar: "",
    },
  ],
  playersInGame: [""],
};

const SocketContext = createContext({
  socket: null as Socket | null,
  room: roomDummy,
  setRoom: (room: any) => {},
  router: {},
  roomIsFetched: false,
});

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socketUrl = "https://hangman-server-stl0.onrender.com/";
  // const socketUrl = "http://localhost:8080";
  const [room, setRoom] = useState<Room>(roomDummy);
  const [roomIsFetched, setRoomIsFetched] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();
  const setRoomHandler = (room: Room) => {
    setRoomIsFetched(true);
    setRoom(room);
  };
  const errorHandler = () => {
    router.replace("/");
  };
  useEffect(() => {
    const socket = io(socketUrl);
    setSocket(socket);
    socket.on("room:getById", setRoomHandler);
    socket.on("error", errorHandler);
    return () => {
      socket.off("room:getById", setRoomHandler);
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
        roomIsFetched,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
