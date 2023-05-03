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
  const regex = /^[a-zA-Z ]+$/;
  if (wordToGuess.category === "other" && !customCategory) {
    toast.error("Musisz wpisać inną kategorie");
    return false;
  }
  if (wordToGuess.word.length < 2) {
    toast.error("Słowo do odgadnięcia musi mieć przynajmniej 2 litery");
    return false;
  }
  if (wordToGuess.word.length > 45) {
    toast.error("Słowo do odgadnięcia nie może mieć więcej niż 45 liter");
    return false;
  }
  if (!regex.test(wordToGuess.word)) {
    toast.error("Słowo do odgadnięcia może zawierać tylko litery od a-z");
    return false;
  }
  if (playersLimit === 1) {
    toast.error(
      "Potrzebujesz przynajmniej dwóch graczy aby zagrać z własnym słowem"
    );
    return false;
  }
  if (wordToGuess.category === "other") {
    wordToGuess.category = customCategory;
  }
  wordToGuess.original = wordToGuess.word;

  return true;
};

export const translateHandler = async (
  toTranslate: string,
  language: string
) => {
  const translated = await translate(toTranslate, {
    from: language,
    to: "pl",
  });
  return translated;
};

export const createRoom = async (
  room: roomPayload,
  socket: any,
  router: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const language =
    room.language.charAt(0).toUpperCase() + room.language.slice(1);

  room.word.translation = await translateHandler(room.word.word, language);
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

  socket.emit("room:update", room);
  socket.emit("room:playerLeft", {
    roomId: room.roomId,
    name: playerName,
  });

  if (currentRound.players.length === 0 || room.creator === playerId)
    socket.emit("room:leave", room.roomId);

  router.replace("/");
};
