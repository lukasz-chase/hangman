"use client";
import { useEffect, useState } from "react";
import { fetchGames } from "@/api";
import { Room } from "@/types/socket";
import { roomDummy } from "@/context/SocketContext";
import CustomLink from "./CustomLink";
import Loading from "./Loading";

const GamesHistory = ({ userId }: { userId: string }) => {
  const [games, setGames] = useState<Room[]>([roomDummy]);
  useEffect(() => {
    fetchGames(userId).then(({ data }) => setGames(data));
  }, []);
  if (games[0] && !games[0].id) return <Loading />;
  return (
    <div>
      {games.length > 0 ? (
        <>
          {games.map(({ id, roundsNumber, roomId }) => (
            <div className="flexCenter gap-4 bg-neutral p-4" key={Number(id)}>
              <div className="flex flex-col">
                <span className="flex gap-2">
                  id: <b>{roomId}</b>
                </span>
                <span className="flex gap-2">
                  Rounds: <b>{roundsNumber}</b>
                </span>
              </div>
              <CustomLink link={`results/${id}`} label="View Details" />
            </div>
          ))}
        </>
      ) : (
        <div className="flexCenter flex-col gap-4">
          <h1 className="text-2xl text-primary-content">
            You didn't play any games yet!
          </h1>
          <CustomLink link="/game" label="Play now" />
        </div>
      )}
    </div>
  );
};

export default GamesHistory;
