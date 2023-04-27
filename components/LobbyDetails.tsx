"use client";
import { useContext, useEffect, useState } from "react";
//context
import { SocketContext } from "@/context/SocketContext";
import { UserContext } from "@/context/UserContext";
//libraries
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
//types
import type { socketContextTypes, userContextTypes } from "@/types/context";
//utils
import {
  playerDisconnectedHandler,
  playerJoinedHandler,
  roomClosed,
} from "@/utils/lobby";

import { joinRoom } from "@/utils/room";
//components
import Chat from "./Chat";
import PlayersDisplay from "./PlayersDisplay";
import DetailsDisplay from "./DetailsDisplay";
import StartGameButton from "./StartGameButton";
import Loading from "./Loading";
import RoundWinners from "./RoundWinners";

const LobbyDisplay = ({ roomId }: { roomId: string }) => {
  const { data: session } = useSession();
  const { user }: userContextTypes = useContext(UserContext);
  const {
    socket,
    router,
    room,
    roomIsFetched,
    currentRound,
  }: socketContextTypes = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(false);

  const playerId = session?.user.id ?? user.id;
  const name = session?.user?.name ?? user.name;
  const playerAvatar = session?.user?.image ?? user.avatar;

  const startTheGameHandler = () => {
    router.replace(`/game/${roomId}`);
    setIsLoading(false);
  };

  const startTheGame = () => {
    if (currentRound.customWord && currentRound.players.length === 1) {
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
      const isPlayerInRoom = currentRound.players.find(
        (player) => player.id === playerId
      );
      const playerIndex = currentRound.players.findIndex(
        (player) => player.id === playerId
      );
      if (isPlayerInRoom && !isPlayerInRoom.connectedToRoom) {
        currentRound.players[playerIndex].connectedToRoom = true;
        socket.emit("room:update", room);
        return;
      } else if (isPlayerInRoom && isPlayerInRoom.connectedToRoom) {
        toast.error("you are already in the room");
        return router.replace(`/`);
      }
      joinRoom({
        players: currentRound.players,
        playersLimit: room.playersLimit,
        socket,
        router,
        name,
        playerId,
        playerAvatar,
        roomId,
      });
    }
  }, [socket, roomIsFetched]);

  if (!roomIsFetched) return <Loading />;

  return (
    <div className="flexCenter flex-col w-full">
      <div className="flex xl:items-stretch gap-5 flex-col xl:flex-row min-h-[300px]">
        <div className="flexCenter flex-col">
          <div className="flexCenter flex-col gap-2 md:gap-5 w-[90vw] lg:w-[65vw] min-h-[300px] uppercase">
            <DetailsDisplay
              customWord={currentRound.customWord}
              language={currentRound.language}
              roomId={roomId}
              roundTime={room.roundTime}
              roundsNumber={room.roundsNumber}
              currentRound={room.currentRound + 1}
            />
            <PlayersDisplay
              creator={room.creator}
              players={currentRound.players}
              playersLimit={room.playersLimit}
              playerToChooseWord={currentRound.wordToGuessChooser}
              chooseWord={currentRound.wordToGuess.word === "1"}
              playerLimit={room.playersLimit}
              currentPlayerId={playerId}
            />
          </div>
          <StartGameButton
            creator={room.creator}
            isLoading={isLoading}
            playerId={playerId}
            chooseWord={currentRound.wordToGuess.word === "1"}
            startTheGame={startTheGame}
          />
        </div>
        <div className="self-end">
          <Chat
            messages={room.messages}
            playerId={playerId}
            playerName={name}
            room={room}
            socket={socket!}
            playerAvatar={playerAvatar}
          />
        </div>
      </div>
      <RoundWinners rounds={room.rounds} playerId={playerId} />
    </div>
  );
};

export default LobbyDisplay;
