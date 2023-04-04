"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import type { socketContextTypes, userContextTypes } from "../types/context";
import {
  copyUrl,
  playerDisconnectedHandler,
  playerJoinedHandler,
  roomClosed,
} from "../utils/lobby";
import { joinRoom } from "../utils/room";
import Chat from "./Chat";

const LobbyDisplay = ({ roomId }: { roomId: string }) => {
  const { data: session } = useSession();
  const { user }: userContextTypes = useContext(UserContext);
  const { socket, router, room, roomIsFetched }: socketContextTypes =
    useContext(SocketContext);

  const [isLoading, setIsLoading] = useState(false);

  const playerId = session?.user.id ?? user.id;
  const name = session?.user?.name ?? user.name;
  const playerAvatar = session?.user?.image ?? user.avatar;

  const roomUrl = `https://hangman-learning.netlify.app//lobby/${roomId}`;
  // const roomUrl = `http://localhost:3000/lobby/${roomId}`;
  const isAuthor = room?.creator === playerId;

  const startTheGameHandler = () => {
    router.replace(`/game/${roomId}`);
    setIsLoading(false);
  };

  const startTheGame = () => {
    if (room.customWord && room.players.length === 1) {
      return toast.error("you can't play by yourself with custom word");
    }
    setIsLoading(true);
    room.inGame = true;
    socket!.emit("room:update", room);
    socket!.emit("startTheGame", roomId);
  };
  const roomHasClosed = () => roomClosed(router);

  useEffect(() => {
    if (socket) {
      socket.emit("room:getById", roomId);
      socket.on("startTheGame", startTheGameHandler);
      socket.on("room:playerJoined", playerJoinedHandler);
      socket.on("room:playerDisconnected", playerDisconnectedHandler);
      socket.on("roomHasClosed", roomHasClosed);

      return () => {
        socket.off("room:playerJoined", playerJoinedHandler);
        socket.off("room:playerDisconnected", playerDisconnectedHandler);
        socket.off("roomHasClosed", roomHasClosed);
        socket.off("startTheGame", startTheGameHandler);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket && roomIsFetched) {
      const isPlayerInRoom = room.players.find(
        (player) => player.id === playerId
      );
      const playerIndex = room.players.findIndex(
        (player) => player.id === playerId
      );
      if (isPlayerInRoom && !isPlayerInRoom.connectedToRoom) {
        room.players[playerIndex].connectedToRoom = true;
        socket.emit("room:update", room);
        return;
      } else if (isPlayerInRoom && isPlayerInRoom.connectedToRoom) {
        toast.error("you are already in the room");
        return router.replace(`/`);
      }

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
  }, [socket, roomIsFetched]);
  // if (!room && router) return router.replace("/");
  return (
    <div className="flexCenter xl:items-stretch gap-5 flex-col xl:flex-row min-h-[300px]">
      <div className="flexCenter flex-col">
        <div className="flexCenter flex-col md:flex-row gap-2 md:gap-5 min-h-[300px]  uppercase bg-white text-black">
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
                {room?.creator === player.id && (
                  <span className="text-primary"> Host</span>
                )}
              </div>
            ))}
          </div>
          <div className="flexCenter flex-col p-2 h-full min-w-full md:min-w-[400px] lg:min-w-[600px] gap-3 md:p-5  text-xs md:text-md lg:text-lg">
            <div className="flex-col flexCenter">
              <span>
                Word language: <b className="text-info">{room.language}</b>
              </span>
              {room.customWord && (
                <span className="text-sm lowercase">
                  Word has been chosen by host
                </span>
              )}
            </div>
            <span>
              Round time:{" "}
              <b className="text-info lowercase">{room.roundTime}s</b>
            </span>
            <span className="text-xs md:text-md">{roomUrl}</span>
            <button
              onClick={() => copyUrl(roomUrl)}
              className="btn btn-info w-36 uppercase"
            >
              copy url
            </button>
          </div>
        </div>
        <button
          disabled={!isAuthor}
          aria-label="start the game"
          className={`w-full md:border-2 p-2 md:p-5 tracking-widest text-md md:text-xl xl:text-2xl bg-black uppercase ${
            isAuthor && "hover:text-success cursor-pointer"
          }`}
          onClick={startTheGame}
        >
          {isLoading ? (
            "Loading"
          ) : (
            <div>
              {isAuthor ? "Play" : "WAITING FOR HOST TO START THE GAME"}
            </div>
          )}
        </button>
      </div>
      <Chat
        messages={room.messages}
        playerId={playerId}
        playerName={name}
        roomId={roomId}
        socket={socket!}
        playerAvatar={playerAvatar}
      />
    </div>
  );
};

export default LobbyDisplay;
