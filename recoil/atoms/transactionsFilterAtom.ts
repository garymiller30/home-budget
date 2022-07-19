import { atom } from "recoil";
import { TRANSACTIONS_FILTER_ENUM } from "../transactionsFilterEnum";

export const transactionsFilterAtom = atom({
    key: "stransactionsFilter",
    default: TRANSACTIONS_FILTER_ENUM.ALL
})