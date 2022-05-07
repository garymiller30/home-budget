import { TRANSACTION_TYPE } from "../vars/variables";

export interface iTransaction {
    _id: string,
    description: string,
    comment: string,
    type: TRANSACTION_TYPE
    amount: number
}