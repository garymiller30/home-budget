import { atom } from "recoil";
import { iTransaction } from "../../interfaces/iTransaction";

export const transactionsAtom = atom({
    key: "transactionsAtom",
    default: [] as iTransaction[]
})