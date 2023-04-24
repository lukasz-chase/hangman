import { toast } from "react-hot-toast";
//types
import type { Player, Room, WordToGuess, roomPayload } from "@/types/socket";

type JoinRoomProps = {
  players: Player[];
  roomId: string;
  playersLimit: number;
  playerId: string;
  playerAvatar: string;
  name: string;
  socket: any;
  router: any;
};

type WordToGuessValidationProps = {
  wordToGuess: WordToGuess;
  language: string;
  playersLimit: number;
};

export const joinRoom = ({
  players,
  roomId,
  playersLimit,
  playerId,
  playerAvatar,
  name,
  socket,
  router,
}: JoinRoomProps) => {
  const isPlayerInRoom = players.find((player) => player.id === playerId);
  if (isPlayerInRoom) {
    toast.error("you are already in the room");
    return router.replace(`/`);
  }
  const player = { name, id: playerId, avatar: playerAvatar };

  if (players.length >= playersLimit) return toast.error("room is full");
  socket.emit("room:join", { roomId, player }, (err: any) => {
    if (err) {
      router.replace(`/`);
      return toast.error(err.error);
    }
    router.replace(`/lobby/${roomId}`);
  });
};

export const customWordToGuessValidation = ({
  wordToGuess,
  language,
  playersLimit,
}: WordToGuessValidationProps) => {
  const regex = /^[a-zA-Z]+$/;
  if (wordToGuess.word.length < 2) {
    toast.error("Word has to be at least 2 letters long");
    return false;
  }
  if (wordToGuess.word.length > 45) {
    toast.error("Word can't be longer than 45 letters");
    return false;
  }
  if (language !== "english" && wordToGuess.translation) {
    toast.error("You need to provide translation");
    return false;
  }
  if (!regex.test(wordToGuess.word)) {
    toast.error("word can only contain letters from a-z");
    return false;
  }
  if (playersLimit === 1) {
    toast.error("You need at least 2 players to play with custom word");
    return false;
  }
  wordToGuess.original = wordToGuess.word;
  return true;
};

export const createRoom = (
  room: roomPayload,
  socket: any,
  router: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (
    room.customWord &&
    !customWordToGuessValidation({
      wordToGuess: room.word,
      language: room.language,
      playersLimit: Number(room.playersLimit),
    })
  ) {
    return;
  }

  setIsLoading(true);
  socket.emit("room:create", room, (err: any, roomId: string) => {
    socket.emit("room:getById", roomId);
    router.replace(`/lobby/${roomId}`);
    setIsLoading(false);
  });
};

type leaveTypes = {
  router: any;
  room: Room;
  socket: any;
  playerId: string;
  playerName: string;
};

export const leaveHandler: any = ({
  room,
  router,
  socket,
  playerId,
  playerName,
}: leaveTypes) => {
  if (!room.roomId) return router.replace("/");
  const currentRound = room.rounds[room.currentRound];
  currentRound.players = currentRound!.players.filter(
    (player) => player.id !== playerId
  );
  socket.emit("room:update", room);
  socket.emit("room:playerLeft", {
    roomId: room.roomId,
    name: playerName,
  });

  if (currentRound.players.length === 0 || room.creator === playerId)
    socket.emit("room:leave", room.roomId);

  router.replace("/");
};
