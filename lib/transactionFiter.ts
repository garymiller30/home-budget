import Transaction from "../model/transaction";
import { TRANSACTION_TYPE } from "../vars/variables";

export function transactionFiter(transactions: Transaction[] = [], type: TRANSACTION_TYPE): Transaction[] {
  return transactions.filter((transaction) => transaction.type === type);
}
