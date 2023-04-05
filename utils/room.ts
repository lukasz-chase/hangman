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
  const isPlayerInRoom = players.find((player) => player.id === playerId);

  if (isPlayerInRoom) {
    toast.error("you are already in the room");
    return router.replace(`/`);
  }

  if (players.length >= playersLimit) return toast.error("room is full");
  socket.emit("room:join", { roomId, name, id: playerId }, (err: any) => {
    if (err) {
      router.replace(`/`);
      return toast.error(err.error);
    }
    router.replace(`/lobby/${roomId}`);
  });
};

export const createRoom = (
  room: roomPayload,
  socket: any,
  router: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (Number(room.playersLimit) === 1 && room.customWord) {
    return toast.error("You need at least 2 players to play with custom word");
  }
  if (room.customWord) {
    const regex = /^[a-zA-Z]+$/;
    if (room.word.word.length < 2)
      return toast.error("Word has to be at least 2 letters long");
    if (room.word.word.length > 45)
      return toast.error("Word can't be longer than 45 letters");
    if (room.language !== "english" && !room.word.translation)
      return toast.error("You need to provide translation");
    if (!regex.test(room.word.word))
      return toast.error("word can only contain letters from a-z");
    if (room.playersLimit === 1)
      return toast.error("you can't play by yourself with custom word");
    room.word.original = room.word.word;
  }
  setIsLoading(true);
  socket.emit("room:create", room, (err: any, roomId: string) => {
    socket.emit("room:getById", roomId);
    router.replace(`/lobby/${roomId}`);
    setIsLoading(false);
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
