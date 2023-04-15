import { Round } from "@/types/socket";
import React, { memo } from "react";

const RoundWinners = ({ rounds }: { rounds: Round[] }) => {
  return (
    <div className="grid md:grid-cols-fluid w-full">
      {rounds.map(({ roundWinners, round }) => (
        <div key={round}>
          {roundWinners.length > 0 && (
            <div className="flexCenter flex-col  p-4 text-center">
              <span>round {round} winners</span>
              <div className="flexCenter flex-col">
                {roundWinners.map((name, index) => (
                  <b key={index} className="text-white">
                    {name}
                  </b>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(RoundWinners);
