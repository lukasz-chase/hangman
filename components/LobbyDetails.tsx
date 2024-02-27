"use client";
import { useContext, useEffect, useState } from "react";
//context
import { SocketContext } from "@/context/SocketContext";
//types
import type { socketContextTypes } from "@/types/context";
//utils
import {
  playerDisconnectedHandler,
  playerJoinedHandler,
  roomClosed,
} from "@/utils/lobby";
//components
import Chat from "./Chat";
import PlayersDisplay from "./PlayersDisplay";
import DetailsDisplay from "./DetailsDisplay";
import StartGameButton from "./StartGameButton";
import Loading from "./Loading";
import RoundWinners from "./RoundWinners";
import JoinRoom from "./JoinRoom";
//hooks
import useUserData from "@/hooks/useUserData";
import toast from "react-hot-toast";

const LobbyDisplay = ({ roomId }: { roomId: string }) => {
  const { playerId, name, playerAvatar } = useUserData();
  const {
    socket,
    router,
    room,
    roomIsFetched,
    currentRound,
  }: socketContextTypes = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(false);

  const isPlayerInRoom = currentRound.players.find(
    (player) => player.id === playerId
  );

  useEffect(() => {
    if (
      isPlayerInRoom &&
      isPlayerInRoom.socketId !== socket?.id &&
      roomIsFetched
    ) {
      toast.error("już jesteś w tym pokoju");
      return router.replace(`/`);
    }
  }, [roomIsFetched]);

  const startTheGameHandler = () => {
    router.replace(`/game/${roomId}`);
    setIsLoading(false);
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
        socket.off("startTheGame", startTheGameHandler);
        socket.off("room:playerJoined", playerJoinedHandler);
        socket.off("room:playerDisconnected", playerDisconnectedHandler);
        socket.off("roomHasClosed", roomHasClosed);
      };
    }
  }, [socket, roomId]);

  if (!roomIsFetched) return <Loading />;
  if (!isPlayerInRoom) return <JoinRoom roomId={roomId} />;

  return (
    <div className="flexCenter flex-col w-[95%]">
      <div className="flex xl:items-stretch w-full gap-5 flex-col xl:flex-row">
        <div className="flexCenter flex-col w-full">
          <div className="flexCenter flex-col gap-2 md:gap-5 w-full  min-h-[300px] uppercase mt-16 md:mt-10">
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
            currentRound={currentRound}
            room={room}
            socket={socket!}
            setIsLoading={setIsLoading}
            roomId={roomId}
          />
        </div>
        <div className="self-end h-full">
          <Chat
            messages={room.messages}
            playerId={playerId}
            playerName={name}
            room={room}
            socket={socket!}
            playerAvatar={playerAvatar}
            height="h-[28rem]"
          />
        </div>
      </div>

      <RoundWinners rounds={room.rounds} playerId={playerId} />
    </div>
  );
};

export default LobbyDisplay;
