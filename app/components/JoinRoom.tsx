import { Player } from "../types/socket";
import { joinRoom } from "../utils/room";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { GuestUser } from "../types/authTypes";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";

type JoinRoomProps = {
  roomId: string;
  playersLimit: number;
  players: Player[];
};

const JoinRoom = ({ roomId, playersLimit, players }: JoinRoomProps) => {
  const { data: session } = useSession();
  const { isLogged, user }: { isLogged: boolean; user: GuestUser } =
    useContext(UserContext);
  const { socket, router }: { socket: any; room: any; router: any } =
    useContext(SocketContext);
  const roomName = roomId.split("-")[1];
  const playerId = isLogged ? user.id : session?.user.id;
  const name = isLogged ? user.name : session?.user?.name;

  return (
    <div
      className="p-5 bg-white cursor-pointer rounded-md flex flex-col justify-between w-96 text-black uppercase gap-2"
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
        <span className="text-lg text-lime-500">{roomName}</span>
        <span
          className={`${
            players.length === playersLimit ? "text-red-400" : "text-black"
          }`}
        >
          {players.length}/{playersLimit}
        </span>
      </div>
      <div className="flex flex-col">
        <h5 className="text-xs">Players in lobby:</h5>
        {players.map((player) => (
          <span key={player.id} className="">
            {player.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JoinRoom;
