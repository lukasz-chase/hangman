export interface Socket {
  on(event: string, callback: (payload: any) => void): void;
  off(event: string, callback: (payload: any) => void): void;
  emit(
    event: string,
    payload?: any,
    additionalPayload?: any,
    thirdPayload?: any
  ): void;
}

export type WordToGuess = {
  word: string;
  translation: string;
  original: string;
  category: string;
};

export type Player = {
  id: string;
  guessedLetters: string[];
  score: number;
  name: string;
  avatar: string;
  connectedToRoom: boolean;
  hasChosenWord: boolean;
};

export type Message = {
  playerName: string;
  playerAvatar: string;
  playerId: string;
  message: string;
  createdAt: string;
};
export type Round = {
  round: number;
  roundWinners: {
    id: string;
    name: string;
  }[];
  wordToGuessChooser: string;
  players: Player[];
  playersInGame: string[];
  customWord: boolean;
  difficulty: number;
  language: string;
  vacant: boolean;
  roundTime: number;
  wordToGuess: WordToGuess;
};
export type Room = {
  id: string;
  roomId: string;
  playersLimit: number;
  rounds: Round[];
  roundsNumber: number;
  currentRound: number;
  private: boolean;
  roundTime: number;
  createdAt: Date;
  creator: string;
  inGame: boolean;
  messages: Message[];
};

export type roomPayload = {
  privateRoom: boolean;
  playersLimit: number;
  [key: string]: any;
  language: string;
  roundTime: number;
  customWord: boolean;
  roundsNumber: number;
  customCategory: string;
  word: WordToGuess;
  creator: {
    name: string;
    id: string;
    avatar: string;
  };
};
