import { selector } from "recoil";
import { iTransaction } from "../../interfaces/iTransaction";
import { TRANSACTION_TYPE } from "../../vars/variables";
import { transactionsAtom } from "../atoms/transactionsAtom";

export const debitSelector = selector({
    key: "debitSelector",
    get: ({ get }) => {
        const list = get(transactionsAtom) as iTransaction[];
        return list.filter((t) => t.type === TRANSACTION_TYPE.DEBIT);
    }
})