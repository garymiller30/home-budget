import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCollection } from '../../../../db/getCollection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            return await updateUserApi(req, res);
    }
    return res.status(404)
}

async function updateUserApi(req: NextApiRequest, res: NextApiResponse) {
    const { userId, timeZone } = JSON.parse(req.body)
    const query = { _id: new ObjectId(userId) }
    const collection = await getCollection("user");
    await collection.updateOne(query, {
        $set: {
            timeZone
        }
    })
    return res.status(200).json({});
}