import React, { memo } from "react";

type MessageProps = {
  playerId: string;
  currentPlayerId: string;
  playerAvatar: string;
  playerName: string;
  createdAt: string;
  message: string;
};

const Message = memo(
  ({
    playerId,
    currentPlayerId,
    playerAvatar,
    playerName,
    createdAt,
    message,
  }: MessageProps) => {
    if (playerId.startsWith("admin")) {
      return (
        <span
          className={`py-2 w-full flexCenter text-center bg- ${
            playerId === "admin-error" && "text-red-500"
          }
        ${playerId === "admin-info" && "text-sky-500"}`}
        >
          {createdAt} {message}
        </span>
      );
    }

    return (
      <div
        className={`chat ${
          playerId === currentPlayerId ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={playerAvatar} />
          </div>
        </div>
        <div className="chat-header flexCenter gap-2">
          {playerName}
          <time className="text-xs opacity-50">{createdAt}</time>
        </div>

        <div
          className={`chat-bubble  ${
            playerId === currentPlayerId && "chat-bubble-accent"
          }
          `}
        >
          {message}
        </div>
      </div>
    );
  }
);

export default Message;
