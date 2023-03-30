import type { GuestUser } from "./authTypes";
import type { Room, Socket } from "./socket";

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
};

export type gameContextTypes = {
  setIsChatFocused: (isFocused: boolean) => void;
  isChatFocused: boolean;
};
