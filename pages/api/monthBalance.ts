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
        console.log(+year, +month, +curYear, +curMonth)
        const monthBalance = await getMonthBalance({ userId: userId as string, year: +year, month: +month, curYear: +curYear, curMonth: +curMonth });
        console.log(monthBalance)
        if (!monthBalance.isPreviousMonthMoved) {
            const prevDate = new Date(+year, +month);
            prevDate.setMonth(prevDate.getMonth() - 1);
            //prevDate.setMonth(prevDate.getMonth());
            const [prevYear, prevMonth] = [prevDate.getFullYear(), prevDate.getMonth()];
            console.log("prevYear, prevMonth", prevYear, prevMonth)
            const prevTransactions = await getTransactions(userId as string, {
                year: prevYear,
                month: prevMonth + 1,
            });
            const { debit, credit } = transactionSplitByType(prevTransactions);
            let bdgt = getBudget(debit, credit);
            console.log("budget:", bdgt);
            const transactionType = bdgt >= 0 ? TRANSACTION_TYPE.DEBIT : TRANSACTION_TYPE.CREDIT;
            bdgt = Math.abs(bdgt);

            //потрібно додати транзакцію
            const transaction = new Transaction();
            transaction.ownerId = userId as string;
            transaction.type = transactionType;
            transaction.description = "prev month";
            transaction.comment = "auto";
            transaction.amount = bdgt;
            await createTransaction(JSON.parse(JSON.stringify(transaction)));
            await updateMonthBalance(monthBalance);

        }
    }

    return res.json({});
}

