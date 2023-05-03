import { memo, useContext } from "react";
import { useSession } from "next-auth/react";
//types
import type { Player } from "@/types/socket";
import type { socketContextTypes, userContextTypes } from "@/types/context";
//utils
import { joinRoom } from "@/utils/room";
//context
import { UserContext } from "@/context/UserContext";
import { SocketContext } from "@/context/SocketContext";

type LobbyProps = {
  roomId: string;
  playersLimit: number;
  players: Player[];
  language: string;
  customWord: boolean;
};

const Lobby = memo(
  ({ roomId, playersLimit, players, language, customWord }: LobbyProps) => {
    const { data: session } = useSession();
    const { user }: userContextTypes = useContext(UserContext);
    const { socket, router }: socketContextTypes = useContext(SocketContext);

    const playerId = session?.user.id ?? user.id;
    const name = session?.user?.name ?? user.name;
    const playerAvatar = session?.user?.image ?? user.avatar;

    return (
      <div
        className="p-5 bg-white shadow-lg hover:shadow-black cursor-pointer rounded-md flex flex-col justify-between w-[90vw] md:w-96 text-black uppercase gap-2 transition-all duration-300"
        aria-label="dolacz do lobby"
        onClick={() =>
          joinRoom({
            players,
            playersLimit,
            roomId,
            playerId,
            playerAvatar,
            name,
            router,
            socket,
          })
        }
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h5 className="text-xs">Gracze w lobby:</h5>
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
              Slowo wybieral gospodarz
            </span>
          )}
          <span className="text-sm text-black">
            JĘZYK SŁOWA DO ODGADNIĘCIA:{" "}
            <b className="text-primary">{language}</b>
          </span>
        </div>
      </div>
    );
  }
);

export default Lobby;
