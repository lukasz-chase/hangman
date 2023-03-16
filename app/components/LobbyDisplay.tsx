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
  const { socket, router }: { socket: any; room: any; router: any } =
    useContext(SocketContext);

  const [room, setRoom] = useState<Room>({
    players: [],
    playersLimit: 1,
    private: false,
    roomId: roomId,
    roundTime: 60,
    vacant: false,
    wordToGuess: "",
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
  useEffect(() => {
    if (Object.keys(socket).length > 0) {
      socket.emit("room:getById", roomId);

      socket.on("room:getById", setRoomHandler);
      socket.on("room:playerJoined", playerJoinedHandler);
      socket.on("room:playerDisconnected", playerDisconnectedHandler);

      return () => {
        socket.off("room:getById", setRoomHandler);
        socket.off("room:playerJoined", playerJoinedHandler);
        socket.off("room:playerDisconnected", playerDisconnectedHandler);
      };
    }
  }, [socket]);

  useEffect(() => {
    const playerId = isLogged ? user.id : session?.user.id;
    const name = isLogged ? user.name : session?.user?.name;

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

  return (
    <div className="flexCenter flex-col">
      <div className="flexCenter gap-5 uppercase bg-white text-black">
        <div className="w-64 border-r-2 border-black">
          <h1 className="bg-black border-l-2 border-t-2 border-white text-white color-white p-2 text-center">
            Players {room.players.length}/{room.playersLimit}
          </h1>
          {room.players.map((player) => (
            <div key={player.id} className="p-5 text-black ">
              {player.name}
            </div>
          ))}
        </div>
        <div className="flexCenter flex-col p-5 ">
          <span>{roomUrl}</span>
          <button
            onClick={copyUrl}
            className="w-36 border-2 border-black uppercase hover:bg-black hover:text-white"
          >
            copy url
          </button>
        </div>
      </div>
      <button className="w-full border-2 p-4 tracking-widest text-2xl bg-black hover:text-lime-500 uppercase">
        Play
      </button>
    </div>
  );
};

export default LobbyDisplay;
