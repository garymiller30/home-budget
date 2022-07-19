import { TRANSACTION_TYPE } from "../vars/variables";
import { iTransactionDate } from "./iTransactionDate";

export interface iTransaction {
    _id: string,
    description: string,
    comment: string,
    type: TRANSACTION_TYPE
    amount: number,
    date: iTransactionDate
}