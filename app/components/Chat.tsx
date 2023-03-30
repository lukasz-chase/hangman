import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { GameContext } from "../context/GameContext";
import { gameContextTypes } from "../types/context";
import { Message } from "../types/socket";
import Messages from "./Messages";

type ChatTypes = {
  socket: any;
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
  const { setIsChatFocused, isChatFocused }: gameContextTypes =
    useContext(GameContext);

  const [message, setMessage] = useState<Message>({
    playerName: playerName,
    playerId: playerId,
    playerAvatar: playerAvatar,
    message: "",
    createdAt: "",
  });
  const enterMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };

  const handleMessage = () => {
    if (!message.message) return toast.error("Message cant be empty");
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    socket.emit(
      "message",
      { ...message, createdAt: `${currentHour}:${currentMinute}` },
      roomId
    );
    setMessage({ ...message, message: "" });
  };
  const handleFocus = () => {
    setIsChatFocused(true);
  };

  const handleBlur = () => {
    setIsChatFocused(false);
  };

  return (
    <div className="h-96 w-full max-w-[400px]  p-2 rounded-t-md flex flex-col">
      <Messages messages={messages} playerId={playerId} />
      <div className="form-control flexCenter flex-row">
        <input
          type="text"
          placeholder="Write message"
          className="input input-bordered flex-1"
          value={message.message}
          onChange={(e) => setMessage({ ...message, message: e.target.value })}
          onKeyDown={enterMessage}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button className="btn" onClick={handleMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
