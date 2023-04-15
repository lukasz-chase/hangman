"use client";
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import type { socketContextTypes } from "../types/context";

const Results = ({ roomId }: { roomId: string }) => {
  const { socket, room, router }: socketContextTypes =
    useContext(SocketContext);

  useEffect(() => {
    if (!room) {
      router.replace("/");
    }
  }, [room]);
  useEffect(() => {
    if (socket) {
      socket.emit("room:getById", roomId);
    }
  }, [socket]);

  return (
    <div className="flexCenter flex-col gap-4 text-md md:text-lg lg:text-xl uppercase">
      <h1 className="text-accent">Game Results</h1>
      <table className="w-full text-sm">
        <thead className="text-xs text-white uppercase bg-primary ">
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
              Rounds winners
            </th>
          </tr>
        </thead>
        <tbody>
          {room &&
            room.rounds.map(
              ({ players, round, wordToGuess, roundWinners }, index) => (
                <tr
                  key={index}
                  className="border-b bg-gray-900 border-gray-700 text-center text-gray-300"
                >
                  <td className="px-6 py-4">{round}</td>
                  <td
                    scope="row"
                    className="px-6 py-4 flexCenter flex-col gap-2"
                  >
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
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
