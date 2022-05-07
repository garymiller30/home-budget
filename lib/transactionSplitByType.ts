import { TRANSACTION_TYPE } from "../vars/variables";
import { transactionFiter } from ".";
import { iTransaction } from "../interfaces/iTransaction";
export function transactionSplitByType(transactions: iTransaction[] = []): { debit: iTransaction[], credit: iTransaction[] } {
  return {
    debit: transactionFiter(transactions, TRANSACTION_TYPE.DEBIT),
    credit: transactionFiter(transactions, TRANSACTION_TYPE.CREDIT),
  };
}
