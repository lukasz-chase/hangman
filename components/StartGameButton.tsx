import React from "react";

type StartGameButtonType = {
  isLoading: boolean;
  creator: string;
  playerId: string;
  chooseWord: boolean;
  startTheGame: () => void;
};

const StartGameButton = ({
  isLoading,
  creator,
  playerId,
  chooseWord,
  startTheGame,
}: StartGameButtonType) => {
  const isAuthor = creator === playerId;

  const buttonText = () => {
    if (isLoading) {
      return "Loading";
    }
    if (chooseWord) {
      return "waiting for player to choose word to guess";
    }
    if (isAuthor) {
      return "Play";
    }
    return "WAITING FOR HOST TO START THE GAME";
  };
  const disabled = !isAuthor || chooseWord;

  return (
    <button
      disabled={disabled}
      aria-label="start the game"
      className={`w-full md:border-2 p-2 md:p-5 tracking-widest text-md md:text-lg xl:text-xl bg-black uppercase ${
        isAuthor && "hover:text-success cursor-pointer"
      }
      ${disabled && "bg-slate-600 cursor-not-allowed"}
      `}
      onClick={startTheGame}
    >
      {buttonText()}
    </button>
  );
};

export default StartGameButton;
