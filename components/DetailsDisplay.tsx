import { Round } from "@/types/socket";
import { copyUrl } from "@/utils/lobby";
import { memo } from "react";
import RoundWinners from "./RoundWinners";

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
      <div className="flexCenter flex-col min-w-full md:min-w-[400px] lg:min-w-[600px]">
        <div className="flexCenter flex-col lg:flex-row p-2 h-full   gap-3 md:p-5  text-md md:text-md lg:text-lg">
          <div className="flexCenter flex-col gap-2 text-primary-content">
            <span>
              Round:
              <b className="text-info lowercase px-2">
                {currentRound}/{roundsNumber}
              </b>
            </span>
            <div className="flexCenter flex-col">
              <span>
                Word language:<b className="text-info px-2">{language}</b>
              </span>
              {customWord && (
                <span className="text-sm lowercase">word chosen by player</span>
              )}
            </div>
            <span>
              Round time:
              <b className="text-info lowercase px-2">{roundTime}s</b>
            </span>
          </div>
          <div className="flexCenter flex-col gap-2 text-primary-content">
            <b className="text-info uppercase">Invite friends</b>
            <span className="text-xs md:text-md">{roomUrl}</span>
            <button
              onClick={() => copyUrl(roomUrl)}
              className="btn btn-info w-36 uppercase"
            >
              copy url
            </button>
          </div>
        </div>
        <RoundWinners rounds={rounds} />
      </div>
    );
  }
);

export default DetailsDisplay;
