import { iTransaction } from "@/interfaces/iTransaction";
import { iJar } from "@/interfaces/iJar";

import { getBudget, transactionSplitByType } from "lib";
import { ObjectId } from "mongodb";

export default class Jar implements iJar {
    _id?: ObjectId
    idx: number = 1;
    ownerId: string = "";
    title: string = "";
    transactions: iTransaction[] = [];
    goal: number | null = null;
    get amount(): number {

        const { debit, credit } = transactionSplitByType(this.transactions);
        return getBudget(debit, credit);
    }


}