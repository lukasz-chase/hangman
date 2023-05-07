import { toast } from "react-hot-toast";

export const playerJoinedHandler = (name: string) => {
  toast.success(`${name} dołączył`);
};
export const playerDisconnectedHandler = (name: string) => {
  toast.error(`${name} wyszedł`);
};

export const roomClosed = (router: any) => {
  toast.error("Pokój został zamknięty");
  router.replace("/");
};

export const copyUrl = (roomUrl: string) => {
  navigator.clipboard.writeText(roomUrl);
  toast.success("Skopiowano");
};
