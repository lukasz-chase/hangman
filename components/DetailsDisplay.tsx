import { Round } from "@/types/socket";
import { copyUrl } from "@/utils/lobby";
import { memo } from "react";

type DetailsDisplayType = {
  language: string;
  customWord: boolean;
  roundTime: number;
  roundsNumber: number;
  currentRound: number;
  roomId: string;
  rounds: Round[];
};

const DetailsDisplay = memo(
  ({
    language,
    customWord,
    roundTime,
    roundsNumber,
    currentRound,
    roomId,
    rounds,
  }: DetailsDisplayType) => {
    const roomUrl = `https://hangman-learning.netlify.app/lobby/${roomId}`;
    // const roomUrl = `http://localhost:3000/lobby/${roomId}`;
    return (
      <div className="flexCenter flex-col p-2 h-full min-w-full md:min-w-[400px] lg:min-w-[600px] gap-3 md:p-5  text-md md:text-md lg:text-lg">
        <div className="flexCenter flex-col gap-2 text-white">
          <span>
            Round
            <b className="text-info lowercase">
              {" "}
              {currentRound}/{roundsNumber}{" "}
            </b>
          </span>
          <div className="flexCenter">
            <span>
              Word language: <b className="text-info">{language}</b>
            </span>
            {customWord && (
              <span className="text-sm lowercase">
                Word has been chosen by host
              </span>
            )}
          </div>
          <span>
            Round time: <b className="text-info lowercase">{roundTime}s</b>
          </span>
        </div>
        <span className="text-xs md:text-md">{roomUrl}</span>
        <button
          onClick={() => copyUrl(roomUrl)}
          className="btn btn-info w-36 uppercase"
        >
          copy url
        </button>
        <div className="grid md:grid-cols-fluid">
          {rounds.map(({ roundWinner, round }) => (
            <>
              {roundWinner && (
                <div className="flexCenter flex-col border-2 border-accent p-2">
                  <span>round {round} winner</span>
                  <b className="text-white">{roundWinner}</b>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    );
  }
);

export default DetailsDisplay;
