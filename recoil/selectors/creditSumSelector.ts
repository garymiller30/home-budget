import { selector } from "recoil";
import { iTransaction } from "../../interfaces/iTransaction";
import { getSum } from "../../lib";
import { TRANSACTION_TYPE } from "../../vars/variables";
import { transactionsAtom } from "../atoms/transactionsAtom";

export const creditSumSelector = selector({
    key: "creditSumSelector",
    get: ({ get }) => {
        const list = get(transactionsAtom) as iTransaction[];
        return getSum(list.filter((t) => t.type === TRANSACTION_TYPE.CREDIT))
    }
})