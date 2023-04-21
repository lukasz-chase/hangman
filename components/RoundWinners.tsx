import { Round } from "@/types/socket";
import React, { memo } from "react";

const RoundWinners = ({
  rounds,
  playerId,
}: {
  rounds: Round[];
  playerId: string;
}) => {
  return (
    <div className="grid md:grid-cols-fluid w-full">
      {rounds.map(({ roundWinners, round, wordToGuess }) => (
        <div key={round}>
          {roundWinners.length > 0 && (
            <div className="flexCenter flex-col  p-4 text-center">
              <span>round {round} winners</span>
              <div className="flexCenter flex-col">
                {roundWinners.map(({ name, id }, index) => (
                  <b
                    key={index}
                    className={`${
                      playerId === id ? "text-primary-content" : "text-white"
                    }`}
                  >
                    {name}
                  </b>
                ))}
              </div>
              <span>
                word to guess was:{" "}
                <b className="text-secondary">{wordToGuess.word}</b>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(RoundWinners);
