// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

const getRoomsByPlayerId = ({
  playerId,
  rooms,
}: {
  playerId: any;
  rooms: any[];
}) => {
  const roomsWithPlayer = [];

  for (const room of rooms) {
    const rounds = JSON.parse(room.rounds[0]); // parse rounds JSON string into an array of objects

    for (const round of rounds) {
      const players = round.players;

      if (players.find((player: any) => player.id === playerId)) {
        const editedRoom = {
          ...room,
          rounds: JSON.parse(room.rounds),
          messages: JSON.parse(room.messages),
        };
        roomsWithPlayer.push(editedRoom);
        break; // no need to check further rounds for this room
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
      res.status(200).json(roomsWithPlayer);
    } catch (err) {
      res.status(403).json({ err: "error when getting games" });
    }
  }
};
