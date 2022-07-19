import { selector } from "recoil";
import { getBudget, transactionSplitByType } from "../../lib";
import { transactionsAtom } from "../atoms/transactionsAtom";

export const balanceSelector = selector({
    key: "balanceSelector",
    get: ({ get }) => {
        const list = get(transactionsAtom);
        const { debit, credit } = transactionSplitByType(list);
        return getBudget(debit, credit);
    }
})