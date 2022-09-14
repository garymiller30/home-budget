import { ObjectId } from "mongodb";
import { iTransaction } from "./iTransaction";

export interface iJar {
    _id?: ObjectId;
    ownerId: string;
    idx: number;
    title: string;
    transactions: iTransaction[]
    get amount(): number;
}