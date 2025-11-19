// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

type RoomDb = {
  rounds: string | any;
  messages: string | any;
  [key: string]: any;
};

export const getRoomsByPlayerId = ({
  playerId,
  rooms,
}: {
  playerId: string | string[];
  rooms: RoomDb[];
}) => {
  const roomsWithPlayer: any[] = [];

  for (const room of rooms) {
    // bezpieczne parsowanie
    const parsedRounds =
      typeof room.rounds === "string" ? JSON.parse(room.rounds) : room.rounds;

    for (const round of parsedRounds) {
      const players = round.players ?? [];

      if (players.some((player: any) => player.id === playerId)) {
        const editedRoom = {
          ...room,
          rounds: parsedRounds,
          messages:
            typeof room.messages === "string"
              ? JSON.parse(room.messages)
              : room.messages,
        };

        roomsWithPlayer.push(editedRoom);
        break; // nie sprawdzamy kolejnych rund w tym roomie
      }
    }
  }

  return roomsWithPlayer;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const userId = req.query.id;
    try {
      const data = await prisma.game.findMany();
      const roomsWithPlayer = getRoomsByPlayerId({
        playerId: userId!,
        rooms: data,
      });
      console.log({ roomsWithPlayer });
      res.status(200).json(roomsWithPlayer);
    } catch (err) {
      console.log(err);
      res.status(403).json({ err: "error when getting games" });
    }
  }
};
