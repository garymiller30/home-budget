import { getYearTransactions } from "@/db/transaction/getYearTransactions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case "GET": {
            return await get(req, res);
        }
    }
}


const get = async (req: NextApiRequest, res: NextApiResponse) => {

    const { userId, year } = req.query;

    if (!userId || !year) return res.status(404).json([]);

    const trans = await getYearTransactions(userId as string, Number(year));

    return res.status(200).json(trans);
}