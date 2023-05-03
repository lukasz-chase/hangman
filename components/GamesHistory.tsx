"use client";
import { useEffect, useState } from "react";
import { fetchGames } from "@/api";
import { Room } from "@/types/socket";
import { roomDummy } from "@/context/SocketContext";
import CustomLink from "./CustomLink";
import Loading from "./Loading";
import dateFormat from "dateformat";
import Translate from "./Translate";

const GamesHistory = ({ userId }: { userId: string }) => {
  const [games, setGames] = useState<Room[]>([roomDummy]);
  useEffect(() => {
    fetchGames(userId).then(({ data }) => setGames(data));
  }, []);
  if (games[0] && !games[0].id)
    return (
      <div className="h-[100dvh]">
        <Loading />
      </div>
    );
  return (
    <div>
      {games.length > 0 ? (
        <div className="flex flex-col gap-2">
          {games.map(({ id, roundsNumber, roomId, createdAt }) => (
            <div
              className="flex items-center justify-between gap-4 bg-neutral p-4"
              key={Number(id)}
            >
              <div className="flex flex-col ">
                <Translate
                  text={dateFormat(createdAt, "mmmm dS yyyy")}
                  language="en"
                />
                <span className="flex gap-2">
                  id: <b>{roomId}</b>
                </span>
                <span className="flex gap-2">
                  Rundy: <b>{roundsNumber}</b>
                </span>
              </div>
              <CustomLink link={`results/${id}`} label="Szczegóły" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flexCenter flex-col gap-4">
          <h1 className="text-2xl text-primary-content">
            Jeszcze nie zagrałeś żadnej gry!
          </h1>
          <CustomLink link="/game" label="Play now" />
        </div>
      )}
    </div>
  );
};

export default GamesHistory;
