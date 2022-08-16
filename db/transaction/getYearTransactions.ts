import { getCollection } from "../getCollection";

export async function getYearTransactions(userId: string, year: number) {

    if (!userId || !year) return [];

    const collection = await getCollection();
    const agg = [
        {
            '$match': {
                'date.year': year,
                'ownerId': userId
            }
        }, {
            '$group': {
                '_id': {
                    'month': '$date.month',
                    'type': '$type'
                },
                'sum': {
                    '$sum': {
                        '$toDouble': '$amount'
                    }
                }
            }
        }, {
            '$group': {
                '_id': '$_id.month',
                'amount': {
                    '$push': {
                        'type': '$_id.type',
                        'sum': '$sum'
                    }
                }
            }
        }, {
            '$sort': {
                '_id': 1
            }
        }
    ];
    const result = await collection.aggregate(agg).toArray();
    return JSON.parse(JSON.stringify(result));
}