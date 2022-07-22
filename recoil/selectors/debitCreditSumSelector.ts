import { selector } from "recoil";
import { iTransaction } from "../../interfaces/iTransaction";
import { getSum } from "../../lib";
import { TRANSACTION_TYPE } from "../../vars/variables";
import { transactionsAtom } from "../atoms/transactionsAtom";

export const debitCreditSumSelector = selector({
    key: "debitCreditSumSelector",
    get: ({ get }) => {
        const list = get(transactionsAtom) as iTransaction[];
        const ret = { creditSum: 0, debitSum: 0 }
        if (list) {
            ret.creditSum = getSum(list.filter((t) => t.type === TRANSACTION_TYPE.CREDIT))
            ret.debitSum = getSum(list.filter((t) => t.type === TRANSACTION_TYPE.DEBIT))
        }
        //     return {
        //         creditSum: getSum(list.filter((t) => t.type === TRANSACTION_TYPE.CREDIT)),
        //         debitSum: getSum(list.filter((t) => t.type === TRANSACTION_TYPE.DEBIT)),
        // }

        return ret;

    }
})