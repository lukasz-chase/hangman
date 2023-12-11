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
    toast.error("już jesteś w tym pokoju");
    router.replace(`/`);
    return;
  }
  if (players.length >= playersLimit) {
    toast.error("pokój jest pełny");
    router.replace(`/`);
    return;
  }

  const player = { name, id: playerId, avatar: playerAvatar };

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
  playersLimit,
  customCategory,
}: WordToGuessValidationProps) => {
  const regex = /^[a-zA-Z ]+$/;
  if (wordToGuess.category === "Inna" && !customCategory) {
    toast.error("Musisz wpisać inną kategorie");
    return false;
  }
  if (wordToGuess.word.length < 2) {
    toast.error("Hasło musi mieć przynajmniej 2 litery");
    return false;
  }
  if (wordToGuess.word.length > 45) {
    toast.error("Hasło nie może mieć więcej niż 45 liter");
    return false;
  }
  if (!regex.test(wordToGuess.word)) {
    toast.error("Hasło może zawierać tylko litery od a-z");
    return false;
  }
  if (playersLimit === 1) {
    toast.error(
      "Potrzebujesz przynajmniej dwóch graczy aby zagrać z własnym słowem"
    );
    return false;
  }
  if (wordToGuess.category === "Inna") {
    wordToGuess.category = customCategory;
  }
  wordToGuess.original = wordToGuess.word;

  return true;
};

export const translateHandler = async (
  toTranslate: string,
  language: string
) => {
  let translatedLanguage = "";
  switch (language) {
    case "polski":
      translatedLanguage = "polish";
      break;
    case "angielski":
      translatedLanguage = "english";
      break;
    case "hiszpański":
      translatedLanguage = "spanish";
      break;
    case "niemiecki":
      translatedLanguage = "german";
      break;
    case "francuski":
      translatedLanguage = "french";
      break;
    default:
      translatedLanguage = "polish";
      break;
  }
  const translated = await translate(toTranslate, {
    from: translatedLanguage,
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
      playersLimit: Number(room.playersLimit),
      customCategory: room.customCategory,
    })
  ) {
    return;
  }

  setIsLoading(true);
  socket.emit("room:create", room, (err: any, roomId: string) => {
    socket.emit("room:getById", roomId);
    router.push(`/lobby/${roomId}`);
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
  currentRound.vacant = true;
  socket.emit("room:update", room);
  socket.emit("room:playerLeft", {
    roomId: room.roomId,
    name: playerName,
  });

  if (currentRound.players.length === 0 || room.creator === playerId)
    socket.emit("room:leave", room.roomId);

  router.replace("/");
};
