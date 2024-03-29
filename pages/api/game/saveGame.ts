// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import type { Room } from "@/types/socket";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const game: Room = req.body;

    const gameAdjusted: any = {
      ...game,
      rounds: JSON.stringify(game.rounds),
      messages: JSON.stringify(game.messages),
    };

    try {
      const data: any = await prisma.game.findFirst({
        where: {
          roomId: gameAdjusted.roomId,
        },
      });

      if (!data) {
        const result = await prisma.game.create({
          data: gameAdjusted,
        });
        res.status(200).json(result);
      } else {
        res.status(200).json(data);
      }
    } catch (err: any) {
      console.log(err);
      res.status(403).json({ err: err.stack || "error when creating a game" });
    }
  }
};
