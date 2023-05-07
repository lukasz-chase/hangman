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
      return "Ładowanie";
    }
    if (chooseWord) {
      return "Oczekiwanie aż gracz wybierze słowo do odgadnięcia";
    }
    if (isAuthor) {
      return "Graj";
    }
    return "Oczekiwanie aż gospodarz rozpocznie grę";
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
