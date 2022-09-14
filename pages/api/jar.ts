import { getJars } from "@/db/jar/getJars";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            return await getAll(req, res);
        }
    }
    return res.status(404)
}

async function getAll(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;
    if (!userId) return res.json([]);

    const jars = await getJars(userId as string);
    return res.status(200).json(jars);
}