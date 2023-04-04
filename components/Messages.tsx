"use client";
import { useContext, useEffect, useRef } from "react";
import type { Message as MessageType } from "../types/socket";
import { gameContextTypes } from "../types/context";
import { GameContext } from "../context/GameContext";
import Message from "./Message";

type MessagesProps = {
  messages: MessageType[];
  playerId: string;
};

const Messages = ({ messages, playerId }: MessagesProps) => {
  const { isChatFocused }: gameContextTypes = useContext(GameContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatFocused) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
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
          <span>Type below to chat with players</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-accent"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
