import { toast } from "react-hot-toast";

export const playerJoinedHandler = (name: string) => {
  toast.success(`${name} has joined`);
};
export const playerDisconnectedHandler = (name: string) => {
  toast.error(`${name} has left`);
};

export const roomClosed = (router: any) => {
  toast.error("room has closed");
  router.replace("/");
};

export const copyUrl = (roomUrl: string) => {
  navigator.clipboard.writeText(roomUrl);
  toast.success("Link copied");
};
