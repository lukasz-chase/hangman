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
};

export const Detail = ({ label, value }: { label: string; value: string }) => (
  <span className="flex justify-between gap-2 uppercase">
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
  }: DetailsDisplayType) => {
    const roomUrl = `https://hangman-learning.netlify.app/lobby/${roomId}`;
    // const roomUrl = `http://localhost:3000/lobby/${roomId}`;
    return (
      <div className="w-full">
        <div className="flex items-center justify-evenly w-full flex-col lg:flex-row p-2 h-full gap-3 md:p-5 text-md md:text-md lg:text-lg">
          <div className="flex justify-start flex-col gap-2 text-primary-content ">
            <Detail label="Runda:" value={`${currentRound}/${roundsNumber}`} />
            <Detail label="Język słowa do odgadnięcia:" value={`${language}`} />
            {customWord && (
              <Detail
                label="słowo do odgadnięcia zostało wybrane przez gracza"
                value=""
              />
            )}
            <Detail label="Czas gry:" value={`${roundTime} s`} />
          </div>
          <div className="flexCenter flex-col gap-2 text-primary-content text-center">
            <b className="text-secondary uppercase">Zaproś znajomych</b>
            <span className="text-xs md:text-md">{roomUrl}</span>
            <button
              onClick={() => copyUrl(roomUrl)}
              className="btn btn-info w-36 uppercase"
            >
              Kopiuj
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default DetailsDisplay;
