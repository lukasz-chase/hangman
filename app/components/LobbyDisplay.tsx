"use client";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import { GuestUser } from "../types/authTypes";
import { Room } from "../types/socket";
import { joinRoom } from "../utils/room";

const LobbyDisplay = ({ roomId }: { roomId: string }) => {
  const { data: session } = useSession();
  const { isLogged, user }: { isLogged: boolean; user: GuestUser } =
    useContext(UserContext);
  const { socket, router }: { socket: any; router: any } =
    useContext(SocketContext);

  const [room, setRoom] = useState<Room>({
    players: [],
    playersLimit: 1,
    private: false,
    roomId: roomId,
    roundTime: 60,
    author: "asd",
    vacant: false,
    language: "english",
    wordToGuess: {
      word: "",
      translation: "",
      original: "",
    },
    inGame: false,
    creator: "",
  });

  const playerJoinedHandler = (name: string) => {
    toast.success(`${name} has joined`);
  };
  const playerDisconnectedHandler = (name: string) => {
    toast.error(`${name} has left`);
  };

  const setRoomHandler = (room: Room) => {
    setRoom(room);
  };

  const roomClosed = () => {
    toast.error("room has closed");
    router.replace("/");
  };

  useEffect(() => {
    if (Object.keys(socket).length > 0) {
      socket.emit("room:getById", roomId);
      socket.on("startTheGame", () => router.replace(`/game/${roomId}`));
      socket.on("room:getById", setRoomHandler);
      socket.on("room:playerJoined", playerJoinedHandler);
      socket.on("room:playerDisconnected", playerDisconnectedHandler);
      socket.on("roomHasClosed", roomClosed);

      return () => {
        socket.off("room:getById", setRoomHandler);
        socket.off("room:playerJoined", playerJoinedHandler);
        socket.off("room:playerDisconnected", playerDisconnectedHandler);
        socket.off("roomHasClosed", roomClosed);
        socket.off("startTheGame", (callback: any) => callback());
      };
    }
  }, [socket]);

  const playerId = isLogged ? user.id : session?.user.id;
  const name = isLogged ? user.name : session?.user?.name;
  useEffect(() => {
    if (Object.keys(socket).length > 0) {
      joinRoom({
        players: room.players,
        playersLimit: room.playersLimit,
        socket,
        router,
        name,
        playerId,
        roomId,
      });
    }
  }, [socket]);

  const roomUrl = `http://localhost:3000/lobby/${roomId}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(roomUrl);
    toast.success("Link copied");
  };

  const isAuthor = room.creator === playerId;

  const startTheGame = () => {
    room.inGame = true;
    socket.emit("room:update", room);
    socket.emit("startTheGame", roomId);
  };

  return (
    <div className="flexCenter flex-col">
      <div className="flexCenter flex-col md:flex-row gap-2 md:gap-5  uppercase bg-white text-black">
        <div className=" w-full md:w-64 md:h-full border-b-2 md:border-r-2 md:border-b-0 border-black ">
          <h1 className="bg-black border-l-2 border-t-2 border-white text-white color-white p-2 text-center">
            Players {room.players.length}/{room.playersLimit}
          </h1>
          {room.players.map((player, index) => (
            <div
              key={player.id}
              className={`p-2 md:p-5 text-black flex justify-between ${
                index + 1 !== room.players.length && "border-b-2 border-black"
              } `}
            >
              <span>{player.name}</span>
              {room.creator === player.id && (
                <span className="text-lime-500"> Host</span>
              )}
            </div>
          ))}
        </div>
        <div className="flexCenter flex-col p-2 h-32 md:min-h-16 gap-3 md:p-5  text-xs md:text-md lg:text-lg">
          <span>
            Word language: <b className="text-cyan-500">{room.language}</b>
          </span>
          <span>{roomUrl}</span>
          <button
            onClick={copyUrl}
            className="w-36 border-2 border-black uppercase hover:bg-black hover:text-white"
          >
            copy url
          </button>
        </div>
      </div>
      <button
        disabled={!isAuthor}
        className={`w-full md:border-2 p-2 md:p-5 tracking-widest text-md md:text-xl xl:text-2xl bg-black uppercase ${
          isAuthor && "hover:text-lime-500 cursor-pointer"
        }`}
        onClick={startTheGame}
      >
        {isAuthor ? "Play" : "WAITING FOR HOST TO START THE GAME"}
      </button>
    </div>
  );
};

export default LobbyDisplay;
