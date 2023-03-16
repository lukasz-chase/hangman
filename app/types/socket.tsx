export type Player = {
  id: string;
  guessedLetters: string[];
  score: number;
  name: string;
};

export type Room = {
  roomId: string;
  playersLimit: number;
  wordToGuess: string;
  vacant: boolean;
  private: boolean;
  roundTime: number;
  creator: string;
  inGame: boolean;
  players: Player[];
};

export type roomPayload = {
  privateRoom: boolean;
  playersLimit: number;
  wordToGuess: string;
  randomWord: boolean;
  roundTime: number;
  author: {
    name: string;
    id: string;
  };
};
