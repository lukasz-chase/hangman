//types
import type { Message as MessageType } from "@/types/socket";
//components
import Message from "./Message";

type MessagesProps = {
  messages: MessageType[];
  playerId: string;
};

const Messages = ({ messages, playerId }: MessagesProps) => {
  return (
    <div
      className={`flex-1 max-h-full overflow-y-auto ${
        messages.length === 0 && "flexCenter"
      }`}
    >
      {messages?.map((message, index) => (
        <Message key={index} {...message} currentPlayerId={playerId} />
      ))}
      {messages.length === 0 && (
        <div className="animate-bounce flexCenter flex-col">
          <span className="text-[#A6ADBB]">
            Napisz wiadomość do innych graczy
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-info"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Messages;
