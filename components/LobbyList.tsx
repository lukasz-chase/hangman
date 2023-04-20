"use client";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { socketContextTypes } from "../types/context";
import { Room } from "../types/socket";
import JoinLobby from "./JoinLobby";

const RoomsDisplay = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { socket }: socketContextTypes = useContext(SocketContext);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const setRoomsHandler = ({
    rooms,
    currentPage,
    totalPages,
  }: {
    rooms: Room[];
    currentPage: number;
    totalPages: number;
  }) => {
    setRooms([]);
    const publicRooms = rooms.filter(
      (room) => room.roomId.startsWith("public") && !room.inGame
    );
    setPage(currentPage);
    setTotalPages(totalPages);
    setRooms(publicRooms);
    setLoading(false);
  };

  useEffect(() => {
    if (socket) {
      socket.emit("getRooms", page);
      socket.on("getRooms", setRoomsHandler);
      return () => {
        socket.off("getRooms", setRoomsHandler);
      };
    }
  }, [socket]);
  const handlePage = (page: number) => {
    socket!.emit("getRooms", page);
  };
  return (
    <div className="max-w-h-56">
      {loading ? (
        <progress className="progress progress-accent w-56"></progress>
      ) : (
        <div className="flexCenter flex-col gap-2">
          {rooms.length > 0 && <h1>Join a public lobby</h1>}
          <div className="flex gap-2 flex-col items-center">
            {rooms.map((room) => {
              const currentRound = room.rounds[room.currentRound];
              return (
                <JoinLobby
                  key={room.roomId}
                  roomId={room.roomId}
                  players={currentRound.players}
                  playersLimit={room.playersLimit}
                  language={currentRound.language}
                  customWord={currentRound.customWord}
                />
              );
            })}
          </div>
          <div className="btn-group">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (currentPage) => (
                <button
                  key={currentPage}
                  onClick={() => handlePage(currentPage)}
                  className={`btn ${
                    currentPage === page && "btn-active"
                  } border-2 border-primary hover:border-white`}
                >
                  {currentPage}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsDisplay;
