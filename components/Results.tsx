"use client";
import { useContext, useEffect, useState } from "react";
import { roomDummy } from "../context/SocketContext";
import CustomLink from "./CustomLink";
import { Room } from "@/types/socket";
import { fetchResults } from "@/api";
import Loading from "./Loading";
import { userContextTypes } from "@/types/context";
import { UserContext } from "@/context/UserContext";
import { useSession } from "next-auth/react";
import { resultsHeader } from "@/descriptions/Results";

const Results = ({ roomId }: { roomId: string }) => {
  const { data: session } = useSession();
  const { user }: userContextTypes = useContext(UserContext);
  const playerId = session?.user.id ?? user.id;

  const [room, setRoom] = useState<Room>(roomDummy);
  useEffect(() => {
    fetchResults(roomId).then(({ data }) => setRoom(data));
  }, []);
  if (!room.roomId) return <Loading />;
  return (
    <div className="flex flex-col justify-center lg:items-center h-full gap-4">
      <h1 className="text-accent self-center">Game Results</h1>
      <div className="relative overflow-x-auto lg:max-w-7xl  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 uppercase">
          <thead className="text-xs text-gray-300 uppercase bg-primary">
            <tr>
              {resultsHeader.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-xs text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {room &&
              room.rounds.map(
                ({
                  players,
                  round,
                  wordToGuess,
                  roundWinners,
                  customWord,
                  roundTime,
                }) => (
                  <tr className="border-b bg-neutral border-gray-700 text-center text-primary-content">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {round}
                    </th>
                    <td className="px-6 py-4 flexCenter flex-col gap-2">
                      {players.map(({ name, id }) => (
                        <span
                          key={id}
                          className={` ${
                            playerId === id ? "text-secondary" : "text-white"
                          }`}
                        >
                          {name}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {room.roundTime} <span className="lowercase">s</span>{" "}
                    </td>
                    <td className="px-6 py-4">
                      {roundTime} <span className="lowercase">s</span>{" "}
                    </td>
                    <td className="px-6 py-4">{customWord.toString()}</td>
                    <td className="px-6 py-4">{wordToGuess.original}</td>
                    <td className="px-6 py-4 flexCenter flex-col gap-2">
                      {roundWinners.map(({ name, id }) => (
                        <span
                          key={id}
                          className={`${
                            playerId === id ? "text-secondary" : "text-white"
                          }`}
                        >
                          {name}
                        </span>
                      ))}
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
      <div className="self-center">
        <CustomLink link="/game" label="Create new lobby" />
      </div>
    </div>
  );
};

export default Results;