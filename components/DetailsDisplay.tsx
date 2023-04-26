//types
import type { Round } from "@/types/socket";
//utils
import { copyUrl } from "@/utils/lobby";
//libraries
import { memo } from "react";

type DetailsDisplayType = {
  language: string;
  customWord: boolean;
  roundTime: number;
  roundsNumber: number;
  currentRound: number;
  roomId: string;
  rounds: Round[];
  playerId: string;
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <span className="flexCenter gap-2">
    {label}
    <b className="text-info px-2">{value}</b>
  </span>
);

const DetailsDisplay = memo(
  ({
    language,
    customWord,
    roundTime,
    roundsNumber,
    currentRound,
    roomId,
    rounds,
    playerId,
  }: DetailsDisplayType) => {
    const roomUrl = `https://hangman-learning.netlify.app/lobby/${roomId}`;
    // const roomUrl = `http://localhost:3000/lobby/${roomId}`;
    return (
      <div className="flexCenter flex-col w-full">
        <div className="flex items-center justify-evenly w-full flex-col lg:flex-row p-2 h-full gap-3 md:p-5 text-md md:text-md lg:text-lg">
          <div className="flexCenter flex-col gap-2 text-primary-content text-center">
            <Detail label="Round:" value={`${currentRound}/${roundsNumber}`} />
            <div className="flexCenter flex-col">
              <Detail label="Word language:" value={`${language}`} />
              {customWord && <Detail label="word chosen by player" value="" />}
            </div>
            <Detail label="Round time:" value={`${roundTime} s`} />
          </div>
          <div className="flexCenter flex-col gap-2 text-primary-content text-center">
            <b className="text-secondary uppercase">Invite friends</b>
            <span className="text-xs md:text-md">{roomUrl}</span>
            <button
              onClick={() => copyUrl(roomUrl)}
              className="btn btn-info w-36 uppercase"
            >
              copy url
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default DetailsDisplay;
