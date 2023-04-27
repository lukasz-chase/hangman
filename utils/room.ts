import { toast } from "react-hot-toast";
//types
import type { Player, Room, WordToGuess, roomPayload } from "@/types/socket";
//translation
import translate from "translate";

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
  customCategory: string;
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
  customCategory,
}: WordToGuessValidationProps) => {
  const regex = /^[a-zA-Z]+$/;
  if (wordToGuess.category === "other" && !customCategory) {
    toast.error("You need to specify custom category");
    return false;
  }
  if (wordToGuess.word.length < 2) {
    toast.error("Word has to be at least 2 letters long");
    return false;
  }
  if (wordToGuess.word.length > 45) {
    toast.error("Word can't be longer than 45 letters");
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
  if (wordToGuess.category === "other") {
    wordToGuess.category = customCategory;
  }
  wordToGuess.original = wordToGuess.word;

  return true;
};

export const createRoom = async (
  room: roomPayload,
  socket: any,
  router: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const language =
    room.language.charAt(0).toUpperCase() + room.language.slice(1);

  const translation = await translate(room.word.word, { from: language });
  room.word.translation = translation;
  if (
    room.customWord &&
    !customWordToGuessValidation({
      wordToGuess: room.word,
      language: room.language,
      playersLimit: Number(room.playersLimit),
      customCategory: room.customCategory,
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
  console.log(room);
  socket.emit("room:update", room);
  socket.emit("room:playerLeft", {
    roomId: room.roomId,
    name: playerName,
  });

  if (currentRound.players.length === 0 || room.creator === playerId)
    socket.emit("room:leave", room.roomId);

  router.replace("/");
};
