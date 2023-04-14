import type { Message, Socket } from "@/types/socket";
import ChatInput from "@/components/DataInput/ChatInput";
import Messages from "./Messages";

type ChatTypes = {
  socket: Socket;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  messages: Message[];
  roomId: string;
};

const Chat = ({
  socket,
  playerId,
  playerName,
  messages,
  roomId,
  playerAvatar,
}: ChatTypes) => {
  return (
    <div className="h-96 w-full max-w-[400px]  p-2 rounded-t-md flex flex-col">
      <Messages messages={messages} playerId={playerId} />
      <ChatInput
        playerAvatar={playerAvatar}
        playerId={playerId}
        playerName={playerName}
        roomId={roomId}
        socket={socket}
      />
    </div>
  );
};

export default Chat;
