import { Room, Round, Socket } from "@/types/socket";
import React, { Dispatch, SetStateAction } from "react";
//libraries
import { toast } from "react-hot-toast";

type StartGameButtonType = {
  isLoading: boolean;
  creator: string;
  playerId: string;
  chooseWord: boolean;
  currentRound: Round;
  room: Room;
  socket: Socket;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  roomId: string;
};

const StartGameButton = ({
  isLoading,
  creator,
  playerId,
  chooseWord,
  currentRound,
  room,
  socket,
  setIsLoading,
  roomId,
}: StartGameButtonType) => {
  const isAuthor = creator === playerId;

  const buttonText = () => {
    if (isLoading) {
      return "Ładowanie";
    }
    if (chooseWord) {
      return "Oczekiwanie aż gracz wybierze hasło";
    }
    if (isAuthor) {
      return "Graj";
    }
    return "Oczekiwanie aż gospodarz rozpocznie grę";
  };

  const startTheGame = () => {
    if (currentRound.customWord && currentRound.players.length === 1) {
      return toast.error(
        "Potrzebujesz przynajmniej dwóch graczy aby zagrać z własnym hasłem"
      );
    }
    setIsLoading(true);
    room.inGame = true;
    socket!.emit("room:update", room);
    socket!.emit("startTheGame", roomId);
  };

  const disabled = !isAuthor || chooseWord;

  return (
    <button
      disabled={disabled}
      aria-label={buttonText()}
      className={`btn-lg text-center w-full border-2 border-primary-content bg-neutral-focus text-primary-content uppercase mt-4 ${
        isAuthor && "hover:border-info hover:text-info cursor-pointer"
      }
      ${
        disabled &&
        "bg-slate-600 cursor-not-allowed hover:border-primary-content hover:text-primary-content"
      }
      `}
      onClick={startTheGame}
    >
      {buttonText()}
    </button>
  );
};

export default StartGameButton;
