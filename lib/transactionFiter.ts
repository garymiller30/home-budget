import { iTransaction } from "../interfaces/iTransaction";
import { TRANSACTION_TYPE } from "../vars/variables";

export function transactionFiter(transactions: iTransaction[] = [], type: TRANSACTION_TYPE): iTransaction[] {
  return transactions.filter((transaction) => transaction.type === type);
}
