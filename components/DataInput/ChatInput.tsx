"use client";
import { useContext, useState } from "react";
//context
import { GameContext } from "@/context/GameContext";
//types
import type { gameContextTypes } from "@/types/context";
import type { Message, Room, Socket } from "@/types/socket";
//libraries
import { toast } from "react-hot-toast";

type ChatInputTypes = {
  socket: Socket;
  room: Room;
  playerName: string;
  playerId: string;
  playerAvatar: string;
};

const ChatInput = ({
  socket,
  room,
  playerName,
  playerId,
  playerAvatar,
}: ChatInputTypes) => {
  const [message, setMessage] = useState<Message>({
    playerName: playerName,
    playerId: playerId,
    playerAvatar: playerAvatar,
    message: "",
    createdAt: "",
  });
  const { setIsChatFocused }: gameContextTypes = useContext(GameContext);

  const handleMessage = () => {
    if (!message.message) return toast.error("Message cant be empty");
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes().toString().padStart(2, "0");
    room.messages.push({
      ...message,
      createdAt: `${currentHour}:${currentMinute}`,
    });
    socket.emit("room:update", room);
    setMessage({ ...message, message: "" });
  };

  const enterMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };

  const handleFocus = () => {
    setIsChatFocused(true);
  };

  const handleBlur = () => {
    setIsChatFocused(false);
  };
  return (
    <div className="form-control flexCenter flex-row">
      <input
        type="text"
        aria-label="Napisz wiadomość"
        placeholder="Napisz wiadomość"
        className="input input-bordered flex-1"
        value={message.message}
        onChange={(e) => setMessage({ ...message, message: e.target.value })}
        onKeyDown={enterMessage}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button
        disabled={!message.message}
        className="btn btn-primary"
        aria-label="wyślij wiadomość"
        onClick={handleMessage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-primary-content"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
