"use client";
import { useEffect, useState, ReactNode, createContext } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { Room, Socket } from "../types/socket";

export const roomDummy = {
  id: "",
  roomId: "",
  playersLimit: 0,
  private: false,
  roundTime: 0,
  createdAt: new Date(),
  rounds: [
    {
      vacant: false,
      language: "english",
      round: 1,
      roundWinners: [{ id: "", name: "" }],
      wordToGuessChooser: "asd",
      playersInGame: [""],
      players: [
        {
          id: "asd",
          name: "alfred",
          avatar:
            "https://res.cloudinary.com/dmv02zyyo/image/upload/v1680191676/deb7gmlw3iyq4r41kjlx.png",
          guessedLetters: ["a"],
          score: 0,
          connectedToRoom: false,
          hasChosenWord: false,
        },
      ],
      wordToGuess: {
        word: "",
        translation: "",
        original: "",
      },
      roundTime: 60,
      customWord: false,
    },
  ],
  roundsNumber: 1,
  currentRound: 1,
  inGame: false,
  creator: "",
  messages: [
    {
      playerName: "asd",
      playerId: "dfgdf",
      message: "",
      createdAt: "12:19",
      playerAvatar: "",
    },
  ],
};

const SocketContext = createContext({
  socket: null as Socket | null,
  room: roomDummy,
  setRoom: (room: any) => {},
  router: {},
  roomIsFetched: false,
  currentRound: roomDummy.rounds[0],
});

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socketUrl = "https://hangman-server-stl0.onrender.com/";
  // const socketUrl = "http://localhost:8080";
  const [room, setRoom] = useState<Room>(roomDummy);
  const [roomIsFetched, setRoomIsFetched] = useState(false);
  const [currentRound, setCurrentRound] = useState(roomDummy.rounds[0]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();
  const setRoomHandler = (room: Room) => {
    setRoomIsFetched(true);
    setRoom(room);
    setCurrentRound(room.rounds[room.currentRound]);
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
        currentRound,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
