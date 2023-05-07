//types
import type { Player, Room, Round, Socket } from "@/types/socket";

type NewRoundTypes = {
  room: Room;
  currentRound: Round;
  player: Player | undefined;
  socket: Socket | null;
  winners: Player[] | { name: string; id: string }[];
};
export const createNewRound = ({
  room,
  currentRound,
  player,
  socket,
  winners,
}: NewRoundTypes) => {
  room.rounds[room.currentRound] = {
    ...currentRound,
    roundWinners: winners.map((winner) => ({
      name: winner.name,
      id: winner.id,
    })),
  };

  const playersThatDidntChooseWord = currentRound.players.filter(
    (player) => !player.hasChosenWord
  );

  if (playersThatDidntChooseWord.length === 0) {
    currentRound.players.map((player) => (player.hasChosenWord = false));
  }
  const newPlayerToChoseWord =
    playersThatDidntChooseWord[
      Math.floor(Math.random() * playersThatDidntChooseWord.length)
    ];

  room.currentRound++;
  room.inGame = false;
  room.rounds[room.currentRound] = {
    ...currentRound,
    language: "choosing",
    vacant: true,
    roundTime: room.roundTime,
    players: [],
    wordToGuessChooser:
      playersThatDidntChooseWord.length === 0
        ? player!.id
        : newPlayerToChoseWord.id,
    roundWinners: [],
    round: room.currentRound + 1,
    playersInGame: [],
    customWord: false,
    wordToGuess: {
      word: "1",
      translation: "1",
      original: "1",
      category: "choosing",
    },
  };
  socket?.emit("room:update", room);
  socket?.emit("room:newRound", {
    roomId: room.roomId,
    roundNumber: room.currentRound,
  });
};
