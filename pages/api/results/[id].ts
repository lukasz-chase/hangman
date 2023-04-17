// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const resultsId = Array.isArray(req.query.id)
      ? req.query.id[0]
      : req.query.id;
    try {
      const data: any = await prisma.game.findUnique({
        where: {
          id: resultsId,
        },
      });
      const modifiedData = {
        ...data,
        rounds: JSON.parse(data.rounds),
      };
      res.status(200).json(modifiedData);
    } catch (err) {
      res.status(403).json({ err: "error when getting games" });
    }
  }
};
