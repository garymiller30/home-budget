import type { NextApiRequest, NextApiResponse } from 'next'
import getMonthBalance from '../../db/monthBalance/getMonthBalance';
import { getTransactions } from '../../db/transaction/getTransactions'
import Transaction from '../../model/transaction';
import { TRANSACTION_TYPE } from '../../vars/variables';
import { transactionSplitByType } from '../../lib/transactionSplitByType'
import { getBudget } from '../../lib/getBudget';
import { createTransaction } from '../../db/transaction/createTransaction';
import updateMonthBalance from '../../db/monthBalance/updateMonthBalance'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            return await get(req, res);
        }


    }
    return res.status(404)
}


const get = async (req: NextApiRequest, res: NextApiResponse) => {


    const { userId, year, month, curYear, curMonth } = req.query;
    if (year && month && curYear && curMonth) {
        const monthBalance = await getMonthBalance(+year, +month, +curYear, +curMonth);
        if (!monthBalance.isPreviousMonthMoved) {
            const prevDate = new Date(+year, +month);
            prevDate.setMonth(prevDate.getMonth() - 1);
            const [prevYear, prevMonth] = [prevDate.getFullYear(), prevDate.getMonth()];
            const prevTransactions = await getTransactions(userId as string, {
                year: prevYear,
                month: prevMonth,
            });
            const { debit, credit } = transactionSplitByType(prevTransactions);
            const bdgt = getBudget(debit, credit);
            //потрібно додати транзакцію
            const transaction = new Transaction();
            transaction.ownerId = userId as string;
            transaction.type = TRANSACTION_TYPE.DEBIT;
            transaction.description = "prev month";
            transaction.comment = "auto";
            transaction.amount = bdgt;
            await createTransaction(JSON.parse(JSON.stringify(transaction)));
            await updateMonthBalance(monthBalance);

        }
    }

    return res.json({});
}

