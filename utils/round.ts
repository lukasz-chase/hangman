//types
import type { Player, Room, Round, Socket } from "@/types/socket";

type NewRoundTypes = {
  room: Room;
  currentRound: Round;
  player: Player | undefined;
  socket: Socket | null;
  winners: Player[] | { name: string; id: string }[];
};
const playersThatDidntChooseWordHandler = (
  currentRound: Round,
  rounds: Round[]
) => {
  const players = currentRound.players;
  const playersThatChosenWord: string[] = [];
  for (let i = 0; i < rounds.length; i++) {
    const playerChosenWord = rounds[i].players.filter(
      (p) => p.hasChosenWord === true
    );
    if (playerChosenWord[0]) {
      playersThatChosenWord.push(playerChosenWord[0].id);
    }
  }
  const availablePlayers = players.filter((player) => {
    return !playersThatChosenWord.some((id) => id === player.id);
  });

  return availablePlayers;
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

  const playersThatDidntChooseWord = playersThatDidntChooseWordHandler(
    currentRound,
    room.rounds
  );
  if (playersThatDidntChooseWord.length === 0) {
    for (let i = 0; i < room.rounds.length; i++) {
      room.rounds[i].players.map((p) => (p.hasChosenWord = false));
    }
  }
  const newPlayerToChoseWord =
    playersThatDidntChooseWord[
      Math.floor(Math.random() * playersThatDidntChooseWord.length)
    ];

  currentRound.players.forEach((player) => {
    player.guessedLetters = [];
    player.score = 0;
  });

  room.currentRound++;
  room.inGame = false;
  room.rounds[room.currentRound] = {
    ...currentRound,
    language: "wybierany",
    vacant: true,
    roundTime: room.roundTime,
    players: currentRound.players,
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
      category: "wybierana",
    },
  };
  socket?.emit("room:update", room);
  socket?.emit("room:newRound", {
    roomId: room.roomId,
    roundNumber: room.currentRound,
  });
};
