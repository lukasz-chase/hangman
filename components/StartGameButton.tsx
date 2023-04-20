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
      className={`btn-lg text-center w-full border-2 border-primary-content  bg-neutral-focus text-primary-content uppercase ${
        isAuthor && "hover:border-accent hover:text-accent cursor-pointer"
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
