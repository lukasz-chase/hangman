"use client";
import { useEffect, useState } from "react";
import { roomDummy } from "../context/SocketContext";
import CustomLink from "./CustomLink";
import { Room } from "@/types/socket";
import { fetchResults } from "@/api";

const Results = ({ roomId }: { roomId: string }) => {
  const [room, setRoom] = useState<Room>(roomDummy);
  useEffect(() => {
    fetchResults(roomId).then(({ data }) => setRoom(data));
  }, []);
  return (
    <div className="flexCenter flex-col gap-4 text-md md:text-lg lg:text-xl uppercase">
      <h1 className="text-accent">Game Results</h1>
      <table className="w-full text-sm">
        <thead className="text-xs text-gray-300 uppercase bg-primary ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Round
            </th>
            <th scope="col" className="px-6 py-3">
              Players
            </th>
            <th scope="col" className="px-6 py-3">
              Word to guess
            </th>
            <th scope="col" className="px-6 py-3">
              Round winners
            </th>
          </tr>
        </thead>
        <tbody>
          {room &&
            room.rounds.map(({ players, round, wordToGuess, roundWinners }) => (
              <tr
                key={round}
                className="border-b bg-neutral border-gray-700 text-center text-primary-content"
              >
                <td className="px-6 py-4">{round}</td>
                <td scope="row" className="px-6 py-4 flexCenter flex-col gap-2">
                  {players.map(({ name }) => (
                    <span>{name}</span>
                  ))}
                </td>
                <td className="px-6 py-4">{wordToGuess.original}</td>
                <td className="px-6 py-4 flexCenter flex-col gap-2">
                  {roundWinners.map((name) => (
                    <span>{name}</span>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <CustomLink link="/game" label="Create new lobby" />
    </div>
  );
};

export default Results;
