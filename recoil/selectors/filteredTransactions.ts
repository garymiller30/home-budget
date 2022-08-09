import { iTransaction } from "@/interfaces/iTransaction";
import { selector } from "recoil";
import { TRANSACTION_TYPE } from "vars/variables";
import { transactionsAtom } from "../atoms/transactionsAtom";
import { transactionsFilterAtom } from "../atoms/transactionsFilterAtom";
import { TRANSACTIONS_FILTER_ENUM } from "../transactionsFilterEnum";

export const filteredTransactions = selector({
    key: "filteredTransactions",
    get: ({ get }) => {
        const list = get(transactionsAtom) as iTransaction[];
        const filter = get(transactionsFilterAtom);

        switch (filter) {
            case TRANSACTIONS_FILTER_ENUM.CREDIT:
                return list.filter((t) => t.type === TRANSACTION_TYPE.CREDIT).reverse();
            case TRANSACTIONS_FILTER_ENUM.DEBIT:
                return list.filter((t) => t.type === TRANSACTION_TYPE.DEBIT).reverse();
            default:
                return [...list].reverse();
        }

    }
})