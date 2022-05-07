import { iTransaction } from "./iTransaction";
import { iUser } from "./iUser";

export interface iUserResponse {
    user: iUser,
    transactions: iTransaction[]
}