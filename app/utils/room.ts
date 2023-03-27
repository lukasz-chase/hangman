import { toast } from "react-hot-toast";
import { Player, Room, roomPayload } from "../types/socket";

type JoinRoomProps = {
  players: Player[];
  roomId: string;
  playersLimit: number;
  playerId: string;
  name: string;
  socket: any;
  router: any;
};

export const joinRoom = ({
  players,
  roomId,
  playersLimit,
  playerId,
  name,
  socket,
  router,
}: JoinRoomProps) => {
  const isPlayerInRoom = players.find((player: any) => player.id === playerId);

  if (isPlayerInRoom) return router.replace(`/lobby/${roomId}`);

  if (players.length >= playersLimit) return toast.error("room is full");

  socket.emit(
    "room:join",
    { roomId, name, id: playerId },
    (err: any, room: any) => {
      console.log(err);
      if (err) {
        router.replace(`/`);
        return toast.error(err.error);
      }
    }
  );
};

export const createRoom = (room: roomPayload, socket: any, router: any) => {
  socket.emit("room:create", room, (err: any, roomId: string) => {
    socket.emit("room:getById", roomId);
    router.replace(`/lobby/${roomId}`);
  });
};

type leaveTypes = {
  roomId: string;
  router: any;
  rooms: Room[];
  socket: any;
  playerId: string;
  playerName: string;
};

export const leaveHandler: any = ({
  roomId,
  router,
  rooms,
  socket,
  playerId,
  playerName,
}: leaveTypes) => {
  if (!roomId) return router.replace("/");
  const room: Room = rooms.find((room: any) => room.roomId === roomId)!;
  room.players = room!.players.filter((player) => player.id !== playerId);
  socket.emit("room:update", room);
  socket.emit("room:playerLeft", {
    roomId,
    name: playerName,
  });
  if (room.players.length === 0 || room.creator === playerId)
    socket.emit("room:leave", roomId);

  router.replace("/");
};
