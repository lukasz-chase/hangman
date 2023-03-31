import { Player } from "../types/socket";
import { joinRoom } from "../utils/room";
import { memo, useContext } from "react";
import { useSession } from "next-auth/react";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";
import type { socketContextTypes, userContextTypes } from "../types/context";

type JoinLobbyProps = {
  roomId: string;
  playersLimit: number;
  players: Player[];
  language: string;
  customWord: boolean;
};

const JoinLobby = memo(
  ({ roomId, playersLimit, players, language, customWord }: JoinLobbyProps) => {
    const { data: session } = useSession();
    const { user }: userContextTypes = useContext(UserContext);
    const { socket, router }: socketContextTypes = useContext(SocketContext);

    const playerId = user.id ?? session?.user.id;
    const name = user.name ?? session?.user?.name;

    return (
      <div
        className="p-5 bg-white shadow-lg hover:shadow-black cursor-pointer rounded-md flex flex-col justify-between w-96 text-black uppercase gap-2 transition-all duration-300"
        aria-label="join a lobby"
        onClick={() =>
          joinRoom({
            players,
            playersLimit,
            roomId,
            playerId,
            name,
            router,
            socket,
          })
        }
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h5 className="text-xs">Players in lobby:</h5>
            {players.map((player) => (
              <span key={player.id} className="">
                {player.name}
              </span>
            ))}
          </div>
          <span
            className={`${
              players.length === playersLimit ? "text-red-400" : "text-black"
            }`}
          >
            {players.length}/{playersLimit}
          </span>
        </div>
        <div className="flex flex-col">
          {customWord && (
            <span className="text-xs lowercase text-black">
              Word chosen by host
            </span>
          )}
          <span className="text-sm text-black">
            word is in <b className="text-primary">{language}</b>
          </span>
        </div>
      </div>
    );
  }
);

export default JoinLobby;
