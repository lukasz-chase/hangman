export type Player = {
  id: string;
  guessedLetters: string[];
  score: number;
  name: string;
};

export type Room = {
  roomId: string;
  playersLimit: number;
  wordToGuess: {
    word: string;
    translation: string;
    original: string;
  };
  vacant: boolean;
  private: boolean;
  roundTime: number;
  language: string;
  author: string;
  creator: string;
  inGame: boolean;
  players: Player[];
};

export type roomPayload = {
  privateRoom: boolean;
  playersLimit: number;
  [key: string]: any;
  language: string;
  roundTime: number;
  author: {
    name: string;
    id: string;
  };
};
