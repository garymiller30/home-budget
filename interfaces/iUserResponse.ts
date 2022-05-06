import Transaction from "../model/transaction";
import { iUser } from "./iUser";

export interface iUserResponse {
    user: iUser,
    transactions: Transaction[]
}