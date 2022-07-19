import { selector } from "recoil";
import { iTransaction } from "../../interfaces/iTransaction";
import { getSum } from "../../lib";
import { TRANSACTION_TYPE } from "../../vars/variables";
import { transactionsAtom } from "../atoms/transactionsAtom";

export const debitCreditSumSelector = selector({
    key: "debitCreditSumSelector",
    get: ({ get }) => {
        const list = get(transactionsAtom) as iTransaction[];
        return {
            creditSum: getSum(list.filter((t) => t.type === TRANSACTION_TYPE.CREDIT)),
            debitSum: getSum(list.filter((t) => t.type === TRANSACTION_TYPE.DEBIT)),
        }
    }
})