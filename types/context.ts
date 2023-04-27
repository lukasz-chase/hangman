import type { GuestUser } from "./authTypes";
import type { Room, Round, Socket } from "./socket";

export type userContextTypes = {
  isLogged: boolean;
  user: GuestUser;
  setUser: any;
  setIsLogged: any;
};
export type socketContextTypes = {
  socket: Socket | null;
  room: Room;
  router: any;
  roomIsFetched: boolean;
  currentRound: Round;
  setRoom: (room: any) => void;
};

export type gameContextTypes = {
  setIsChatFocused: (isFocused: boolean) => void;
  isChatFocused: boolean;
};
