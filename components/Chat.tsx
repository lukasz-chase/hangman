import type { Message, Room, Socket } from "@/types/socket";
import ChatInput from "@/components/DataInput/ChatInput";
import Messages from "./Messages";

type ChatTypes = {
  socket: Socket;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  messages: Message[];
  room: Room;
};

const Chat = ({
  socket,
  playerId,
  playerName,
  messages,
  room,
  playerAvatar,
}: ChatTypes) => {
  return (
    <div className="h-96 w-[90vw] xl:max-w-[400px]  p-2 rounded-t-md flex flex-col">
      <Messages messages={messages} playerId={playerId} />
      <ChatInput
        playerAvatar={playerAvatar}
        playerId={playerId}
        playerName={playerName}
        room={room}
        socket={socket}
      />
    </div>
  );
};

export default Chat;
