"use client";
import { useContext, useEffect, useState } from "react";
//context
import { SocketContext } from "@/context/SocketContext";
//components
import Lobby from "./Lobby";
import Loading from "./Loading";
//types
import type { socketContextTypes } from "@/types/context";
import type { Room } from "@/types/socket";

type setRoomProps = {
  rooms: Room[];
  currentPage: number;
  totalPages: number;
};

const RoomsDisplay = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { socket }: socketContextTypes = useContext(SocketContext);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState({
    total: 1,
    current: 1,
  });

  const setRoomsHandler = ({
    rooms,
    currentPage,
    totalPages,
  }: setRoomProps) => {
    setRooms([]);
    const publicRooms = rooms.filter(
      (room) => room.roomId.startsWith("public") && !room.inGame
    );
    setPages({ total: totalPages, current: currentPage });
    setRooms(publicRooms);
    setLoading(false);
  };

  useEffect(() => {
    if (socket) {
      socket.emit("getRooms", pages.current);
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
        <Loading />
      ) : (
        <div className="flexCenter flex-col gap-2">
          {rooms.length > 0 && (
            <div>
              <div className="divider">lub</div>
              <h1>Dołącz do czyjegoś lobby</h1>
            </div>
          )}
          <div className="flex gap-2 flex-col items-center">
            {rooms.map((room) => {
              const currentRound = room.rounds[room.currentRound];
              return (
                <Lobby
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
            {Array.from({ length: pages.total }, (_, index) => index + 1).map(
              (currentPage) => (
                <button
                  key={currentPage}
                  onClick={() => handlePage(currentPage)}
                  className={`btn ${
                    currentPage === pages.current && "btn-active"
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
