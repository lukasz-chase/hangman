export interface Socket {
  on(event: string, callback: (payload: any) => void): void;
  off(event: string, callback: (payload: any) => void): void;
  emit(event: string, payload?: any, additionalPayload?: any): void;
}

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
  roundWinner: string;
  wordToGuessChooser: string;
  players: Player[];
  playersInGame: string[];
  customWord: boolean;
  language: string;
  vacant: boolean;
  roundTime: number;
  wordToGuess: {
    word: string;
    translation: string;
    original: string;
  };
};
export type Room = {
  roomId: string;
  playersLimit: number;
  rounds: Round[];
  roundsNumber: number;
  currentRound: number;
  private: boolean;
  roundTime: number;
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
  word: {
    word: string;
    translation: string;
    original: string;
  };
  creator: {
    name: string;
    id: string;
    avatar: string;
  };
};
