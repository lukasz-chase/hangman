import type { Player } from "@/types/socket";
import { memo } from "react";
import ChooseWord from "./ChooseWord";

type PlayersDisplayType = {
  players: Player[];
  currentPlayerId: string;
  playersLimit: number;
  creator: string;
  playerToChooseWord: string;
  chooseWord: boolean;
  playerLimit: number;
};

const PlayersDisplay = memo(
  ({
    players,
    playersLimit,
    currentPlayerId,
    creator,
    playerToChooseWord,
    chooseWord,
    playerLimit,
  }: PlayersDisplayType) => {
    return (
      <div className="w-full md:h-full">
        <h1 className="text-primary-content bg-primary p-2 text-center">
          Players {players.length}/{playersLimit}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-fluid">
          {players.map((player, index) => (
            <div key={player.id} className="p-2 m-2 ">
              <div
                className={`p-2 md:p-5 text-primary-content flexCenter gap-2 flex-row md:flex-col`}
              >
                <img
                  className="h-10 w-10 rounded-full"
                  src={player.avatar}
                  alt={player.name}
                />
                <span>{player.name}</span>
                {creator === player.id && (
                  <span className="text-accent"> Host</span>
                )}
              </div>
              {playerToChooseWord === currentPlayerId &&
                playerToChooseWord === player.id &&
                chooseWord && (
                  <ChooseWord
                    playersLimit={playerLimit}
                    currentPlayerId={currentPlayerId}
                  />
                )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default PlayersDisplay;
