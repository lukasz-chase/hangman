import { SocketContext } from "@/context/SocketContext";
import useUserData from "@/hooks/useUserData";
import { socketContextTypes } from "@/types/context";
import { joinRoom } from "@/utils/room";
import { useContext } from "react";

const JoinRoom = ({ roomId }: { roomId: string }) => {
  const { playerId, name, playerAvatar } = useUserData();
  const { socket, router, room, currentRound }: socketContextTypes =
    useContext(SocketContext);

  const joinRoomHandler = () => {
    joinRoom({
      players: currentRound.players,
      playersLimit: room.playersLimit,
      socket,
      router,
      name,
      playerId,
      playerAvatar,
      roomId,
    });
  };
  return (
    <button className="btn btn-primary btn-wide" onClick={joinRoomHandler}>
      Dołącz do pokoju
    </button>
  );
};

export default JoinRoom;
