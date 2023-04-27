import { memo } from "react";
import Image from "next/image";
//types
import type { Player } from "@/types/socket";
//components
import ChooseWord from "./ChooseWord";
//animation
import { motion } from "framer-motion";

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
        <div className="grid grid-cols-1 xl:grid-cols-fluid">
          {players.map((player) => (
            <motion.div
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              key={player.id}
              className="xl:p-2 xl:m-2"
            >
              <div
                className={`p-2 md:p-5 text-primary-content flexCenter text-center gap-2 flex-row md:flex-col text-xs`}
              >
                <Image
                  height={40}
                  width={40}
                  className="rounded-full"
                  src={player.avatar}
                  alt={player.name}
                />
                <span
                  className={`${
                    currentPlayerId === player.id && "text-secondary"
                  }`}
                >
                  {currentPlayerId === player.id
                    ? `${player.name} (YOU)`
                    : player.name}
                </span>
                {creator === player.id && (
                  <span className="text-accent">Host</span>
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
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
);

export default PlayersDisplay;
